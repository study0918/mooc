/**
 * 获取对象类型
 * @param {*需要获取类型的对象} v
 */
export const getType = v =>
  v === undefined ? "undefined" : v === null ? "null" : v.constructor.name.toLowerCase();

/**
 * 对象深拷贝
 * @param {*Array或者Object} data
 */
export function deepClone(data) {
  var type = getType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * 判断对象是否相同
 * @param {*对象1} obj_1
 * @param {*对象2} obj_2
 */
export function isEquals(obj_1, obj_2) {
  if (obj_1 === obj_2) {
    // 如果完全相同，返回true
    return true;
  } else {
    let objType_1 = getType(obj_1),
      objType_2 = getType(obj_2);
    if (objType_1 !== objType_2) {
      // 对象类型不同。返回false
      return false;
    } else {
      if (objType_1 == "object") {
        // 如果对象类型为object
        if (!isEquals(Object.keys(obj_1), Object.keys(obj_2))) {
          return false;
        }
        for (let key of Object.keys(obj_1)) {
          if (!isEquals(obj_1[key], obj_2[key])) {
            return false;
          }
        }
      } else if (objType_1 == "array") {
        // 如果对象类型为array
        if (obj_1.length != obj_2.length) {
          return false;
        }
        let i = 0;
        for (i; i < obj_1.length; i++) {
          if (!isEquals(obj_1[i], obj_2[i])) {
            return false;
          }
        }
      } else {
        // 其他类型返回false
        return false;
      }
    }
  }
  return true;
}

/**
 * 获取子节点
 * @param {*父节点} parent
 * @param {*子节点} children
 */
export function isChildrenExist(parent, children) {
  if (getType(parent.children) == "array") {
    if (parent.children.getIndexById(children.id) != -1) {
      return true;
    } else {
      if (parent.children.children) {
        return isChildrenExist(parent.children, children);
      }
    }
  }
  return false;
}

/**
 * 将节点数组平展为一维数组
 * @param {*节点数组} nodeList
 * @param {*用于存放子节点的属性名称，默认为children} children
 * @param {*用于处理忽略子节点的条件数组} ignoreNode
 */
export function getLinearList(nodesList, children, ignoreNode) {
  !children ? (children = "children") : "";
  let res = [];
  if (!nodesList || nodesList.length === 0) return res;
  for (let node of nodesList) {
    let resItem = {};
    let childrenItem = [];
    if (node[children] && node[children].length > 0) {
      // res.push.apply(res,this.getLinearList(node.children));
      childrenItem = getLinearList(node[children], children, ignoreNode);
    }
    let isIgnore = false;
    if (ignoreNode) {
      ignoreNode.forEach(ignore => {
        isIgnore = isIgnore || node[ignore.param] == ignore.value;
        if (isIgnore) return;
      });
      // if (resule)
      //   continue;
    }
    // console.log(node)
    if (!isIgnore) {
      resItem = node;
      res.push(resItem);
    }
    // console.log("before-push-child",res)
    res.push.apply(res, childrenItem);
    // console.log("after-push-child",res)
  }
  // console.log('res', res)
  return res;
}

/**
 * 将最小子项的Id组成一维数组
 * @param {*节点数组} nodesList
 * @param {*用于存放子节点的属性名称，默认为children} children
 * @param {*用于节点唯一标识的属性名称，默认为id} id
 */
export function getMinNodeIdList(nodesList, children, id) {
  !children ? (children = "children") : "";
  !id ? (id = "id") : "";
  let res = [];
  // let i = 0
  // let j = 0
  for (let node of nodesList) {
    let resItem = [];
    if (node[children] && node[children].length > 0) {
      resItem = getMinNodeIdList(node[children], children, id);
      // i++
      // console.log(`第${i}轮结束`)
      // console.log(`resItem-i${i}`, resItem)
    } else {
      // j++
      resItem.push(node[id]);
      // console.log(`resItem------j${j}`, resItem)
    }
    res.push.apply(res, resItem);
    // console.log(`res---i${i}----j${j}`, res)
  }
  // console.log(i, j)
  // console.log('MinNodeIdList', res)
  return res;
}

/**
 * 获取默认选中
 * @param {* 节点数组} nodesList
 * @param {* 用于存放子节点属性，包括id唯一标识、children子节点标识、checked选中标识} prop
 * @param {* 标识子节点标识是否需要判断长度(默认false) - false表示如果无子节点则children为null,true表示如果无子节点children为空数组} isChildLen
 * @param {* 标识是否返回对象列表，默认false, 返回id列表} getNodes
 * @return {* 属性checked为true的子节点id或对象数组}
 */
export function getDefaultChecked(nodesList, props, isChildLen, getNodes) {
  props = props || {
    children: "childern",
    id: "id",
    checked: "checked",
  };
  let defaultCheckedList = [];
  for (let node of nodesList) {
    if (node[props.children]) {
      if (isChildLen) {
        if (node[props.children].length > 0) {
          let temp = getDefaultChecked(node[props.children], props, isChildLen, getNodes);
          if (temp.length > 0) {
            defaultCheckedList.push.apply(defaultCheckedList, temp);
          }
        } else {
          if (node[props.checked || props.selected]) {
            getNodes ? defaultCheckedList.push(node) : defaultCheckedList.push(node[props.id]);
          }
        }
      } else {
        let temp = getDefaultChecked(node[props.children], props, isChildLen, getNodes);
        if (temp.length > 0) {
          defaultCheckedList.push.apply(defaultCheckedList, temp);
        }
      }
    } else {
      if (node[props.checked || props.selected]) {
        getNodes ? defaultCheckedList.push(node) : defaultCheckedList.push(node[props.id]);
      }
    }
  }
  return defaultCheckedList;
}
/**
 * 搜索框搜索
 * @param {* 对象参数 -type 用于区分评分项或者科室搜索框的类型
 *                   -label 用于存放显示文本的属性名称        } params
 * @return {* 查询出的结果数组}
 */
export function queryResult(queryString, callback, params, isGetChecked) {
  let res = [];
  if (isGetChecked) {
    let firstItem = {};
    if (params.filterList.length) {
      firstItem.label = "展示全部";
      firstItem.value = " ";
    } else {
      firstItem.label = "展示勾选";
      firstItem.value = "getChecked";
    }
    res.push(firstItem);
  }

  res.push.apply(
    res,
    queryString ?
    params.arrayList.filter(createFuzzyQuery(queryString.trim(), params.label, params.code)) :
    params.arrayList
  );
  callback(res);
  return res;
}
/**
 * 模糊查询
 * @param {* 查询字符串} queryString
 * @param {* 用于存放显示文本的属性名称，默认为label} label
 * @return {* 模糊查询结果数组}
 */
function createFuzzyQuery(queryString, label, code) {
  return items => {
    !label ? (label = "label") : "";
    !code ? (code = "id") : "";
    return items[label].indexOf(queryString) != -1 || items[code].indexOf(queryString) != -1;
  };
}

export function filterMenuFun(queryString, menuListFull, name, subList) {
  if (queryString) {
    let result = [];
    menuListFull.forEach(m => {
      if (m[name].toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
        result.push(m);
      } else {
        if (m[subList] && m[subList].length > 0) {
          let subResult = [],
            subArrayList = deepClone(m);
          subResult = filterMenuFun(queryString, subArrayList[subList], name, subList);
          if (subResult.length > 0) {
            subArrayList[subList] = subResult;
            result.push(subArrayList);
          }
        }
      }
    });
    return result;
  } else {
    return menuListFull;
  }
}

// 格式化计算日期的天数 月/日/年
function formatterDate(date) {
  let dateType = getType(date),
    res = null;
  if (dateType == "string") {
    date = date.split(" ")[0].split("-");
    res = `${date[1]}/${date[2]}/${date[0]}`;
  } else if (dateType == "date") {
    res = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  return res;
}
/**
 * 计算日期相差天数
 * @param {*日期1} sDate1
 * @param {*日期2} sDate2
 */
export function datedifference(sDate1, sDate2) {
  //sDate1和sDate2是2006-12-18格式
  sDate1 = formatterDate(sDate1);
  sDate2 = formatterDate(sDate2);
  var dateSpan,
    // tempDate,
    iDays = null;
  if (sDate1 && sDate2) {
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  }
  return iDays;
}

// 获取需要计算的时间--用于计算质控列表时效时间
export function getComputeDate(rowData) {
  let qcStatus = rowData.qcStatus,
    prevQcStatus = rowData.prevQcStatus,
    maProcessLatestOrFirst = rowData.maProcessLatestOrFirst,
    resDate = null;
  if (qcStatus == "0") {
    // 状态出区--未提交（虚拟） 0
    resDate = new Date();
  } else {
    // 非出区状态
    if (
      qcStatus == "952067" ||
      qcStatus == "952069" ||
      qcStatus == "952070" ||
      qcStatus == "952068"
    ) {
      // 质控状态==未质控952067 已返修952069 医生复议952070 已打回952068
      resDate = new Date();
    } else if (qcStatus == "952071" || qcStatus == "952072") {
      // 质控状态==质控通过952071 强制质控完成952072
      resDate = rowData.docModifiedAt; // 医生更新时间
    } else if (qcStatus == "958565") {
      // 质控状态==临床已撤销958565
      if (prevQcStatus == "952067" || prevQcStatus == "952071" || prevQcStatus == "952072") {
        // 上一质控状态== 未质控952067 质控通过952071 强制质控完成952072
        if (Number(maProcessLatestOrFirst) == 1) {
          // 首次提交
          resDate = rowData.createdAtRe; // 结果创建时间
        } else if (Number(maProcessLatestOrFirst) == 0) {
          // 最新提交
          resDate = new Date();
        }
      } else if (prevQcStatus == "952068" || prevQcStatus == "952069" || prevQcStatus == "952070") {
        // 上一质控状态==已打回952068 已返修952069 医生复议952070
        resDate = new Date();
      }
    }
  }
  return resDate;
}

// 格式化表格json数据:将对象数组每一项处理为一维数组(其中的object数据取出，array数据保持不变)
export function formatJsonListToTable(jsonList) {
  const type = getType(jsonList);
  if (type != "array") {
    return false;
  }
  let res = [];
  jsonList.forEach(json => {
    res.push(formatJsonToTable(json));
  });
  return res;
}
export function formatJsonToTable(json) {
  let res = {},
    datatype;
  for (let val in json) {
    datatype = getType(json[val]);
    if (datatype === "object") {
      res = Object.assign(res, formatJsonToTable(json[val]));
    } else {
      res[val] = json[val];
    }
  }
  return res;
}

/**
 * 设置树选中--用于表格树
 * @author chenmengjie
 * newVal boolean类型，标识勾选或取消勾选
 * currentRow 当前行数据
 * props:
 *  id 本节点id字段名称
 *  children 子节点标识字段名称
 *  parentId 父节点id字段名称
 *  selected||checked 选中标识字段名称
 *  halfSelected||halfChecked 半选样式标识字段名称
 * type 全选类型--0 菜单, 1 科室(工作科室默认设置为与权限科室相同状态)
 * onlyParent 是否需要进行子节点判断标识
 * linearList 树形结构数据的一维数组
 */
export function setSelectAll(newVal, currentRow, props, type, onlyParent, linearList) {
  if (!onlyParent) {
    // 需要判断子节点---刚进入函数，非递归找父节点
    currentRow[props.selected || props.checked] = newVal; // selected置为当前勾选状态
    currentRow[props.halfSelected || props.halfChecked] = false; // 半勾选状态置为false
    type == 1 ? (currentRow[props.isWorkDept] = newVal) : "";
  }
  if (!onlyParent && currentRow[props.children] && currentRow[props.children].length > 0) {
    currentRow[props.children].forEach(val => {
      setSelectAll(newVal, val, props, type, onlyParent, linearList);
    });
  }
  if (currentRow[props.parentId]) {
    // let linearList = type ? this.deptTreeDataLinear : this.menuTreeDataLinear;
    // let parentNode = linearList[linearList.getIndexById(currentRow[props.parentId], props.id)];
    // 获取父节点
    let parentNode = linearList ?
      linearList.find(node => {
        return currentRow[props.parentId] === node[props.id];
      }) || null :
      null;
    if (!parentNode) return;
    let isAll = true, // 全选中标识
      isHalf = false; // 半选中标识
    parentNode[props.children].forEach(child => {
      if (!child[props.selected || props.checked]) {
        isAll = false;
        if (child[props.halfSelected || props.halfChecked]) {
          isHalf = true;
          return;
        }
      } else {
        !isHalf ? (isHalf = true) : "";
      }
    });
    if (isAll) {
      parentNode[props.selected || props.checked] = true;
      parentNode[props.halfSelected || props.halfChecked] = false;
      type == 1 ? (parentNode[props.isWorkDept] = true) : "";
      setSelectAll(newVal, parentNode, props, type, true, linearList);
    } else {
      parentNode[props.selected || props.checked] = false;
      type == 1 ? (parentNode[props.isWorkDept] = false) : "";
      if (!isHalf) {
        parentNode[props.halfSelected || props.halfChecked] = false;
      } else {
        parentNode[props.halfSelected || props.halfChecked] = true;
      }
    }
    setSelectAll(newVal, parentNode, props, type, true, linearList);
  }
}
