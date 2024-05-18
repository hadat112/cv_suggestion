import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CONFIGS } from '../config';
import { IAuthClient } from '../interfaces';
import { getCookie } from '../utils/functions';

export default function handleRefreshToken(client: IAuthClient) {
  const { cookieOptions } = BASE_CONFIGS;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed', success: false });

    const refreshToken = req.cookies?.rt;
    if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token', success: false });

    const params = {
      token: refreshToken,
      grant_type: 'refresh_token' as const,
    };

    const response = await client.getToken(params);
    const { refresh_token, access_token } = response?.data || {};

    if (!access_token) {
      const rtCookie = getCookie('rt', cookieOptions);
      const atCookie = getCookie('at', cookieOptions);
      res.setHeader('set-cookie', [rtCookie, atCookie]);
      res.status(response.status).json(response);
    }

    const rtCookie = getCookie('rt', cookieOptions, refresh_token);
    const atCookie = getCookie('at', cookieOptions, access_token);

    res.setHeader('Set-Cookie', [rtCookie, atCookie]);
    res.status(200).json({
      data: {
        access_token: response?.data?.access_token,
      },
      success: true,
    });
  };
}
