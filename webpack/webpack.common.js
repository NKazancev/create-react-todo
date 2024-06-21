const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'build'),
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.(woff|ttf|eot)$/,
        type: 'asset/inline',
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/[name][ext]',
        },
      },
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
  ],
};
