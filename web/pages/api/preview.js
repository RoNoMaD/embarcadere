import { frontpageQuery, pageQuery } from "../../lib/queries";
import { previewClient } from "../../lib/sanity.server";
import { i18n } from "../../i18n";

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  console.log(req.query.slug);

  // Check if the post with the given `slug` exists
  // const post = await previewClient.fetch(postBySlugQuery, {
  //   slug: req.query.slug,
  // });
  const slug = req.query.slug;
  let pageSlug = "";
  let locale = i18n.defaultLocale;
  if (slug) {
    if (i18n.locales.includes(slug[0])) {
      if (slug.length > 1) {
        pageSlug = slug[1];
      }
      locale = slug[0];
    } else {
      pageSlug = slug[0];
    }
  }
  console.log({ pageSlug });

  let page;

  if (!pageSlug) {
    // Frontpage
    page = await previewClient.fetch(frontpageQuery, { locale });
  } else {
    page = await previewClient.fetch(pageQuery, { slug: pageSlug, locale });
  }

  console.log({ page });

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${page.slug}` });
  res.end();
}
