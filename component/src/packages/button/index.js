import ElButton from "./src/button.vue";
ElButton.install = Vue => {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;
