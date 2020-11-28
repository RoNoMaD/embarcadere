import Document, { Html, Head, Main, NextScript } from "next/document";

// import { i18n } from "../i18n";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const slugs = ctx.req.url.split("/").filter((slug) => slug);
  //   console.log("slugs", slugs);
  //   console.log("slugs", slugs);
  //   const lang =
  //     slugs.length > 0 && i18n.locales.includes(slugs[0])
  //       ? slugs[0]
  //       : i18n.defaultLocale;
  //   return { ...initialProps, lang };
  // }

  render() {
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
