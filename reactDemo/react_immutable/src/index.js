import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import {combineReducers} from 'redux-immutable'
import {Map} from 'immutable'
import {Provider} from 'react-redux'

const cart = (state=Map({}),action) =>{
 switch(action.type) {
   case "SAVE_TO_CART":
     return state.set(action.payload.goods_name,action.payload.count)
   default:
     return state  
 }
}
const reducers = combineReducers({cart})
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
store.subscribe(()=>{
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  );
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
