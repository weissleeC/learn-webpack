const path = require('path');

module.exports = {
  // 环境配置
  mode: 'development',

  // 入口配置
  entry: './src/index.js',

  // 输出配置
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  // loader 配置
  module: {
    rules: [
      // css loader
      { 
        test: /\.css$/,
        use: [
          // use 数组中 loader 的执行顺序是从右到左、从下到上依次执行

          // step2 创建 style 标签，将在编译后的 JS 中样式资源读取，添加到 head 中生效
          'style-loader',

          // step1 将 css 文件变成 commonjs 模块加载 JS 中，并编译打包在 JS 里形成样式字符串
          'css-loader'
        ],
      },

      // less loader
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',

					// 将 lees 文件编译成 css 文件
					'less-loader'
				]
			}
    ]
  }

}