import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import CategoryEdit from "./views/CategoryEdit.vue";
import CategoryList from "./views/CategoryList.vue";

import ItemEdit from "./views/ItemEdit.vue";
import ItemList from "./views/ItemList.vue";

import HeroEdit from "./views/HeroEdit.vue";
import HeroList from "./views/HeroList.vue";

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        { path: "/categories/create", component: CategoryEdit },
        { path: "/categories/list", component: CategoryList },
        // https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F
        { path: "/categories/edit/:id", component: CategoryEdit, props: true },
        { path: "/items/create", component: ItemEdit },
        { path: "/items/edit/:id", component: ItemEdit, props: true },
        { path: "/items/list", component: ItemList },
        { path: "/heroes/create", component: HeroEdit },
        { path: "/heroes/edit/:id", component: HeroEdit, props: true },
        { path: "/heroes/list", component: HeroList },
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },
      ],
    },
  ],
});

export default router;
