import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import LoginLayout from '@/layouts/login';
import LoginCard from '@/modules/public-modules/login';

const Login: NextPageWithLayout = () => {
  return <LoginLayout content={<LoginCard />} />;
};

Login.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Login;
