import Axios from 'axios';



const axios = Axios.create({
    timeout: 3000,
    baseURL: "https://www.alingyi.com:23666/",
    method: 'post',

});



// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);


// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
export default axios;