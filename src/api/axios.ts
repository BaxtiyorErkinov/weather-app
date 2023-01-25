import axios from 'axios';
import { api_key, base_url } from './constants';

const axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.params.appid = api_key;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
