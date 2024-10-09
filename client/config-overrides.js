const webpack = require('webpack');
const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra');

module.exports = override(
  (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    );

    return config;
  },
);
