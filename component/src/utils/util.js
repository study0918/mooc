function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
}
export const getValueByPath = function (object, prop) {
  prop = prop || "";
  const paths = prop.split(".");
  let current = null;
  let result = null;
  for (let i = 0, j = path.length; i < j; i++) {
    const paths = path[i];
    if (!current) break;
    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, "$1-$2")
    .replace(hyphenateRE, "$1-$2")
    .toLowerCase();
};
