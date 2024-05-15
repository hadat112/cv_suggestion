import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Spin />
    </div>
  );
};

export default Home;
