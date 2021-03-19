import groq from "groq";

export const siteConfigQuery = `
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

export const routesQuery = `
{
  "routes": *[_type == "page"] {
    _id,
    title,
    slug,
    disallowRobots,
    includeInSitemap,
  }
}
`;

export const pageQuery = groq`
*[_type == "page" && slug.current == $slug]| order(_updatedAt desc) | [0]{
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
`;
