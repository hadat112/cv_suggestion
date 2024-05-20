import ApiClient from '@/configs/ApiClient';

const AUTH_URL = process.env.NEXT_PUBLIC_OIDC_ISSUER;

const api = new ApiClient(AUTH_URL).getInstance();

export const getUserInfo = () => api.get('/userinfo');
