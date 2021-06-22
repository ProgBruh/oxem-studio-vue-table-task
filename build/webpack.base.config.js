const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    index: `${PATHS.src}/index.js`,
  },
  output: {
    filename: './js/[name].js',
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'auto',
              },
            ],
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': PATHS.src,
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      cache: process.env.NODE_ENV === 'development',
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
    }),
  ],
};
