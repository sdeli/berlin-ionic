import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { setIsloadingAction } from '../redux/AppActions';
import toastService from '../libs/toastService';
import store from '../redux/store';
import { isPlatform } from '@ionic/react';

const isLocalEnv = import.meta.env.VITE_ENV === 'local';
let baseURL: string;
if (isLocalEnv) {
  const isMobile = isPlatform('ios') || isPlatform('android');
  if (isMobile) {
    baseURL = import.meta.env.VITE_DEV_MOBILE_BACKEND_URL as string;
  } else {
    baseURL = import.meta.env.VITE_DEV_WEB_BACKEND_URL as string;
  }
} else {
  baseURL = import.meta.env.VITE_BACKEND_URL as string;
}
const httpClient = axios.create({
  baseURL,
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
  console.log('error happened');
  toastService.showErrorToast('Request Error');
  return Promise.reject(error);
});

httpClient.interceptors.response.use(function (response) {
  store.dispatch(setIsloadingAction(false));
  return response;
}, function (error) {
  store.dispatch(setIsloadingAction(false));
  console.log('error happened 3333');
  toastService.showErrorToast('Request Error');
  return Promise.reject(error);
});

export default httpClient;
