import { AxiosResponse } from 'axios';
import { AccessTokenDto, LoggedInUserDto, LoginDto } from '../dto';
import httpClient from './httpClient';


export const postLoginData = async (LoginDto: LoginDto, register: boolean = false) => {
  const url = register ? '/auth/register' : '/auth/login';
  const response = await httpClient.post<LoginDto, AxiosResponse<LoggedInUserDto>>(url, LoginDto);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await httpClient.post<string, AxiosResponse<AccessTokenDto>>('/auth/refresh', { refresh_token: refreshToken });
  return response.data;
};
