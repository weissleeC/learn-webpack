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
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      },

      // 处理 css 图片资源
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          // limit 作用：当图片大小小于 10kb，就会被 base64 处理
          // 优点：减少 http 请求，减少服务器压力
          // 缺点：图片体积会更大，文件请求更慢，超大图片会导致网页加载变卡
          limit: 10 * 1024,

          // 改变图片输出的目录
          outputPath: 'img',

          // 给图片进行重命名
          // [hash:10] 取图片的 hash 的前 10 位数
          // [ext] 取文件原来的拓展名字（后缀）
          name: '[hash:10].[ext]',
        }
      },

      // 处理 html 文件的 img 图片
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
};