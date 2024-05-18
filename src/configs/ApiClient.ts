import { APIResponse } from '@/interfaces';
import axios, { AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
let isRefreshing = false;
let failedQueue: any[] = [];

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const REFRESH_URL = `${APP_URL}/api/auth/refresh_token`;
const errorMessage = 'Có lỗi trong quá trình thực thi';

const errorCallback = (status: number, dataError: any) => ({
  status,
  error: dataError?.message || dataError?.error,
});

const processQueue = (error?: AxiosError) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  failedQueue = [];
};

const handlePushToLogin = async () => {
  window.location.href = '/api/auth/login';
};

const stopRequest = async (config: InternalAxiosRequestConfig<any>, api: AxiosInstance) =>
  new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  })
    .then(() => config && api(config))
    .catch((err) => Promise.reject(err));

const handleRq = (config: any) => {
  const token = localStorage.getItem('token') ?? '';
  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

const handleRqErr = (error) => Promise.reject(error);

const handleResponeData = ({ data }: AxiosResponse) =>
  data.success === false ? { ...data, status: 400, error: data?.message ?? errorMessage } : data;

class ApiClient {
  baseURL: string;
  api: AxiosInstance;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || '';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });
    this.api.interceptors.request.use(handleRq, handleRqErr);
    this.api.interceptors.response.use(handleResponeData, this.handleResponseError);
  }

  handleResponseError = async (error: AxiosError) => {
    const { config, response: resError } = error;
    const dataError: any = resError?.data;
    const isRefreshTokenErr = config.url === REFRESH_URL;

    switch (resError?.status) {
      case 403:
        isRefreshTokenErr && handlePushToLogin();
        return errorCallback(403, dataError);

      case 401:
        window.prompt('helo1');

        if (isRefreshTokenErr) {
          handlePushToLogin();
          return errorCallback(401, dataError);
        }

        if (isRefreshing) return stopRequest(config, this.api);
        isRefreshing = true;

        const res: APIResponse = await this.api.get(REFRESH_URL);
        const access_token = res?.data?.access_token;

        window.prompt('helo');

        if (!access_token) {
          processQueue(new AxiosError('Token hết hạn!'));
          handlePushToLogin();
        } else {
          localStorage.setItem('token', access_token);

          if (config)
            return this.api(config).finally(() => {
              isRefreshing = false;
              processQueue();
            });
        }

        return Promise.reject(error);
      default:
        return errorCallback(500, dataError);
    }
  };

  getInstance = () => this.api;
}

export default ApiClient;
