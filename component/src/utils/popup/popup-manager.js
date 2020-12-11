import Vue from "vue";
import { addClass, removeClass } from "../dom";
let hasModal = false;
let hasInitZIndex = false;
let zIndex;

const getModal = function() {
  if (Vue.prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement("div");
    PopupManager.modalDom = modalDom;
    modalDom.addEventListener("touchmove", function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener("click", function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }
  return modalDom;
};

const instances = [];
const PopupManager = {
  modalFade: true,
  getInstance: function(id) {
    return instances[id];
  },
  register: function(id, instance) {
    if (id && instance) { 4
      instances[id] = instance;
    }
  },
  deregister: function(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function() {
    return PopupManager.zIndex++;
  }
};
