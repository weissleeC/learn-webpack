const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 环境配置
  mode: 'development',

  // 入口配置
  entry: './src/index.js',

  // 输出配置
  output: {
    path: path.resolve(__dirname,'build'),
    filename: '[name].js'
  },

  // loader 配置
  module: {
    rules: [

    ]
  },

  // plugins
  plugins: [
    // html-webpack-plugin 作用：创建一个空的 HTML，自动引入打包输出所有资源（JS/CSS）
    new HtmlWebpackPlugin({
      // 复制指定 HTML 并自动引入打包输出所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
};