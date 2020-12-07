import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import { Readable } from "stream";
import client from "./client.js";
import { i18n } from "./i18n.js";
// const { getStaticPaths } = require("./pages/[[...slug]]");

const query = `
{
  "routes": *[_type == "route"] {
    ...,
    disallowRobots,
    includeInSitemap,
    page->{
      _id,
      title,
      _createdAt,
      _updatedAt
  }}
}
`;

async function getStaticPaths() {
  return client.fetch(query).then((res) => {
    const { routes = [] } = res;
    const formattedRoutes = routes
      .filter(({ slug }) => slug.current)
      .map(({ slug = {}, page = {}, includeInSitemap, disallowRobots }) => {
        const { _createdAt, _updatedAt } = page;
        return {
          params: {
            slug: slug.current === "/" ? [] : [slug.current],
            includeInSitemap,
            disallowRobots,
            _createdAt,
            _updatedAt,
          },
        };
      });

    const formattedRoutesWithLocales = [
      ...formattedRoutes,
      ...i18n.locales
        .filter((locale) => locale !== i18n.defaultLocale)
        .reduce(
          (acc, locale) => [
            ...acc,
            ...formattedRoutes.map((formattedRoute) => ({
              params: {
                ...formattedRoute.params,
                slug: [locale, ...formattedRoute.params.slug],
              },
            })),
          ],
          []
        ),
    ];

    return {
      paths: formattedRoutesWithLocales,
      fallback: false,
    };
  });
}

client.fetch(`*[_id == "global-config"] {url}[0]`).then((config) => {
  getStaticPaths().then((res) => {
    const stream = new SitemapStream({
      hostname: config.url,
      cacheTime: 600000, // 600 sec (10 min) cache purge period
    });

    const links = res.paths.map((page) => {
      const item = page.params;
      const { slug, includeInSitemap, disallowRobots, _updatedAt } = item;
      if (includeInSitemap && !disallowRobots) {
        return { url: slug, lastmod: new Date(_updatedAt) };
      }
    });

    const sitemap = streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    fs.writeFile(`./out/sitemap.xml`, sitemap.toString(), (err) => {
      if (err) throw err;
      console.log(`sitemap.xml updated`);
    });
  });
});
