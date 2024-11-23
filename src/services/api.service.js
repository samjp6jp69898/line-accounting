import axios from "axios";
import config from "../config";

// 创建 Axios 实例
const httpClient = axios.create({
  baseURL: config.apiBaseUrl, // 替换为你的 API 地址
});

function _post(path, data) {
  return httpClient.post(path,
    {
      data: JSON.stringify(data),
    });
}

function _get(path) {
  return httpClient.get(path);
}

httpClient.interceptors.response.use((response) => {
  // 成功處理 API 回應
  return response;
}, (error) => {
  // 處理錯誤
  console.error('API error', error);
  const status = error.response.status;
  console.error('API error, status: ', error.response.status);

  return Promise.reject(error);
});

// 请求拦截器，用于在每个请求前添加逻辑
httpClient.interceptors.request.use(
  (config) => {
    // console.log('config', config);
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // 可以在请求发送前添加 token 等逻辑
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (data) => _post('/login', data)