import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CONFIGS } from '../config';
import { IAuthClient } from '../interfaces';
import { AUTH_ROUTES } from '../service/routes';
import { getCookie, toQueryParams } from '../utils/functions';

export default function handleLogout() {
  const { cookieOptions, issuer } = BASE_CONFIGS;

  return async (_req: NextApiRequest, res: NextApiResponse) => {
    const authorizeUrl = AUTH_ROUTES.LOGOUT;

    const rtCookie = getCookie('rt', cookieOptions);
    const atCookie = getCookie('at', cookieOptions);
    res.setHeader('set-cookie', [rtCookie, atCookie]);

    res.redirect(issuer + authorizeUrl);
  };
}
