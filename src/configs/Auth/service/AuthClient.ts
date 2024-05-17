import { APIResponse } from '@/interfaces';
import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import { IAuthClient, ITokenParams } from '../interfaces';
import { AUTH_ROUTES } from './routes';

const errorCallback = (status: number, error: string) => {
  return { status, error };
};

export const AuthClient = (issuer?: string) => {
  const baseURL: string = issuer || '';

  const _getInstance = () => {
    const api: AxiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token-Source': 'SME',
      },
    });

    api.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        const data = response.data;
        if (data.success === false) {
          const message = typeof data?.message === 'string' ? data?.message : '';
          return { ...response.data, status: 400, error: message || 'Có lỗi trong quá trình thực thi' };
        }

        return response.data;
      },
      async (error: AxiosError) => {
        const resError = error.response;
        const dataError: any = resError?.data;

        return errorCallback(
          resError?.status,
          (resError && (dataError?.message || dataError?.error)) || 'Có lỗi trong quá trình thực thi',
        );
      },
    );
    return api;
  };

  const getClient = (): IAuthClient => {
    const api = _getInstance();

    return {
      refreshToken(params: { refresh_token: string }): Promise<APIResponse<any>> {
        return api.post(`${AUTH_ROUTES.REFRESH_TOKEN}`, params);
      },

      basicLogin(params: { identity: string; password: string }) {
        return api.post(`${AUTH_ROUTES.BASIC_LOGIN}`, params);
      },

      otpLogin(params: { identity: string; otp: string }) {
        return api.post(`${AUTH_ROUTES.OTP_LOGIN}`, { identity: params?.identity, otp: params?.otp });
      },

      googleLogin(params: {
        authorization_code: 'string';
        user_type: 'SHOP' | 'SHOP_STAFF';
        phone?: 'string';
        redirect_uri: 'string';
      }) {
        return api.post(`${AUTH_ROUTES.GOOGLE_LOGIN}`, params, {
          headers: {
            'X-Platform-Type': 'WEB',
          },
        });
      },

      facebookLogin(params: {
        authorization_code: 'string';
        user_type: 'SHOP' | 'SHOP_STAFF';
        phone?: 'string';
        redirect_uri: 'string';
      }) {
        return api.post(`${AUTH_ROUTES.FACEBOOK_LOGIN}`, params, {
          headers: {
            'X-Platform-Type': 'WEB',
          },
        });
      },

      revokeToken(params: ITokenParams): Promise<{
        error?: string;
        status?: number;
        message: string;
      }> {
        return api.delete(`${AUTH_ROUTES.REVOKE_TOKEN}`, { params });
      },

      introspectToken(params: ITokenParams): Promise<APIResponse<any>> {
        return api.post(`${AUTH_ROUTES.INTROSPECT_TOKEN}`, params);
      },
    };
  };

  return {
    getClient,
  };
};

export default AuthClient;
