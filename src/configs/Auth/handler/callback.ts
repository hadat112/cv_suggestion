import { APIResponse } from '@/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CONFIGS } from '../config';
import { IAuthClient, IToken } from '../interfaces';
import { getCookie, toQueryParams } from '../utils/functions';

// Don't need to send access token to client side instead we can store it in cookie
// and use Nextjs api route as a proxy to access it
export default function handleCallback(client: IAuthClient) {
  const { appUrl, cookieOptions } = BASE_CONFIGS;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { code, error, error_description, state } = req.query as any;
    const currentPath = JSON.parse(state as string);
    let redirectUrl: string = appUrl;

    if (error) {
      const query = toQueryParams({
        error,
        error_description,
      });
      redirectUrl = `${appUrl}/callback${query}`;
    }

    const params = {
      token: code as string,
      tokenType: 'access_token' as const,
    };

    const response = await client.getToken(params);

    if (response.error) {
      const query = toQueryParams({ error: response.error });
      redirectUrl = `${appUrl}/callback${query}`;
    } else {
      const { refresh_token, access_token } = response || {};
      const rtCookie = getCookie('rt', cookieOptions, refresh_token);
      const atCookie = getCookie('at', cookieOptions, access_token);

      res.setHeader('set-cookie', [rtCookie, atCookie]);
      redirectUrl = new URL(currentPath.current || '/', appUrl).toString();
    }

    res.redirect(redirectUrl);
  };
}
