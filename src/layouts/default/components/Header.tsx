import React from 'react';
import RightHeader from './RightHeader';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 h-[64x] w-full border-0 border-b border-solid border-th-divider-1 bg-th-background">
      <div className="text-[2rem] font-semibold mr-5 inline-flex items-center gap-4">
        <div className="bg-th-primary rounded-full size-10"></div>
        Logo
      </div>
      <div className="block items-center w-full max-w-[80%] h-[64px] overflow-hidden">
        <Navbar />
      </div>
      <RightHeader />
    </div>
  );
};

export default Header;
