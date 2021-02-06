import "../styles/layout.css";

import { addDecorator } from "@storybook/react";
import { withNextRouter } from "storybook-addon-next-router";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator(
  withNextRouter({
    path: "/", // defaults to `/`
    asPath: "/", // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
);
