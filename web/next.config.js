// /next.config.js
const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
              imgSrc: ["'self'", "cdn.sanity.io"],
              fontSrc: ["'self'", "fonts.gstatic.com"],
              baseUri: "self",
              formAction: "self",
              frameAncestors: true,
            },
          },
        }),
      },
    ];
  },
};
