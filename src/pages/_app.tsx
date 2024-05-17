import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { AppProvider } from '@/providers/AppProvider';
import Head from 'next/head';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Talented</title>
      </Head>
      <AppProvider>
        <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
      </AppProvider>
    </>
  );
}
