import Vue from 'vue'
import Router from 'vue-router'

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
                component: () =>
                    import ('../qa/index.vue'),
                meta: { title: '表格数据' }
            }]
        }
    ]
})