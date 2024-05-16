import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ErrorFallback } from './components/ErrorFallback';
import { Spin } from 'antd';
import { useAuthStore } from '@/stores/auth';
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from '@/constants/common';

interface Props {
  children: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, handleGetSession } = useAuthStore();
  const { error, error_description } = router.query;
  const pathname = router.pathname;

  useEffect(() => {
    if (PUBLIC_ROUTER.includes(pathname) && isAuthenticated) {
      router.push('/');
      return;
    }
    if (!isAuthenticated) handleGetSession(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (PRIVATE_ROUTER.includes(pathname) && !isAuthenticated)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );

  if (error) return <ErrorFallback error={error} error_description={error_description} />;

  return <>{children}</>;
};

export default UserProvider;
