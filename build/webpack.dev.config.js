const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: `${baseWebpackConfig.externals.paths.dist}/html`,
    port: 8080,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
