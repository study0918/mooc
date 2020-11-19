import Vue from "vue";
import { on } from "./dom";

const nodeList = [];
const ctx = "@@clickoutsideContext";

let startClick;
let seed = 0;

!Vue.prototype.$isServer && on(document, "mousedown", e => (startClick = e));
!Vue.prototype.$isServer &&
  on(document, "mouseup", e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
  });
