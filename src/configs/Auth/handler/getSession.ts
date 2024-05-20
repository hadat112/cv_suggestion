import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { IAuthClient } from '../interfaces';
import handleRefreshToken from './refreshToken';

export default function handleGetSession(client: IAuthClient) {
  const errorMessage = { message: 'Invalid session', success: false };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies?.at;

    if (!token) {
      res.status(400).json(errorMessage);
      return;
    }

    const decoded: any = jwt.decode(token);
    const timenow = new Date().getTime();
    const expTime = new Date(decoded?.exp * 1000).getTime();

    if (!decoded || expTime < timenow) return handleRefreshToken(client)(req, res);

    res.status(200).json({
      data: {
        access_token: token,
      },
      success: true,
    });
  };
}
