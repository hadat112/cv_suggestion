import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import classNames from 'classnames';

const Home = () => {
  const [primaryOverlay, setPrimaryOverlay] = useState(false);
  const [whiteOverlay, setWhiteOverlay] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setPrimaryOverlay(true);
    setTimeout(() => {
      router.push('/pos');
    }, 500);
  };

  const handleButtonClick1 = () => {
    setWhiteOverlay(true);
    setTimeout(() => {
      router.push('/warehouse');
    }, 500);
  };

  return (
    <div className="flex w-screen  h-screen items-center justify-center">
      <div className="flex-1 flex items-center justify-center bg-white h-full relative">
        {!whiteOverlay && (
          <Button
            onClick={handleButtonClick}
            type="primary"
            className={classNames('w-[200px] h-[200px] rounded-xl z-10 absolute transition duration-500', {
              '!bg-white !text-th-primary hover:!bg-white right-0 translate-x-1/2': primaryOverlay,
              'hover:bg-th-primary hover:!text-white': !primaryOverlay,
            })}
          >
            POS Screen
          </Button>
        )}
        <div
          className={`absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out pointer-events-none z-0 ${
            primaryOverlay ? 'bg-th-primary' : ''
          }`}
          id="overlay"
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-th-primary h-full relative">
        {!primaryOverlay && (
          <Button
            id="management-screen"
            className={classNames('w-[200px] h-[200px] rounded-xl z-10 absolute transition duration-500', {
              '!bg-white !text-th-primary hover:!bg-white': !whiteOverlay,
              'hover:bg-th-primary hover:!text-white left-0 -translate-x-1/2': whiteOverlay,
            })}
            type={whiteOverlay ? 'primary' : 'default'}
            onClick={handleButtonClick1}
          >
            Management Screen
          </Button>
        )}
        <div
          className={`absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out pointer-events-none z-0 ${
            whiteOverlay ? 'bg-white' : ''
          }`}
          id="overlay"
        ></div>
      </div>
    </div>
  );
};

export default Home;
