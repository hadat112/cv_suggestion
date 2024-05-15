import { Button, Result } from 'antd';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { useAuthStore } from '@/stores/auth';
import DefaultLayout from '@/layouts/default';

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại."
        extra={
          <Link href="/" legacyBehavior>
            <Button type="primary">Quay lại trang chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

const Page404: NextPageWithLayout = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <NotFound />;
  return <DefaultLayout content={<NotFound />} />;
};

Page404.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Page404;
