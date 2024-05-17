import { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => Promise<unknown>;

type ApiHandlerProps = {
  [key: string]: NextApiHandler;
};

type ApiEntryNames = 'login' | 'logout' | 'refresh_token' | 'session' | 'callback';

type ApiHandlers = Partial<Record<ApiEntryNames, NextApiHandler>>;

const onError = (_req, res, error) => {
  res.status(error.status || 500).end();
};

// Entry handler for all auth routes default path to /api/auth/[...auth]
export default function handlerBuilder({
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleGetSession,
  handleCallback,
}: ApiHandlerProps) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const customHandler: ApiHandlers = {
      login: handleLogin,
      logout: handleLogout,
      refresh_token: handleRefreshToken,
      session: handleGetSession,
      callback: handleCallback,
    };

    let { auth: route } = req.query;
    if (Array.isArray(route)) {
      let otherRoutes;
      [route, ...otherRoutes] = route;
      if (otherRoutes.length) {
        res.status(404).end();
        return;
      }
    }

    const handler = route && Object.hasOwn(customHandler, route) && customHandler[route];

    try {
      if (!handler) return res.status(404).end();
      await handler(req, res);
    } catch (e) {
      onError(req, res, e);
    }
  };
}
