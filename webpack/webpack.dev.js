const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: false },
          }, 
          'sass-loader'
        ],
      },
    ],
  },
});
