import axios from './axios';


/**
 * 登录
 */
export const loginData = data => {
    return axios({
        url: 'login',
        data: data
    });
};

/**
 * 获取表格数据/或者搜素数据
 */
export const getBackgroundData = data => {
    return axios({
        url: 'QAList',
        method: 'post',
        data: data
    });
};
/**
 * 删除表格数据
 */

export const removeBackgroundData = data => {
    return axios({
        url: 'QAList/remove',
        method: 'post',
        data: data
    });
};
/**
 * 编辑表格数据
 */
export const editBackgroundData = data => {
    return axios({
        url: 'QAList/update',
        method: 'post',
        data: data
    });
};

/**
 * 新增表格数据
 */
export const addBackgroundData = data => {
    return axios({
        url: 'QAList/insert',
        method: 'post',
        data: data
    });
};