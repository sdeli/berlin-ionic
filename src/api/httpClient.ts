import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { setIsloadingAction } from '../redux/AppActions';
import toastService from '../libs/toastService';
import store from '../redux/store';
import { isPlatform } from '@ionic/react';

const env = import.meta.env as unknown as DotEnv;

const isLocalEnv = env.VITE_ENV === Envs.local;
let baseURL: string;

if (isLocalEnv) {
  const isMobile = isPlatform('ios') || isPlatform('android');
  if (isMobile) {
    baseURL = env.VITE_DEV_MOBILE_BACKEND_URL as string;
  } else {
    baseURL = env.VITE_DEV_WEB_BACKEND_URL as string;
  }
}

const isPreprodEnv = env.VITE_ENV === Envs.preprod;
if (isPreprodEnv) {
  baseURL = env.VITE_PREPROD_BACKEND_URL as string;
}

const isProdEnv = env.VITE_ENV === Envs.prod;
if (isProdEnv) {
  baseURL = env.VITE_ROD_BACKEND_URL as string;
} else {
  throw new Error('Env failure')
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
