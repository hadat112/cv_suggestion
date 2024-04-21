import { Result, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Author = ({ renderContent }) => {
  const [isAllowed, setIsAllowed] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    setIsAllowed(true);
  }, [router]);

  if (typeof isAllowed === 'undefined')
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );

  return !isAllowed ? (
    <div className="flex-1 flex items-center justify-center">
      <Result status="403" title="403" subTitle="Xin lỗi, bạn không có quyền truy cập trang web này." />
    </div>
  ) : (
    renderContent
  );
};

export default Author;
