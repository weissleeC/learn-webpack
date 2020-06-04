import $ from "jquery";

import '../css/index.css';
import '../css/index.less';

console.log( $('body') );

function add(x, y) {
  return x + y;
}

let fn = ()=>{
  console.log("demo");
}
console.log(fn);

const usename = 'lee';

// 忽略下一行 eslint 检测
// eslint-disable-next-line
console.log(add(1, 2));

function sum(...args){
  return args.reduce( (p,c) => p + c, 0 );
}
console.log( sum(1,2,3,4) );

// HMR js 配置
if(module.hot){
  // 当 module.hot 为 true 时候，HMR 就自动开启
  module.hot.accept('./print.js',function(){
    // 执行回掉函数
    print();
  });
}