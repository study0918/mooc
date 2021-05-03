import { takeEvery, put } from "redux-saga/effects";
import { GET_MY_LIST } from "./actionTypes";
import { getListAction } from "./actionCreators";
import axios from "axios";
function* mySaga() {
  // 监听到GET_MY_LIST时执行getList
  yield takeEvery(GET_MY_LIST, getList);
}

function* getList() {
  //   axios
  //     .get(
  //       "https://mock.mengxuegu.com/mock/608ebea81d10f86a7bd6aced/example/todolist"
  //     )
  //     .then((res) => {
  //       const data = res.data;
  //       const action = getListAction(data);
  //       put(action);
  //     });
  const res = yield axios.get(
    "https://mock.mengxuegu.com/mock/608ebea81d10f86a7bd6aced/example/todolist"
  );
  const action = getListAction(res.data);
  yield put(action);
}

export default mySaga;
