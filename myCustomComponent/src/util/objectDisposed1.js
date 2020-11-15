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
  for (let node of nodesList) {
    let resItem = [];
    if (node[children] && node[children].length > 0) {
      // res.push.apply(res,this.getLinearList(node.children));
      resItem = getMinNodeIdList(node[children], children, id);
    } else {
      resItem.push(node[id]);
    }
    res.push.apply(res, resItem);
  }
  return res;
}

/**
 * 获取默认选中
 * @param {* 节点数组} nodesList
 * @param {* 用于存放子节点属性，包括id唯一标识、children子节点标识、checked选中标识} props
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
