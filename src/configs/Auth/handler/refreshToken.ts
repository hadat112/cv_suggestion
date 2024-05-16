import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../interfaces';
import { getCookie } from '../utils/functions';

export default function handleRefreshToken({ getClient, baseConfig }: DefaultHandler) {
  const { cookieOptions } = baseConfig;
  const client = getClient();

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed', success: false });

    const refreshToken = req.cookies?.rt;
    if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token', success: false });

    const response = await client.refreshToken({ refresh_token: refreshToken });

    if (response?.error) {
      const rtCookie = getCookie('rt', cookieOptions);
      const atCookie = getCookie('at', cookieOptions);
      res.setHeader('set-cookie', [rtCookie, atCookie]);
      res.status(response.status).json(response);
    }
    if (response?.data) {
      // Set new tokens in cookie
      const rtCookie = getCookie('rt', cookieOptions, response?.data?.refresh_token);
      const atCookie = getCookie('at', cookieOptions, response?.data?.access_token);
      const tokenTypeCookie = getCookie('token_type', cookieOptions, response?.data?.token_type);

      res.setHeader('Set-Cookie', [rtCookie, atCookie, tokenTypeCookie]);
      res.status(200).json({
        data: {
          access_token: response?.data?.access_token,
        },
        success: true,
      });
    }
  };
}
