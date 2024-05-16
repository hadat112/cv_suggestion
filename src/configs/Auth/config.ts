export const getConfig = () => {
  const baseConfig = {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
    issuer: process.env.NEXT_PUBLIC_BE,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    cookieOptions: {
      secure: true,
      sameSite: 'strict',
      path: '/',
      httpOnly: true,
    },
  };
  return baseConfig;
};
