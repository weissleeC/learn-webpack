# WebPack Learning 
> varsion @4.43.0  结合文档 + 视频学习笔记记录。

### 一、 WebPack 是什么

webpack 是一种前端构建工具，一个*静态模块打包器(module bundler)*。在 webpack 看来，前端所有资源文件(js/json/css/img/less/...)都会被作为模块处理，它根据模块依赖关系进行静态分析，打包生成对应的*静态资源(bundle)*
> 举例：在 HTML 中引入 Sass、Less 和更高级的 ES 语法，浏览器是无法识别的，此时就需要借助 webpack 构建工具去处理 

#### 1.1 传统的 JS 组织方式

```html
<script src="path/a.js"></script>
<script src="path/b.js"></script>
<script src="path/c.js"></script>
```
这样的弊端是显而易见的：
+ **全局变量污染**
	JS 只有函数作用域和块级作用域中的 `let 、const` 没有文件作用域，每个文件里的全局变量都是挂载在 window 或者其他宿主环境下的全局对象上。这样容易造成命名冲突，于是出现了一些常见的命名空间模式。比如：选择一个全局变量作为主要的引用对象，其他的变量挂载在这个全局变量上，比如 JQuery，$.ajax; 或者特定的前缀等。

+ **可维护性低**
	文件和文件间没有明显的依赖关系，有依赖关系的文件有顺序有先后，不利于维护和后期迭代。

#### 1.2 WebPack 构建方式

在 webpack 中一切皆为模块，出了常见的 JS 的模块外，css、图片、字体、等资源都可以被当作模块处理。模块引入方式有很多，比如以下几种
+ ES 2015 的 import
+ CommonJS 的 require()
+ AMD 的 define 和 require
+ css/sass/less 中的 @import
+ 样式文件中通过 url 引入图片，html 中 img 标签的 src

#### 1.3 WebPack 构建过程

在自己的项目中使用了指定的资源依赖(JS、JQ、less)形成一个代码块(chunk)，通过 webpack.config.js 的配置进行统一处理打包，将所有的资源输出(bundle)。

---

### 二、核心理念

#### 2.1 入口 Entry

即入口起点，webpack 会找出它直接依赖和间接依赖的其他模块，然后 webpack 会在其内部建立一个依赖图，记录这些依赖关系，以此来构建打包。 webpack4 可以零启动配置，entry 的默认值是 ./src/index.js

+ 单入口配置：

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
}
```

+ 多入口配置：

```javascript
module.exports = {
  //支持 string | object | array 
  entry: './path/to/my/entry/file.js'

  entry: [ './app/file1.js', './app/file2.js' ]

  entry: {
    a: './app/file1.js',
    b: [ './app/file2.js', './app/file3.js' ]
  }
}
```

#### 2.2 输出 Output

即输出位置，它的作用是告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认输出文件是 `./dist`，也可以自定义输出文件名。必须是绝对路径，配合 node.js 的 path 模块使用。

+ 单口输出文件

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',

  output: {
    path: path.resolve(__dirname, 'dist');
    filename: 'my-fist-webpack.bundles.js'
  }
}
```

+ 多口输出文件

``` javascript
const path = require('path');

module.exports = {
  entry: [ './app/file1.js', './app/file2.js' ],

  output: {
   path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
    // 也可以加上 hash 值
    filename: '[name].[hash:10].js'
  }
}
```
#### 2.3 Loader

webpack 自身的能力只能处理 JS，因此需要 loader 让 webpack 能够去处理那些非 JS 文件。
在 webpack 的配置中 loader 有两个必须属性：
1. `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. `use` 属性，表示进行转换时，应该使用哪个 loader。如果只有一个 loader 声明，写法则是：`loader: 'xxx-loader'`

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename : '[name].js'
  },

  module: {
   rules: [
      { test: /\.txt$/, use: 'raw-loader' }
   ]
  }
}
```
以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：
> “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”

**在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。**

#### 2.3 插件 Plugins

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

插件是通过 npm 安装，调用方式 require('plugins-name')。webpack 也内置了插件，调用方式 require('webpack')

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'});
  ]
}
```
#### 2.4 模式

环境模式配置，通过选择 development 或 production 之中的一个，来设置 mode 参数在生产模式中，JS 会被自动压缩。

```javascript
module.exports = {
  mode: 'production'
}
```
---

### 三、搭建 WebPack 项目

#### 3.1 安装步骤

1. 全局安装 webpack `npm i webpack webpack-cli -g`
2. 创建一个新项目 `mkdir my-first-webpack`
3. 在项目下初始化 `npm init -y`
4. 在项目下安装 webpack 包 `npm i webpack webpack-cli -D`
5. 创建 webpack.config.js 配置文件 `touch webpack.config.js`

#### 3.2 处理样式资源

1. 安装两个 loader `npm i css-loader style-loader -D`
2. 在 **webpack.config.js** 进行 loader 配置

```javascript
module.exports = {
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
```

> 使用 less、sass 等预处理样式需要对应 loader，并且对 `test` 和 `use` 属性进行不同的配置。

#### 3.3 处理 HTML 资源
1. 安装 plugins `npm i html-webpack-plugin -D`
2. 在 **webpack.config.js** 进行 plugins 配置

```javascript
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // plugins
  plugins: [
    // html-webpack-plugin 作用：创建一个空的 HTML，自动引入打包输出所有资源（JS/CSS）
    new HtmlWebpackPlugin({
      // 复制指定 HTML 并自动引入打包输出所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
}
```

#### 3.4 处理图片资源
1. 安装 loader `npm i url-loader file-loader html-loader -D`
2. 在 **webpack.config.js** 进行 loader 配置

```javascript
module.exports = {
  // loader 配置
  module: {
    rules: [
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
          // [hash:6] 取图片的 hash 的前 6 位数
          // [ext] 取文件原来的拓展名字（后缀）
          name: '[hash:6].[ext]',
        }
      },
			
      // 处理 html 文件的 img 图片
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  },
}
```

#### 3.4 其他资源处理
1. 安装 loader `npm i file-loader -D`
2. 在 **webpack.config.js** 进行 loader 配置

```javascript
module.exports = {
  module: {
    rules: [
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
  }
}
```