/*
* 使用 dll 即使，对某些库单独打包（JQuery、React、Vue）进行单独打包
* 运行方式：webpack --config webpack.dll.js
*/

const resolve = require('path');
const webpack = require('webpack');

module.exports = {
    entry : {
        jquery : ['jquery']
    },
    output: {
        fillname:'[name].js',
        path: resolve(__dirname,'dll'),
        library: '[name]_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: resolve(__dirname,'dll/manifest.json'),
        })
    ],
    mode: 'production'
}