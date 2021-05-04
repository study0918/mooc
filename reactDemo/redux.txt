1.创建项目，使用create-react-app 命令
2.运行项目 npm start
3.安装simple-react-snippets插件
4.使用imrc快捷键导入react，使用ccc声明一个组件
5.安装redux：npm install --save redux

6.createStore 创建一个仓库 reducer仓库管理员
7.http://jspang.com/detailed?id=48#toc246

8.1)store必须是唯一的，多个store是坚决不允许的，只能有一个store空间
2）只有store能改变自己的内容，Reducer不能改变
3）Reducer必须是纯函数

9.easy mock  study0918 lixiang19901104
10.useEffect是异步的,不会阻止视图的更新,没有componentShouldUpdate的生命周期，父组件的状态更新后，子组件的状态不需要更新，但子组件的方法却要再执行一遍，会消耗性能

11.自定义hooks函数必须以use开头

12.useCallback缓存方法,useMemo缓存状态或者属性