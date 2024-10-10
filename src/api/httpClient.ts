import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { setIsloadingAction } from '../redux/AppActions';
import toastService from '../libs/toastService';
import store from '../redux/store';
import { isPlatform } from '@ionic/react';
import { DotEnv, Envs } from '../types';

const env = import.meta.env as unknown as DotEnv;
console.log('import env')
console.log(import.meta.env);
console.log(!env.VITE_ENV);
if (!env.VITE_ENV) {
  console.log(true);
  // @ts-ignore
  env.VITE_ENV = window.SERVER_DATA.VITE_ENV as string
}

if (!env.VITE_URL) {
  console.log(true);
  // @ts-ignore
  env.VITE_URL = window.SERVER_DATA.VITE_URL as string
}

console.log('env')
console.log(env);
const baseURL = getBaseUrl();

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


function getBaseUrl() {
  const env = import.meta.env as unknown as DotEnv;
  console.log('env')
  console.log(env);
  const isLocalEnv = env.VITE_ENV === Envs.local;
  console.log('isLocalEnv')
  console.log(isLocalEnv);
  if (isLocalEnv) {
    const isMobile = isPlatform('ios') || isPlatform('android');
    if (isMobile) {
      return env.VITE_DEV_MOBILE_BACKEND_URL;
    } else {
      return env.VITE_DEV_URL;
    }
  } else {
    return env.VITE_URL
  }
}

export default httpClient;
