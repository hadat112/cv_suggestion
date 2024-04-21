import ScrollTopButton from '@/components/common/ScrollTopButton';
import { ReactNode, useEffect, useRef } from 'react';
import Header from './components/Header';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface IProps {
  header?: ReactNode;
  content: ReactNode;
  isShowingChat?: boolean;
}

export default function DefaultLayout({ header, content, isShowingChat }: IProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleGotoTop = () => {
    scrollContainer.current?.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden h-screen">
        <div ref={scrollContainer} className="overflow-hidden flex flex-col flex-1">
          {header ?? <Header />}
          <div className="flex flex-1 overflow-hidden">{content}</div>
        </div>
      </div>
      <div className="block relative w-full h-0">
        <ScrollTopButton ref={scrollContainer} onGotoTop={handleGotoTop} />
      </div>
    </>
  );
}
