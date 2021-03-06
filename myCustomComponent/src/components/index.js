// https://www.cnblogs.com/muzishijie/p/11291295.html
import Button from './button/index'
// https://www.jb51.net/article/146408.htm
import vTable from './vTable/index'
// message
// https://www.jb51.net/article/173205.htm
//vue封装所有组件
// https://www.jb51.net/list/list_269_1.htm
// 日历
//https://www.jb51.net/article/164011.htm
import Month from './month/index'
import configTableCol from './tableColumn/index'
import selectTable from './selectTable/index'
const components = [Button, vTable, Month, configTableCol, selectTable]
// vue.use使用时，必须要有install方法。参数就是vue。
const install = (Vue) => {
  for (var key in components) {
    // console.log('components', components)
    Vue.component(components[key].name, components[key])
  }
}
export default {
  install,
  Button,
  vTable,
  Month,
  configTableCol,
  selectTable
}
