import axios, { AxiosResponse } from 'axios';
import { AccessTokenDto, LoggedInUserDto, LoginDto } from '../dto';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
});

export const postLoginData = async (LoginDto: LoginDto, register: boolean = false) => {
  const url = register ? '/auth/register' : '/auth/login';
  const response = await api.post<LoginDto, AxiosResponse<LoggedInUserDto>>(url, LoginDto);
  console.log('response')
  console.log(response)
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post<string, AxiosResponse<AccessTokenDto>>('/auth/refresh', { refresh_token: refreshToken });
  return response.data;
};
