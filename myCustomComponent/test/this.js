// https://blog.csdn.net/MFWSCQ/article/details/105148289
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}

Foo.prototype.a = function() {
    console.log(3)
}

Foo.a = function() {
    console.log(4)
}

Foo.a();

let obj = new Foo();
obj.a()
Foo.a()


function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com"
    o = new Object();
    o.siteUrl="http://www.google.com"
    console.log('o',o)
}

let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl)


var foo=1;
(function foo() {
    foo=100;
    console.log(foo)
}())

console.log(foo)