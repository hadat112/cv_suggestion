import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import CvSuggestion from '@/modules/cv-suggestion';
import DefaultLayout from '@/layouts/default';

const CvSuggestionPage: NextPageWithLayout = () => {
  return <CvSuggestion />;
};

CvSuggestionPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout content={page} header={<></>} />;
};

export default CvSuggestionPage;
