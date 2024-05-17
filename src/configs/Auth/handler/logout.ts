import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../interfaces';
import { getCookie } from '../utils/functions';

export default function handleLogout({ baseConfig, getClient }: DefaultHandler) {
  const { cookieOptions } = baseConfig;
  const client = getClient();

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const rt = req.cookies?.rt;
    const at = req.cookies?.at;
    // Revoke tokens before logout
    const revokeQueue = [client.revokeToken({ token: at })];

    if (rt) revokeQueue.push(client.revokeToken({ token: rt }));
    Promise.all(revokeQueue);

    const rtCookie = getCookie('rt', cookieOptions);
    const atCookie = getCookie('at', cookieOptions);
    res.setHeader('set-cookie', [rtCookie, atCookie]);

    res.redirect('/login');
  };
}
