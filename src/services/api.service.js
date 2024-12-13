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

export const login = async (data) => _post('/auth/line', data)

export const getUserGroups = async () => _get('/mrsaccountant/user/groups');

export const createUserGroup = async (data) => _post('/mrsaccountant/user/groups', data);

export const addUserToGroup = async (userId, groupId) => _post(`/group/user/${userId}/${groupId}`);

export const getGroupTransactions = async (groupId) => _get(`/mrsaccountant/group/transaction?groupId=${groupId}`);

export const createGroupTransaction = async (groupId, data) => _post(`/mrsaccountant/group/transaction/${groupId}`, data);

export const updateGroupTransaction = async (transactionId, data) => _post(`/mrsaccountant/group/transaction/${transactionId}`, data);

export const deleteGroupTransaction = async (transactionId) => httpClient.delete(`/mrsaccountant/group/transaction/${transactionId}`);

export const getUserRecords = async (startdate, enddate) => {
  let url = '/mrsaccountant/user/records';
  if (startdate || enddate) {
    url += `?startdate=${startdate || ''}&enddate=${enddate || ''}`;
  }
  return _get(url);
};

export const addUserRecord = async (data) => _post('/mrsaccountant/user/records', data);

export const updateUserRecord = async (id, data) => _post(`/mrsaccountant/user/records/${id}`, data);

export const deleteUserRecord = async (id) => httpClient.delete(`/mrsaccountant/user/records/${id}`);

export const getSettlementDetails = async (groupId) => _get(`/mrsaccountant/settlement/${groupId}`);
