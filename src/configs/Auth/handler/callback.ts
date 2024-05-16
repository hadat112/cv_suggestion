import { NextApiRequest, NextApiResponse } from 'next';
import { APIResponse } from '@/interfaces';
import { DefaultHandler, IToken } from '../interfaces';
import { getCookie, toQueryParams } from '../utils/functions';

// Don't need to send access token to client side instead we can store it in cookie
// and use Nextjs api route as a proxy to access it
export default function handleCallback({ baseConfig, getClient }: DefaultHandler) {
  const client = getClient();
  const { appUrl, cookieOptions, redirectUri } = baseConfig;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { code, error, error_description, phone, state, otp } = req.query as {
      code: string;
      error: string;
      error_description: string;
      phone: string;
      state: string;
      otp: string;
    };

    // Login flow:
    // login first time by 3rd party -> callback with authorizationcode -> update phone number page -> callback with phone + verifyToken/fbAccessToken + otp(optional) -> get token
    // login again by 3rd party -> callback and get token by authorizationcode

    // if callback from google, we will use verifyToken + phone + api client.googleLogin to exchange token
    // else if callback from facebook, we will use facebookAccessToken + phone + otp + api client.facebookLogin to exchange token

    const verifyToken = req.cookies?.verifyToken;
    const facebookAccessToken = req.cookies?.facebookAccessToken;

    let redirectUrl: string = appUrl;
    let query: string;

    if (error) {
      query = toQueryParams({
        error,
        error_description,
      });
      redirectUrl = `${appUrl}/callback${query}`;
    }

    if (code || phone) {
      const params: {
        authorization_code: string;
        user_type: string;
        redirect_uri: string;
        phone?: string;
        access_token?: string;
        facebook_access_token?: string;
        otp?: string;
      } = {
        authorization_code: code,
        user_type: 'SHOP',
        redirect_uri: redirectUri,
      };

      if (verifyToken) params.access_token = verifyToken;
      if (facebookAccessToken) params.facebook_access_token = facebookAccessToken;
      if (phone) {
        params.phone = phone;
        params.otp = otp;
      }

      let response: APIResponse<IToken>;

      if (state === 'facebook') response = await client.facebookLogin(params);
      else response = await client.googleLogin(params);

      if (response.error) {
        const verifyTokenCookie = getCookie('verifyToken', cookieOptions);
        const facebookAccessTokenCookie = getCookie('facebookAccessToken', cookieOptions);
        res.setHeader('set-cookie', [verifyTokenCookie, facebookAccessTokenCookie]);
        query = toQueryParams({
          error: response.error,
        });
        redirectUrl = `${appUrl}/callback${query}`;
      } else if (response.data.refresh_token) {
        const rtCookie = getCookie('rt', cookieOptions, response?.data?.refresh_token);
        const atCookie = getCookie('at', cookieOptions, response?.data?.access_token);
        const verifyTokenCookie = getCookie('verifyToken', cookieOptions);
        const facebookAccessTokenCookie = getCookie('facebookAccessToken', cookieOptions);

        res.setHeader('set-cookie', [rtCookie, atCookie, verifyTokenCookie, facebookAccessTokenCookie]);
        redirectUrl = appUrl;
      } else {
        const verifyTokenCookie = getCookie('verifyToken', cookieOptions, response?.data?.access_token);
        const facebookAccessTokenCookie = getCookie(
          'facebookAccessToken',
          cookieOptions,
          response?.data?.facebook_access_token
        );

        res.setHeader('set-cookie', [verifyTokenCookie, facebookAccessTokenCookie]);
        const query = toQueryParams({ state });
        redirectUrl = `${appUrl}/login-3rd-party${query}`;
      }
    }

    res.redirect(redirectUrl);
  };
}
