import DefaultLayout from '@/layouts/default';
import CvSuggestion from '@/modules/cv-suggestion';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const CvSuggestionPage: NextPageWithLayout = () => {
  return <CvSuggestion />;
};

CvSuggestionPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout content={page} />;
};

export default CvSuggestionPage;
