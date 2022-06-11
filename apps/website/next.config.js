// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');
// const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * @type {import('next').NextConfig}
 **/
// PWA wrapper
module.exports = withNx(
  withPWA(
    withMDX(
      // Make sure adding Sentry options is the last code to run before exporting, to
      // ensure that your source maps include changes from all other Webpack plugins
      // withSentryConfig(
      {
        reactStrictMode: true,
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
        images: {
          domains: [
            'images.unsplash.com',
            'localhost',
            'app.treelof.com',
            'upload.wikimedia.org',
            'en.wikipedia.org'
          ]
        },
        rewrites: async () => {
          return [
            {
              source: '/docs',
              destination: '/redoc.html'
            }
          ];
        },
        // add PWA configuration
        pwa: {
          dest: 'public',
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'development'
        },
        nx: {
          // Set this to true if you would like to to use SVGR
          // See: https://github.com/gregberge/svgr
          svgr: false
        }
      }
    )
    // sentryWebpackPluginOptions
    // )
  )
);
