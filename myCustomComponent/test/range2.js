function Range(from, to) {
  this.from = from;
  this.to = to;
}

Range.prototype = {
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

function extend(o, p) {
  for (prop in p) {
    o[prop] = p[prop];
  }
  return o;
}

function defineClass(constructor, methods, statics) {
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  return constructor;
}

var SimpleRange = defineClass(
  function (f, t) {
    this.f = f;
    this.t = t;
  },
  {
    includes: function (x) {
      return this.f <= x && x <= this.t;
    },
    toString: function () {
      return this.f + "..." + this.t;
    },
  },
  {
    upto: function (t) {
      return new SimpleRange(o, t);
    },
  }
);
