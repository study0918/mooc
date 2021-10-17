import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://metinseylan.com:1992',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {
    path: "/my-app/"
  } //Optional options
}))
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
