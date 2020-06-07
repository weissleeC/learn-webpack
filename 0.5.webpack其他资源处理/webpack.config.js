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
      // 其他文件处理
      {
        exclude: /\.(html|css|js|less|sass|jpg|png|gif|jpeg)$/, // 排除指定文件不被此 loader 输出
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]',

          // 源文件输出到指定文件夹
          outputPath: 'media',
        },
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