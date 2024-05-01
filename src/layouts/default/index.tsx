import { ReactElement, ReactNode } from 'react';
import Header from './components/Header';

interface IProps {
  header?: ReactNode;
  content: ReactElement;
}

export default function DefaultLayout({ header, content }: IProps) {
  return (
    <>
      <div className="flex flex-col overflow-hidden h-screen">
        <div className="overflow-hidden flex flex-col flex-1">
          {header ?? <Header />}
          <div className="flex flex-1 overflow-hidden">{content}</div>
        </div>
      </div>
    </>
  );
}
