import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../interfaces';
import { getCookie } from '../utils/functions';

export default function handleLogin({ baseConfig, getClient }: DefaultHandler) {
  const client = getClient();
  const { cookieOptions } = baseConfig;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { identity, password, type, otp } = req.body || {};

    const params = {
      identity,
      password,
      otp,
    };

    let response;
    if (type === 'basic') response = await client.basicLogin(params);
    else response = await client.otpLogin(params);

    if (response?.error) res.status(response.status).json(response);
    if (response?.data) {
      // Set new tokens in cookie
      const rtCookie = getCookie('rt', cookieOptions, response?.data?.refresh_token);
      const atCookie = getCookie('at', cookieOptions, response?.data?.access_token);

      res.setHeader('Set-Cookie', [rtCookie, atCookie]);
      res.status(200).json({
        data: {
          access_token: response?.data?.access_token,
        },
        success: true,
      });
    }
  };
}
