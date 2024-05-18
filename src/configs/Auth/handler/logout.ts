import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CONFIGS } from '../config';
import { IAuthClient } from '../interfaces';
import { AUTH_ROUTES } from '../service/routes';
import { getCookie, toQueryParams } from '../utils/functions';

export default function handleLogout() {
  const { cookieOptions, issuer, appUrl } = BASE_CONFIGS;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authorizeUrl = AUTH_ROUTES.LOGOUT;
    const { it } = req.cookies;
    const params = { post_logout_redirect_uri: appUrl, id_token_hint: it };
    const rtCookie = getCookie('rt', cookieOptions);
    const atCookie = getCookie('at', cookieOptions);
    const itCookie = getCookie('it', cookieOptions);
    res.setHeader('set-cookie', [rtCookie, atCookie, itCookie]);

    res.redirect(issuer + authorizeUrl + (toQueryParams(params) || ''));
  };
}
