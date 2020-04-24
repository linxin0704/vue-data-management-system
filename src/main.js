// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import {
    Button,
    Pagination,
    Input,
    Dialog,
    ButtonGroup,
    Table,
    TableColumn,
    Form,
    FormItem,
    Row,
    Container,
    Header,
    Aside,
    Main,
    MessageBox,
    Message,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
} from 'element-ui';


Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})