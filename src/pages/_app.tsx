import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import Head from 'next/head';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/configs/theme/provider';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Talented</title>
      </Head>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
