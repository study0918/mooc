import Vue from "vue";
import Router from "vue-router";
import message from "../examples/message.vue";
import input from "../examples/input.vue";
import card from "../examples/card.vue";
import clickoutside from "../examples/clickoutside.vue";
import attrs from "../examples/attrs/father.vue";
import iframe from "../examples/iframe/demo3.vue";
import childIframe from "../examples/iframe/childIframe";

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
    },
    {
      path: "/clickoutside",
      name: "clickoutside",
      component: clickoutside
    },
    {
      path: "/attrs",
      name: "attrs",
      component: attrs
    },
    {
      path: "/iframe",
      name: "iframe",
      component: iframe
    },
    {
      path: "/childIframe",
      name: "childIframe",
      component: childIframe
    }
  ]
});
