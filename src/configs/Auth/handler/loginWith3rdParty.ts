import { NextApiRequest, NextApiResponse } from 'next';
import { toQueryParams } from '../utils/functions';
import { DefaultHandler } from '../interfaces';

export default function handleLoginByGoogle({ baseConfig }: DefaultHandler) {
  const { redirectUri } = baseConfig;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { type } = req.body;
    const authorizationParams: any = {};
    const { client_id, scope, include_granted_scopes, response_type } = authorizationParams;

    const params = {
      client_id,
      scope,
      include_granted_scopes,
      response_type,
      redirect_uri: redirectUri,
      state: type,
    };

    const authorizeUrl = toQueryParams(params);

    const baseURL = new URL(authorizeUrl, authorizationParams?.issuer).toString();

    res.status(200).json({
      data: {
        base_url: baseURL,
      },
      success: true,
    });
  };
}
