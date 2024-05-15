import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import LoginLayout from '@/layouts/login';
import RegisterCard from '@/modules/public-modules/register';

const Login: NextPageWithLayout = () => {
  return <LoginLayout content={<RegisterCard />} />;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Login;
