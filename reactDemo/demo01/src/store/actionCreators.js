import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM,GET_LIST } from "./actionTypes";

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号
export const changeInputAction = (value) => ({
  type: CHANGE_INPUT,
  value,
});

export const addItemAction = () => ({
  type: ADD_ITEM,
});

export const deleteItemAction = (index) => ({
  type: DELETE_ITEM,
  index,
});

export const getListAction=(data)=>({
  type:GET_LIST,
  data
})