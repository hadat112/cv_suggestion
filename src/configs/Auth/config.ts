export const BASE_CONFIGS = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
  issuer: process.env.NEXT_PUBLIC_OIDC_ISSUER,
  redirect_uri: process.env.OIDC_REDIRECT_URI,
  client_id: process.env.OIDC_CLIENT_ID,
  client_secret: process.env.OIDC_CLIENT_SECRET,
  redirectUriLogout: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,
  authorizationParams: {
    response_type: 'code',
    response_mode: 'query',
    scope: 'openid offline_access',
  },
  cookieOptions: {
    secure: true,
    sameSite: 'strict',
    path: '/',
    httpOnly: true,
  },
};
