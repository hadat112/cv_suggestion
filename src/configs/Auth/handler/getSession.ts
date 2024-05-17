import { NextApiRequest, NextApiResponse } from 'next';
import { IAuthClient } from '../interfaces';
import handleRefreshToken from './refreshToken';

export default function handleGetSession(client: IAuthClient) {
  const errorMessage = { message: 'Invalid session', success: false };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const accessToken = req.cookies?.at;

    if (!accessToken) {
      res.status(400).json(errorMessage);
      return;
    }

    // const params = {
    //   token: accessToken,
    //   tokenType: "access_token" as const,
    // };

    // // Check if access token is valid
    // const atCheckRes = await client.introspectToken(params);
    // console.log(atCheckRes);

    // handleRefreshToken(client)(req, res);
    res.status(200).json({
      data: {
        access_token: accessToken,
      },
      success: true,
    });
  };
}
