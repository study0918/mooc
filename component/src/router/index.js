import Vue from 'vue'
import Router from 'vue-router'
import message from '../examples/message.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'message',
      component: message
    }
  ]
})
