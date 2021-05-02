import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Button, List } from "antd";
import store from "./store";
class TodoList extends Component {
  constructor(props) {
    super(props);
    console.log("store", store);
    this.state = store.getState();
    // console.log("state", this.state);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.clickBtn = this.clickBtn.bind(this);
    store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <div>
          <Input
            placeholder={this.state.inputValue}
            style={{ width: "250px", marginRight: "10px" }}
            onChange={this.changeInputValue}
            value={this.state.inputValue}
          ></Input>
          <Button type="primary" onClick={this.clickBtn}>
            增加
          </Button>
        </div>
        <div style={{ margin: "10px", width: "300px" }}>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          ></List>
        </div>
      </div>
    );
  }
  changeInputValue(e) {
    const action = {
      type: "changeInput",
      value: e.target.value,
    };
    store.dispatch(action);
  }
  storeChange() {
    this.setState(store.getState());
  }
  clickBtn() {
    const action = {
      type: "addItem",
    };
    store.dispatch(action);
  }
}

export default TodoList;
