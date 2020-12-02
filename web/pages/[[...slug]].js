import PropTypes from "prop-types";
import React, { Component } from "react";
import { NextSeo } from "next-seo";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { i18n } from "../i18n";
import Layout from "../components/Layout";
import client from "../client";
import RenderSections from "../components/RenderSections";

const builder = imageUrlBuilder(client);

class LandingPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    // TODO: improve types
    disallowRobots: PropTypes.any,
    openGraphImage: PropTypes.any,
    content: PropTypes.any,
    config: PropTypes.any,
    slug: PropTypes.string,
    locale: PropTypes.string,
  };

  render() {
    const {
      title = "Missing title",
      description,
      disallowRobots,
      openGraphImage,
      content = [],
      config = {},
      slug,
      locale,
    } = this.props;

    if (!!(typeof window !== "undefined" && window.document)) {
      document.documentElement.lang = locale;
    }

    const openGraphImages = openGraphImage
      ? [
          {
            url: builder.image(openGraphImage).width(800).height(600).url(),
            width: 800,
            height: 600,
            alt: title,
          },
          {
            // Facebook recommended size
            url: builder.image(openGraphImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: title,
          },
          {
            // Square 1:1
            url: builder.image(openGraphImage).width(600).height(600).url(),
            width: 600,
            height: 600,
            alt: title,
          },
        ]
      : [];

    const heroSection = content.find((section) => section._type === "hero");
    let heroBgImg;
    if (heroSection) {
      heroBgImg = heroSection.backgroundImage;
    }

    return (
      <Layout config={config} heroBgImg={heroBgImg}>
        <NextSeo
          title={title}
          titleTemplate={`${config.title} | %s`}
          description={description}
          canonical={config.url && `${config.url}/${slug}`}
          languageAlternates={i18n.locales
            .filter((loc) => loc !== locale)
            .map((locale) => {
              return {
                hrefLang: locale,
                href: `${locale !== i18n.defaultLocale ? `/${locale}` : ""}${
                  slug !== "/" ? `/${slug}` : "/"
                }`,
              };
            })}
          openGraph={{
            images: openGraphImages,
          }}
          noindex={disallowRobots}
        />
        {content && <RenderSections sections={content} />}
      </Layout>
    );
  }
}

export default LandingPage;

const siteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}, alt},
    mainNavigation[] -> {
      ...,
      "title": page->title[$locale]
    },
    footerNavigation[] -> {
      ...,
      "title": page->title[$locale]
    }
  }[0]
  `;

const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page-> {
    ...,
    "title": coalesce(title[$locale], title.fr),
    content[] {
      ...,
      "heading": coalesce(heading[$locale], heading.fr),
      "tagline": coalesce(tagline[$locale],tagline.fr),
      "text": coalesce(text[$locale],text.fr),
      cta {
        ...,
        "title": coalesce(title[$locale], title.fr),
        route->
      },
      content[] {
        ...,
        "heading": coalesce(heading[$locale], heading.fr),
        "price": coalesce(price[$locale],price.fr),
        cta {
          ...,
          "title": coalesce(title[$locale], title.fr),
          route->
        },
      },
    }
  }
}
`;

export async function getStaticProps({ params }) {
  let pageSlug = "";
  let locale = i18n.defaultLocale;
  if (params.slug) {
    if (i18n.locales.includes(params.slug[0])) {
      if (params.slug.length > 1) {
        pageSlug = params.slug[1];
      }
      locale = params.slug[0];
    } else {
      pageSlug = params.slug[0];
    }
  }

  const config = await client.fetch(siteConfigQuery, { locale });

  if (!pageSlug) {
    // Frontpage
    return client
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ...,
            "title": coalesce(title[$locale], title.fr),
            content[] {
              ...,
              "heading": coalesce(heading[$locale], heading.fr),
              "tagline": coalesce(tagline[$locale],tagline.fr),
              "text": coalesce(text[$locale],text.fr),
              cta {
                ...,
                "title": coalesce(title[$locale], title.fr),
                route->
              },
              content[] {
                ...,
                "heading": coalesce(heading[$locale], heading.fr),
                "price": coalesce(price[$locale],price.fr),
                cta {
                  ...,
                  "title": coalesce(title[$locale], title.fr),
                  route->
                },
              },
            }
          }
        }
      `,
        { locale }
      )
      .then((res) => ({
        props: { ...res.frontpage, slug: "/", locale, config },
      }));
  }
  return client.fetch(pageQuery, { slug: pageSlug, locale }).then((res) => {
    return { props: { ...res.page, slug: pageSlug, locale, config } };
  });
}

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

export async function getStaticPaths() {
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
