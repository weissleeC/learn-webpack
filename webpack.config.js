const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取 css 成为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 css
const OptizizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: true,
      plugins: () => [
        require('autoprefixer')({ browsers: ['> 0.15% in CN'] }), // 添加前缀
      ],
    },
  },
];

// 设置 nodejs 环境变量
process.env.NODE_ENV = 'development';

module.exports = {
  // 环境模式
  mode: 'development', // 开发模式
  // 在生产模式中，js 会被自动压缩
  // mode: 'production', // 生产模式

  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    // 输出文件名
    filename: 'js/built.js',
    // 输出路径
    // __dirname 是 nodejs 的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },

  // loader 配置
  module: {
    rules: [
      // 不同文件资源需要不同的 loader 资源去处理
      // use 数组中的 loader 是从右到左的顺序执行，即从下到上

      // 处理 css loader
      {
        // test 匹配哪些文件
        test: /\.css$/,
        // 使用哪些 loader 去处理
        use: [
          // 创建 style 标签，将 js 中的样式资源插入行，添加到 head 中生效
          // 如果需要单独把 css 生成文件，则需要 MiniCssExtractPlugin.loader 处理
          // 'style-loader',

          // 从 js 中把 css 提取出，单独生成一个 css 文件
          // MiniCssExtractPlugin.loader,
          // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
          // 'css-loader',
          /*
            css 兼容性处理，需要安装 postcss-loader postcss-preset-env
            帮助 postcss 在 package.json 样式版本配置
              "browserslist":{
                // 开发模式需要兼容的
                // 如果需要看开发模式下的兼容性，则需要设置 node 环境 process.env.NODE_ENV = "development"
                "development":[
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                // 需要兼容到市场 98% 以上的，去掉以死掉的浏览器：not dead，去掉一些不知名浏览器：not op_mini all
                // 默认产出是生产模式
                "production":[
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ]
              }
          */
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     sourceMap: true,
          //     plugins: () => [
          //       require('autoprefixer')({ browsers: ['> 0.15% in CN'] }), // 添加前缀
          //     ],
          //   },
          // },
          ...commonCssLoader,
        ],
      },

      // 处理 less loader
      {
        test: /\.less$/,
        use: [
          // 需要下载 less-loader 和 less
          // 将 less 文件处理成 css
          // 'style-loader', // step 3
          // 'css-loader', // step 2
          ...commonCssLoader,
          'less-loader', // step 1
        ],
      },

      // 处理图片资源
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        // 使用一个 loader
        // 需安装 url-loader fild-loader
        loader: 'url-loader',
        options: {
          // 图片小于 8kb ，就会把资源处理成 base64 形式 [ 优点：减少请求数量(减轻服务器压力)、缺点：图片体积会更大(文件请求速度会更慢，因为转换成了字符串的形式) ]
          limit: 8 * 1024,
          // 改变图片输出的目录
          outputPath: 'images',

          // 低版本的 webpack 下，html 中 img 标签中引入图片，src 会出现 [object Module]
          // 问题原因：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
          // 解决方式：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
          // esModule: false

          // 给图片进行重命名
          // [hash:10] 取图片的 hash 的前 10 位数
          // [ext] 取文件原来的拓展名字（后缀）
          name: '[hash:10].[ext]',
        },
      },

      // 处理 html 中 img 标签的图片 loader
      {
        test: /\.html$/,loader: 'html-loader',
      },

      // JS 兼容性处理 babel-loader
      // babel-loader 无法处理更高级的 ES 写法，所以需要使用 corejs 去处理
      {
        test: /\.js$/,exclude: /node_modules/,loader: 'babel-loader'
      },

      // 其他文件处理
      {
        exclude: /\.(html|css|js|less|sass|jpg|png|gif|jpeg)$/, // 排除指定文件不被此 loader 输出
        loader: 'file-loader',
        options: {
          outputPath: 'media', // 源文件输出到指定文件夹
        },
      },
    ],
  },

  // plugins 配置
  plugins: [
    // html-webpack-plugins[ 功能：默认创建一个空的 HTML 文件，自动引入打包输出的所有资源(js/css) ]
    new HtmlWebpackPlugin({
      // 复制 './src/imdex/html' 文件，并自动引入打包输出的所有资源(js/css)
      template: './src/index.html',
      // 压缩 html
      // minify: true,
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),

    new MiniCssExtractPlugin({
      // 对打包的 css 重命名
      filename: 'css/built.css',
    }),

    // 压缩 css
    new OptizizeCssAssetWebpackPlugin(),
  ],

  // devServer：自动编译，自定浏览、自动刷新。[热加载]
  // 特点：只会在内存中编译打包，不会有任何输出(没有产出到 build 文件中)
  // 启动指令：npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
  },
}