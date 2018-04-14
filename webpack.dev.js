const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  }
});