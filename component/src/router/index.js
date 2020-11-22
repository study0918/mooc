import Vue from "vue";
import Router from "vue-router";
import message from "../examples/message.vue";
import input from "../examples/input.vue";
import card from "../examples/card.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "message",
      component: message
    },
    {
      path: "/input",
      name: "input",
      component: input
    },
    {
      path: "/card",
      name: "card",
      component: card
    }
  ]
});
