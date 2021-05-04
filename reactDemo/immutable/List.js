// List对应原生js的数组结构

// 创建List,注意:List是工厂方法，不能使用new初始化

const {List,Map} = require('immutable');

const list = List([1,2,3,4]);

console.log('list');

// 两个静态方法:List.isList()和List.of()
// List.isList()判断是否是List类型

console.log('isList',List.isList(list));
console.log('isList',List.isList([2,3,4]));

// List.of() 创建新的List
const l = List.of(1,2,3,4)
console.log('l',l)

// size获取List的长度
console.log('size',l.size)

//set方法用来设定指定下标的值set(下标，值)
const l2 = List.of(1,2,3,4);
console.log('l2',l2)

l3 = l2.set(0,110)
console.log('l3',l3)

l4 = l2.set(10,666)
console.log('l4',l4)

l5 = l2.set(-1,999)
console.log('l5',l5)

//delete删除指定下标的值delete(下标)
const d1 = List([1,2,3,4]);
const d2 =d1.delete(0);
console.log('d3',d2)

const d3 = d1.delete(-2)
console.log('d3',d3)

// insert插入值insert(下标，值)
const i1 = List([1,2,3,4])
const i2 = i1.insert(1,666)
console.log('i2',i2)

// update用来更新指定下标的值(下标，callback)
const u1 = List([1,2,3,4])
const u2=u1.update(1,x=>x+100)
console.log('u2',u2)

//clear清空并返回一个长度为0的数组
const c1 = List([1,2,3,4])
const c2 = c1.clear()
console.log('c1',c1);
console.log('c2',c2)

// push pop unshift shift同数组的同名方法

//setSize重新设定数组长度，小于原数组长度会截断，大于原数组长度会用undefined进行填充
const set1 = List([1,2,3,4,5,6]);
const set2=set1.setSize(2);
console.log('set2',set2)

const set3 = set1.setSize(20);
console.log('set3',set3)
//setIn()用来设定嵌套结构的值([第一层下标,第二层下标,...第N层下标],值)
let state = Map({
    version:'2.0',
    user:Map({
        id:'123',
        username:'laoxie',
        age:18,
        hobby:List(['代码','电影','唱歌'])
    }),
})

state = state.setIn(['user','age'],20);
state.getIn(['user','age']);//20

console.log('state',state)

const arr1 = List([
    List([1,2,3,4]),
    List([11,22,33,44]),
    List([111,222,333,444])
]);

const arr2 = arr1.setIn([2,1],0);
console.log('arr2',arr2)
//同理还有deleteIn，insertIn，updateIn

//concat连接List concat(List1,List2,...ListN)\
const list1 = List([1,2,3,4,5]);
const list2 = List([11,22]);
const list3 = List([666,777]);
const totalList = list1.concat(list2,list3);
console.log('totalList',totalList)
//merge是concat的别名
const totalList2=list1.merge(list2,list3);
console.log('totalList2',totalList2)
// filter同原生的filter，循环过滤并返回新的List

// flatten扁平化这个List
const fl1 = List([
    List([1,2,3,4]),
    List([11,22,33,44]),
    List([111,222,333,444])
]);

const fl2 = fl1.flatten(true)
console.log('fl2',fl2)

// find查找，返回最后一个符合的结果
const names =List(['张三','张四','李四','张武']);
const names2 = names.find((v,k)=>v.indexOf('张')!==-1);
// findLast查找，返回最后一个符合的结果
const names3 = names.findLast((v,k)=>v.indexOf('张')!==-1);
console.log('names3',names3)
//keys返回所有的下标
const keys = names.keys();
console.log('keys',keys);
for(const k of keys) {
    console.log('k:',k)
}
//values返回所有的值
const values = names.values();
console.log('keys',keys);
for(const v of values) {
    console.log('v:',v)
}
//entries返回所有的entry,(key,value)形式
const entries = names.entries();
console.log('keys',entries);
for(const entry of entries) {
    console.log('entry:',entry)
}
// groupBy分组
const people = List([{sex:'male',name:'zhangsan'},{sex:'male',name:'lisi'},{sex:'male',name:'wangwu'},{sex:'female',name:'mali'}])
const gp = people.groupBy(x=>x.sex);
console.log('gp',gp)