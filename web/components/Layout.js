import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import client from "../client";

import { LogoJsonLd } from "next-seo";
import Header from "./Header";
import Footer from "./Footer";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function Layout(props) {
  const { config, heroBgImg, children } = props;

  if (!config) {
    console.error("Missing config");
    return <div>Missing config</div>;
  }

  const {
    title,
    mainNavigation,
    companyName,
    copyright,
    footerContact,
    footerAddress,
    footerSocialMedias,
    logo,
    url,
  } = config;
  const logoUrl = logo && logo.asset && logo.asset.url;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
        {/*
  - 1. Preemptively warm up the fonts’ origin.
  -
  - 2. Initiate a high-priority, asynchronous fetch for the CSS file. Works in
  -    most modern browsers.
  -
  - 3. Initiate a low-priority, asynchronous fetch that gets applied to the page
  -    only after it’s arrived. Works in all browsers with JavaScript enabled.
  -
  - 4. In the unlikely event that a visitor has intentionally disabled
  -    JavaScript, fall back to the original method. The good news is that,
  -    although this is a render-blocking request, it can still make use of the
  -    preconnect which makes it marginally faster than the default.
        */}

        {/* <!-- [1] --> */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* <!-- [2] --> */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Lato&family=Oswald:wght@400;500&&display=swap"
        />

        {/* <!-- [3] --> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato&family=Oswald:wght@400;500&&display=swap"
          media="print"
          onLoad="this.media='all'"
        />

        {/* <!-- [4] --> */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato&family=Oswald:wght@400;500&&display=swap"
          />
        </noscript>
        {heroBgImg ? (
          <>
            <link
              rel="preconnect"
              href="https://cdn.sanity.io"
              crossOrigin="true"
            />
            <link
              rel="preload"
              href={urlFor(heroBgImg).width(750).auto("format").url()}
              as="image"
              media="(max-width: 449px)"
            ></link>
            <link
              rel="preload"
              href={urlFor(heroBgImg).width(1080).auto("format").url()}
              as="image"
              media="(min-width: 450px and max-width: 899px)"
            ></link>
            <link
              rel="preload"
              href={urlFor(heroBgImg).auto("format").url()}
              as="image"
              media="(min-width: 900px)"
            ></link>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .hero-image {
                  background-image: url("${urlFor(heroBgImg)
                    .width(750)
                    .auto("format")
                    .url()}");
                }
              
                @media (min-width: 450px) {
                  .hero-image {
                    background-image: url("${urlFor(heroBgImg)
                      .width(1080)
                      .auto("format")
                      .url()}");
                  }
                }

                @media (min-width: 900px) {
                  .hero-image {
                    background-image: url("${urlFor(heroBgImg)
                      .auto("format")
                      .url()}");
                  }
                }
              `,
              }}
            ></style>
          </>
        ) : null}
      </Head>
      <div className="container">
        <Header title={title} navItems={mainNavigation} logo={logo} />
        <main className="content">{children}</main>
        <Footer
          companyName={companyName}
          copyright={copyright}
          footerContact={footerContact}
          footerAddress={footerAddress}
          footerSocialMedias={footerSocialMedias}
        />
        {logoUrl && url && <LogoJsonLd url={url} logo={logoUrl} />}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.shape({
    title: PropTypes.string,
    mainNavigation: PropTypes.arrayOf(PropTypes.object),
    companyName: PropTypes.string,
    copyright: PropTypes.string,
    footerContact: PropTypes.shape({
      title: PropTypes.string,
    }),
    footerAddress: PropTypes.shape({
      title: PropTypes.string,
    }),
    footerSocialMedias: PropTypes.shape({
      title: PropTypes.string,
    }),
    logo: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    url: PropTypes.string,
  }),
};

export default Layout;
