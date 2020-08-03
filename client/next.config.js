module.exports = {
  webpack(config, options) {
    // config.module.rules.push({
    //   test: /\.(svg|ttf|eot|woff|woff2)$/,
    //   // only process modules with this loader
    //   // if they live under a 'fonts' or 'pficon' directory
    //   include: [require("path").resolve(__dirname, "/public/fonts")],
    //   use: {
    //     loader: "file-loader",
    //   },
    // });
    const { isServer } = options;
    const testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;

    config.module.rules.push({
      test: testPattern,
      issuer: {
        // Next.js already handles url() in css/sass/scss files
        test: /\.\w+(?<!(s?c|sa)ss)$/i,
      },
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            fallback: "file-loader",
            publicPath: `/_next/static/chunks/fonts/`,
            outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  env: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
};
