import React, { Component } from 'react';
import CartInfo from './CartInfo'
import InputBar from './InputBar'
import {Map} from 'immutable'

class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   cart:Map({})
    // }
  }
  // save=()=>{
  //   const goods_name = this.refs.goods_name.value;
  //   const count = this.refs.count.value;
  //   const newCart = this.state.cart.set(goods_name,count);
  //   this.setState({
  //     cart:newCart
  //   })
  // }
  render() {
    return (
      <div>
        <InputBar/>
        <hr/>
        <CartInfo></CartInfo>
      </div>
    )
  }
}
export default App;