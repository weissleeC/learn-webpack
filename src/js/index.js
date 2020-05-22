import '../css/index.css';
import '../css/index.less';

function add(x, y) {
  return x + y;
}

let fn = ()=>{
  console.log("demo");
}
console.log(fn);

// 忽略下一行 eslint 检测
// eslint-disable-next-line
console.log(add(1, 2));