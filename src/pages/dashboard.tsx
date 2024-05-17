import DefaultLayout from '@/layouts/default';
import Dashboard from '@/modules/dashboard';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const CvSuggestionPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

CvSuggestionPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout content={page} />;
};

export default CvSuggestionPage;
