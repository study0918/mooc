import Vue from "vue";
import { PopupManager } from ".";
import { addClass, removeClass } from "../dom";
let hasModal = false;
let hasInitZIndex = false;
let zIndex;

const getModal = function() {
  if (Vue.prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
};
