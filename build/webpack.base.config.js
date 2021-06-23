const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  env: path.resolve(__dirname, '../.env'),
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
          plugins: ['@babel/transform-runtime'],
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
    new DotenvWebpack({ path: PATHS.env }),
  ],
};
