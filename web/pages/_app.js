import React from "react";
import "../styles/shared.module.css";
import "../styles/layout.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
