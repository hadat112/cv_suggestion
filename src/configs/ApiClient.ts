import { APIResponse } from '@/interfaces';
import axios, { AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
let isRefreshing = false;
let failedQueue: any[] = [];

const REFRESH_URL = process.env.NEXT_PUBLIC_APP_URL;
const errorMessage = 'Có lỗi trong quá trình thực thi';

const errorCallback = (status: number, dataError: any) => {
  const message = dataError?.message || dataError?.error;

  return { status, error: message || errorMessage };
};

const processQueue = (error: AxiosError | null, token = null) => {
  failedQueue.forEach((item) => {
    error ? item.reject(error) : item.resolve(token);
  });

  failedQueue = [];
};

const handlePushToLogin = async () => {
  window.location.href = '/login';
};

const handle403Status = async (dataError, config) => {
  if (config.url === `${REFRESH_URL}/api/auth/refresh_token`) {
    handlePushToLogin();
  }
  return errorCallback(403, dataError);
};

const handleRefreshToken = async (config: InternalAxiosRequestConfig<any>, api: AxiosInstance) => {
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  })
    .then(() => {
      if (config) return api(config);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

class ApiClient {
  baseURL: string;
  tokenType: string;
  errorCb: (status: number, dataError: any) => void;

  constructor(baseURL?: string, tokenType?: string, errorCb = errorCallback) {
    this.baseURL = baseURL || '';
    this.tokenType = tokenType || '';
    this.errorCb = errorCb;
  }

  getInstance() {
    const api: AxiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Token-Source': 'SME',
      },
    });

    api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token') ?? '';

        if (config.headers && this.tokenType) {
          config.headers[this.tokenType] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        const data = response.data;

        if (data.success === false) {
          const message = data?.message ?? errorMessage;
          return { ...response.data, status: 400, error: message };
        }

        return response.data;
      },
      async (error: AxiosError) => {
        const config = error.config;
        const resError = error.response;
        const dataError: any = resError?.data;

        switch (resError?.status) {
          case 500:
            return this.errorCb(500, dataError);
          case 403: {
            return handle403Status(dataError, config);
          }
          case 401:
            if (config.url === `${REFRESH_URL}/api/auth/refresh_token`) {
              handlePushToLogin();
              return this.errorCb(401, dataError);
            }

            // Handle if token is refreshing
            if (isRefreshing) {
              return handleRefreshToken(config, api);
            }
            isRefreshing = true;

            const res: APIResponse<{
              access_token: string;
            }> = await api.get(`${REFRESH_URL}/api/auth/refresh_token`);

            if (!res?.data?.access_token) {
              processQueue(new AxiosError('Token hết hạn!'), null);
              handlePushToLogin();
            }

            if (res?.data?.access_token) {
              const { access_token } = res.data;
              localStorage.setItem('token', access_token);
              if (config)
                return api(config).finally(() => {
                  isRefreshing = false;
                  processQueue(null, access_token);
                });
            }

            return Promise.reject(error);
          default:
            return this.errorCb(500, dataError);
        }
      }
    );
    return api;
  }
}

export default ApiClient;
