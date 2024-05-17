import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_CONFIGS } from '../config';
import { AUTH_ROUTES } from '../service/routes';
import { toQueryParams } from '../utils/functions';

export default function handleLogin() {
  const { issuer, client_id, redirect_uri, authorizationParams } = BASE_CONFIGS;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const params = {
      ...authorizationParams,
      client_id,
      redirect_uri,
      state: JSON.stringify({ current: req.query?.current }),
    };

    const authorizeUrl = AUTH_ROUTES.AUTH + toQueryParams(params);
    const baseURL = issuer + authorizeUrl;

    res.redirect(baseURL);
  };
}
