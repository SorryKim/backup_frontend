const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
    },
  })
);
