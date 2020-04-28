import axios from './axios';

/**
 * koa node端的接口
 * /api/transmission 转发所有接口
 * /api/transmission/download 转发所有下载导出接口
 * /api/transmission/upload 转发所有上传接口
 */

export const sendRequest = async(method, url, data = {}, opts) => {
    const isMethodPost = method === 'POST';
    const isDownload = opts && opts.responseType === 'blob';

    const baseUrl = !isDownload ?
        '/api/transmission' :
        '/api/transmission/download';

    // 生产环境走koa
    return axios(baseUrl, {
        method,
        data: isMethodPost ? {
            data,
            url
        } : {},
        params: isMethodPost ? {} : {
            data,
            url
        },
        ...opts
    });
};

export const sendDevRequest = async(method, url, data = {}, opts) => {
    const isMethodPost = method === 'POST';

    // 开发环境直接请求
    return axios(url, {
        method,
        data: isMethodPost ? data : {},
        params: isMethodPost ? {} : data,
        ...opts
    });
};

const isProduction = process.env.NODE_ENV === 'production';
const request = isProduction ? sendRequest : sendDevRequest;

const http = async(method, url, data = {}, opts) => {
    return await request(method, url, data, opts);
};

export default http;