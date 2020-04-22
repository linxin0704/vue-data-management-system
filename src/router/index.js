import Vue from 'vue'
import Router from 'vue-router'
import QA from '../qa/index.vue'
import Login from '@/view/Login'
import Table from '@/view/Table'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/table',
            redirect: '/table/mainData',
        },
        {
            path: '/table',
            name: 'table',
            component: Table,
            children: [{
                path: '/table/mainData',
                component: QA

            }]
        }
    ]
})