// https://www.cnblogs.com/muzishijie/p/11291295.html
import Button from "./button/index";
import vTable from "./vTable/index";
import Month from "./month/index";
import configTableCol from "./tableColumn/index";
import selectTable from "./selectTable/index";
import Message from "./message/index.js";
import select from "./select/index.js";
import Option from './option/index.js'
import tag from "./tag/index.js";
import input from "./input/index.js";
import footer from "./footer/index.js";
import badge from "./badge/index.js";
import card from "./card/index.js";
import Avatar from './avatar/index.js'
const components = [
  Button,
  vTable,
  Month,
  configTableCol,
  selectTable,
  Option,
  select,
  tag,
  input,
  footer,
  badge,
  card,
  Avatar
];
// vue.use使用时，必须要有install方法。参数就是vue。
const install = Vue => {
  for (var key in components) {
    // console.log('components', components)
    Vue.component(components[key].name, components[key]);
  }
  Vue.prototype.$message = Message;
};
export default {
  install,
  Button,
  vTable,
  Month,
  configTableCol,
  selectTable
};
