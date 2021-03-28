async function async1() {
    console.log('async start');
    await async2();
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
    
}

console.log('script start')

setTimeout(function() {
    console.log('setTimeout');
},0)
async1();

new Promise(function(resolve) {
    console.log('promise1')
    resolve();
}).then(function() {
    console.log('promise2')
})
console.log('script end')

var b =10;
(function b() {
    b=20;
    console.log(b)
})()

var a =10;
(function () {
    a=5
    console.log(a)
    console.log(window.a)
    var a=20
    console.log(a)
})()

var obj = {
    '2':3,
    "3":4,
    'length':2,
    'splice':Array.prototype.splice,
    'push':Array.prototype.push
}

obj.push(1)
obj.push(2)
console.log(obj)

var a ={n:1}
var b=a;
a.x=a={n:2}
console.log(a.x);
console.log(b.x)

var a = {},b='123',c=123;
a[b]='b';
a[c]='c'

var a ={};
b=Symbol('123')
c=Symbol('123')
a[b]='b';
a[c]='c'

var a = {}
b={key:'123'}
c={key:'456'}
a[b]='b';
a[c]='c'