import LoginLayout from '@/layouts/login';
import ForgotPassword from '@/modules/public-modules/forgotten-password';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const ForgotPasswordPage: NextPageWithLayout = () => {
  return <LoginLayout content={<ForgotPassword />} />;
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default ForgotPasswordPage;
