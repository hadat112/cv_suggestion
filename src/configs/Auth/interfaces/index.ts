import { APIResponse } from '@/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export interface BaseConfig {
  appUrl: string;
  issuer: string;
  redirectUri: string;
  // googleAuthorizationParams: {
  //   client_id: string;
  //   issuer: string;
  //   include_granted_scopes: string;
  //   response_type: string;
  //   scope: string;
  //   state?: string;
  // };
  // facebookAuthorizationParams: {
  //   client_id: string;
  //   issuer: string;
  //   include_granted_scopes?: string;
  //   response_type: string;
  //   scope?: string;
  //   state?: string;
  // };
  cookieOptions: {
    secure: boolean;
    sameSite: string;
    path: string;
    httpOnly: boolean;
  };
}

export type AuthInstance = {
  handleAuth: (req: NextApiRequest, res: NextApiResponse) => Promise<NextApiResponse<any>>;
};

export interface IToken {
  phone?: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  facebook_access_token: string;
}

export interface ITokenParams {
  token?: string;
}

export interface IGoogleLogin {
  authorization_code: string | string[];
  user_type?: string;
  phone?: string;
  redirect_uri: string;
}

export interface IAuthClient {
  refreshToken({ refresh_token }): Promise<APIResponse<any>>;
  basicLogin({ identity, password }): Promise<APIResponse<any>>;
  otpLogin({ identity, otp }): Promise<APIResponse<any>>;
  googleLogin({
    authorization_code,
    user_type,
    phone,
    redirect_uri,
  }: IGoogleLogin): Promise<APIResponse<any>>;
  facebookLogin({
    authorization_code,
    user_type,
    phone,
    redirect_uri,
  }: IGoogleLogin): Promise<APIResponse<any>>;
  revokeToken({ token }: ITokenParams): Promise<{
    error?: string;
    status?: number;
    message: string;
  }>;
  introspectToken({ token }: ITokenParams): Promise<
    APIResponse<{
      active: boolean;
    }>
  >;
}

export interface DefaultHandler {
  baseConfig: BaseConfig;
  getClient: () => IAuthClient;
}

export interface IUserInfo {
  avatar?: string;
  email?: string;
  name?: string;
}
