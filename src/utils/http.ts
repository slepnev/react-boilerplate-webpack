import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '../constants/config';
import { Store } from 'redux';
import { userLogoutAsync } from '../store/user/reducer';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: config.API_URL,
  withCredentials: true,
};

const http = axios.create(axiosConfig);

export const setupInterceptors = (store: Store, http: AxiosInstance) => {
  http.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  http.interceptors.response.use((response) => {
    console.log('response', response.data);

    return response.data || response;
  }, (error) => {
    if (error && error.response && error.response.status === 401) {
      store.dispatch(userLogoutAsync.success());
    }

    console.log('error', error.response);
    return Promise.reject(error);
  });
};

export default http;
