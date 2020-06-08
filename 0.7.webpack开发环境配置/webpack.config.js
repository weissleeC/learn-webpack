const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 环境配置
  mode: 'development',

  // 入口配置
  entry: './src/js/index.js',

  // 输出配置
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'js/[name].js'
  },

  // loader 配置 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          outputPath: 'img',
          name: '[hash:10].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(html|css|js|less|sass|jpg|png|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]',
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

  // devServer 配置
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3030,
    open: true,
  }
};