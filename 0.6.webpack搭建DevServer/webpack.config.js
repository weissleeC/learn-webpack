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
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader' ]
      },
    ]
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // devServer 配置，作用：用来自动编译，自动打开浏览器，自动刷新
  devServer: {
    // 项目构建后路径
    contentBase: path.resolve(__dirname, 'build'),
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 3030,
    // 自动打开浏览器
    open: true,
  }
};