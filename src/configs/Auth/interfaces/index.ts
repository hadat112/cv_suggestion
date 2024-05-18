import { APIResponse } from '@/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export interface BaseConfig {
  appUrl: string;
  issuer: string;
  redirectUri: string;
  cookieOptions: {
    secure: boolean;
    sameSite: string;
    path: string;
    httpOnly: boolean;
  };
}

export type AuthInstance = (req: NextApiRequest, res: NextApiResponse) => Promise<NextApiResponse<any>>;

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
  grant_type: string;
}

export interface IAuthClient {
  getToken(params: ITokenParams): any;
  logout(): any;
  introspectToken(params: ITokenParams): any;
}

export interface IUserInfo {
  avatar?: string;
  email?: string;
  name?: string;
}
