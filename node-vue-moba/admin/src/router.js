import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
Vue.use(Router)

const router = new Router({
    routes:[{
        path:'/',
        name:'main',
        component:Main,
        children: [ { path: '/categories/create', component: CategoryEdit }]
    }]
})

export default router