// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');
const { withSentryConfig } = require('@sentry/nextjs');

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

/** @type {import('next').NextConfig} */
/**
 * @type {import('next').NextConfig}
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
// PWA wrapper
module.exports = withNx(
  withPWA(
    // Make sure adding Sentry options is the last code to run before exporting, to
    // ensure that your source maps include changes from all other Webpack plugins
    withSentryConfig(
      {
        reactStrictMode: true,
        images: {
          domains: ['images.unsplash.com', 'localhost', 'app.treelof.com']
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
      },
      sentryWebpackPluginOptions
    )
  )
);
