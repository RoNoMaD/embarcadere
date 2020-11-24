import PropTypes from "prop-types";
import React, { Component } from "react";
import { NextSeo } from "next-seo";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import Layout from "../components/Layout";
import client from "../client";
import RenderSections from "../components/RenderSections";

const builder = imageUrlBuilder(client);

const query = `
{
  "routes": *[_type == "route"] {
    ...,
    disallowRobot,
    includeInSitemap,
    page->{
      _id,
      title,
      _createdAt,
      _updatedAt
  }}
}
`;

const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page-> {
    ...,
    content[] {
      ...,
      prestations[] {
        ...,
        content[] {
          ...,
          cta {
            ...,
            route->
          },
        },
      },
      cta {
        ...,
        route->
      },
      ctas[] {
        ...,
        route->
      }
    }
  }
}
`;

class LandingPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    // TODO: improve types
    disallowRobots: PropTypes.any,
    openGraphImage: PropTypes.any,
    content: PropTypes.any,
    config: PropTypes.any,
    slug: PropTypes.any,
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
    } = this.props;

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

    return (
      <Layout config={config}>
        <NextSeo
          config={{
            title,
            titleTemplate: `${config.title} | %s`,
            description,
            canonical: config.url && `${config.url}/${slug}`,
            openGraph: {
              images: openGraphImages,
            },
            noindex: disallowRobots,
          }}
        />
        {content && <RenderSections sections={content} />}
      </Layout>
    );
  }
}

export default LandingPage;

export async function getStaticProps({ params }) {
  console.log("params.slug", params.slug);
  if (!params.slug) {
    //   console.error("no slug");
    //   return;
    // }

    // // Frontpage
    // if (slug && slug === "/") {
    return client
      .fetch(
        groq`
        *[_id == "global-config"][0]{
          frontpage -> {
            ...,
            content[] {
              ...,
              prestations[] {
                ...,
                content[] {
                  ...,
                  cta {
                    ...,
                    route->
                  },
                },
              },
              cta {
                ...,
                route->
              },
              ctas[] {
                ...,
                route->
              }
            }
          }
        }
      `
      )
      .then((res) => ({ props: { ...res.frontpage, slug: "/" } }));
  }

  const slug = params.slug[params.slug.length - 1];

  if (slug && slug !== "/") {
    return client.fetch(pageQuery, { slug }).then((res) => ({ props: { ...res.page, slug } }));
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths({ locales }) {
  return client.fetch(query).then((res) => {
    const { routes = [] } = res;
    const formattedRoutes = routes
      .filter(({ slug }) => slug.current)
      .map(({ slug = {}, page = {}, includeInSitemap, disallowRobot }) => {
        const { _createdAt, _updatedAt } = page;
        return {
          params: {
            slug: [slug.current],
            includeInSitemap,
            disallowRobot,
            _createdAt,
            _updatedAt,
          },
        };
      });
    console.log(formattedRoutes.map((route) => route.params.slug));
    return {
      paths: locales.reduce(
        (acc, locale) => [
          ...acc,
          ...formattedRoutes.map((formattedRoute) => ({ ...formattedRoute, locale })),
        ],
        []
      ),
      fallback: true,
    };
  });
}
