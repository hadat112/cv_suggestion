import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../interfaces';
import handleRefreshToken from './refreshToken';

export default function handleGetSession({ getClient, baseConfig }: DefaultHandler) {
  const errorMessage = { message: 'Invalid session', success: false };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const accessToken = req.cookies?.at;

    if (!accessToken) {
      res.status(400).json(errorMessage);
      return;
    }

    // const decoded: any = jwt.decode(accessToken);
    // const timenow = new Date().getTime();
    // const expTime = new Date(decoded?.exp * 1000).getTime();

    // // Check if access token is valid
    // if (!decoded || expTime < timenow) {
    //   return handleRefreshToken({ getClient, baseConfig })(req, res);
    // }

    res.status(200).json({
      data: {
        access_token: accessToken,
      },
      success: true,
    });
  };
}
