import Vue from 'vue';
import App from './App.vue';
import hljs from 'highlight.js';
Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    let targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      if (binding.value) {
        target.innerHTML = binding.value;
      }
      hljs.highlightBlock(target);
    });
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});