import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { setIsloadingAction } from '../redux/AppActions';
import toastService from '../libs/toastService';
import store from '../redux/store';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(function (config) {
  store.dispatch(setIsloadingAction(true));
  return config;
}, function (error) {
  store.dispatch(setIsloadingAction(false));
  toastService.showErrorToast('Request Error');
  return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
  store.dispatch(setIsloadingAction(false));
  return response;
}, function (error) {
  store.dispatch(setIsloadingAction(false));
  toastService.showErrorToast('Request Error');
  return Promise.reject(error);
});

export default httpClient;
