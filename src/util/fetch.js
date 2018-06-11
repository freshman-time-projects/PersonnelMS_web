import axios from 'axios';
import * as H from 'history';
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/api/', // api的base_url
  timeout: 15000, // 请求超时时间
  // withCredentials: true // 允许携带cookie
});

// request拦截器
service.interceptors.request.use((config) => {
  // 此处可以考虑根据cookie做判断
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response);
    // 这个地方根据业务返回值做修改
    const res = response;
    if (res.data.code === 1) {
      // 调用路由跳转到登录页，并
      console.log('历史对象：', H.createHashHistory().push('/login'));
      return Promise.reject();
    }
    return res;
  },
  (error) => {
    console.log(`err${error}`);// for debug
    return Promise.reject(error);
  }
);

export default service;
