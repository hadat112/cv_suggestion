import { APIResponse } from '@/interfaces';
import { getUserInfo } from '@/services';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { IUserInfo } from '../interfaces';
import { ErrorFallback } from './components/ErrorFallback';

interface Props {
  children: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, handleGetSession, setUserInfo } = useAuthStore();
  const { error, error_description } = router.query;
  const pathname = router.pathname;

  const { data: userInfo } = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/callback') handleGetSession(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated) setUserInfo(userInfo);
  }, [isAuthenticated, userInfo]);

  if (!isAuthenticated && pathname !== '/callback')
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );

  if (error) return <ErrorFallback error={error} error_description={error_description} />;

  return <>{children}</>;
};

export default UserProvider;
