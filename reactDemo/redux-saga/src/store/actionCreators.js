import {GET_MY_LIST, CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from "./actionTypes";
import axios from "axios";
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

export const getListAction = (data) => ({
  type: GET_LIST,
  data,
});

export const getTodoList = () => {
  return (dispatch) => {
    axios
      .get(
        "https://mock.mengxuegu.com/mock/608ebea81d10f86a7bd6aced/example/todolist"
      )
      .then((res) => {
        const data = res.data;
        const action = getListAction(data);
        dispatch(action);
      });
  };
};

export const getMyListAction=()=>({
  type:GET_MY_LIST
})