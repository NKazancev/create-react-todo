const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'build'),
    assetModuleFilename: 'assets/[name][ext]',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(woff|ttf|eot|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        type: 'asset/resource',
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
