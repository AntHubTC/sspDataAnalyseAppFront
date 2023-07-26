import { ElMessage } from 'element-plus'
import axios, { type AxiosInstance } from 'axios'

const service:AxiosInstance = axios.create({
    // 打包到springboot使用/
    baseURL:'/',
    // baseURL:'/api',
    timeout: 10000
})

//  RESPONSE 响应异常拦截
service.interceptors.response.use(response => {
    return new Promise((resolve, reject) => {
        if (response.status === 200 && response.data) {
            let busData = response.data;
            if (busData.status !== '000000') {
                ElMessage.error(busData.data)
                return reject(response);
            }
            return resolve(response.data.data);
        }
        return reject(response);
    });
}, response => {
    return new Promise((resolve, reject) => {
        //==============  错误处理  ====================
        if (response && response.response) {
            switch (response.response.status) {
                case 400: response.message = '请求错误(400)'; break;
                case 401: response.message = '未授权，请重新登录(401)'; break;
                case 403: response.message = '拒绝访问(403)'; break;
                case 404: response.message = '请求出错(404)'; break;
                case 408: response.message = '请求超时(408)'; break;
                case 500: response.message = '服务器错误(500)'; break;
                case 501: response.message = '服务未实现(501)'; break;
                case 502: response.message = '网络错误(502)'; break;
                case 503: response.message = '服务不可用(503)'; break;
                case 504: response.message = '网络超时(504)'; break;
                case 505: response.message = 'HTTP版本不受支持(505)'; break;
                default: response.message = `连接出错(${response.response.status})!`;
            }
        } else {
            response.message = '连接服务器失败!'
        }
        // ElMessage.error(response.message)
        return reject(response);
    });
});
 
export default service