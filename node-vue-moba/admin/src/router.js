import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
Vue.use(Router)

const router = new Router({
    routes:[{
        path:'/',
        name:'main',
        component:Main,
        children: [ { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/list', component: CategoryList },
        // https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F
        { path: '/categories/edit/:id', component: CategoryEdit, props: true }]
    }]
})

export default router