import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import DefaultLayout from '@/layouts/default';
import Dashboard from '@/modules/dashboard';

const CvSuggestionPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

CvSuggestionPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout content={page} />;
};

export default CvSuggestionPage;
