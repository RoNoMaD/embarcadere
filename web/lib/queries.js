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

export const pageQuery = groq`
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

export const frontpageQuery = groq`
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
`;
