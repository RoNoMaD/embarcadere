const path = require("path");
const postcssConfig = require("../postcss.config");

module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../components/**/*.stories.js"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== "/\\.css$/"
    );
    config.module.rules.push({
      test: /\.css$/,
      sideEffects: true,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        "postcss-loader",
      ],
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};
