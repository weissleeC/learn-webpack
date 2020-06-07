// 引入 nodejs path 模块
const path = require('path');

module.exports = {
  // 环境配置
  mode: 'development',

  // entry
  entry: './src/index.js',

  // output
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  }

}