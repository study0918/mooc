var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function nested() {
    var scope = "nested scope";
    return scope;
  }
  return nested();
}
checkscope();

function test(o) {
  var i = 0;
  if (typeof o == "object") {
    var j = 0;
    for (var k = 0; k < 10; k++) {
      console.log("k1", k);
    }
    console.log("k2", k);
  }
  console.log("j", j);
}

function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create) return Object.create(p);
  var t = typeof p;
  if (t !== "object" && t !== "function") throw TypeError();
  function f() {}
  f.prototype = p;
  return new f();
}

function range(from, to) {
  var r = inherit(range.methods);
  r.from = from;
  r.to = to;
  return r;
}

range.methods = {
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  forEach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  },
};

var r = range(1, 3);
r.includes(2);
r.forEach(console.log);
console.log(r);
