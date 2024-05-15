import React from 'react';
import LoginHeader from './components/LoginHeader';
import Image from 'next/image';
import LoginBackground from '../../../public/login-bg.png';

const LoginLayout = ({ content }) => {
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <div className="overflow-x-hidden overflow-y-auto flex flex-col flex-1">
        <LoginHeader />
        <div className="flex flex-col flex-1 relative">
          <Image className="z-1 bg-opacity " src={LoginBackground} placeholder="blur" alt="img" fill />
          <div
            className="login z-10 absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center
          rounded-xl bg-th-background h-fit my-auto p-8 mx-auto max-w-[90vw]
          md:max-w-100 xl:w-[568px] text-sm lg:text-base sm:w-[448px] max-h-[84vh]"
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
