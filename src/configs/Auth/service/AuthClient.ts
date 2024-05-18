import axios, { AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import { BASE_CONFIGS } from '../config';
import { IAuthClient, ITokenParams } from '../interfaces';
import { AUTH_ROUTES } from './routes';

const ERR_MSG = 'Có lỗi trong quá trình thực thi';
const errorCallback = (status: number, { message, error }) => ({
  status,
  error: message || error,
});
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const { client_id, redirect_uri, authorizationParams, client_secret } = BASE_CONFIGS;

const buildTokenParams = ({ token, grant_type }: ITokenParams) => {
  if (grant_type === 'access_token')
    return {
      client_id,
      redirect_uri,
      code: token,
      grant_type: 'authorization_code',
    };

  return {
    client_id,
    scope: authorizationParams?.scope,
    refresh_token: token,
    grant_type: 'refresh_token',
  };
};

const buildHeaders = () => {
  const clientAuthentication = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${clientAuthentication}`,
  };
};

const getAuthClient: (issuer: string) => IAuthClient = (issuer = '') => {
  const api: AxiosInstance = axios.create({
    baseURL: issuer,
    timeout: 30000,
    headers,
  });

  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    ({ data }: AxiosResponse) => data,
    ({ response }: AxiosError) =>
      errorCallback(response?.status, (response?.data as any) || { error: ERR_MSG }),
  );

  return {
    getToken: ({ token, grant_type }: ITokenParams) => {
      const params = buildTokenParams({ grant_type, token });
      const headers = buildHeaders();

      return api.post(`${AUTH_ROUTES.TOKEN}`, params, {
        headers,
      });
    },
    logout: () => api.get(AUTH_ROUTES.LOGOUT),
    introspectToken: (params: ITokenParams) => api.post(`${AUTH_ROUTES.INTROSPECT_TOKEN}`, params),
  };
};

export default getAuthClient;
