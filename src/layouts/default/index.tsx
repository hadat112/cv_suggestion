import Author from '@/components/auth/Author';
import { MenuIcon } from '@/components/icons';
import { useDevice } from '@/providers/DeviceProvider';
import { Layout } from 'antd';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import ScrollTopButton from '../components/ScrollToTop';
import SiderBar from '../components/sider';
const { Content } = Layout;
interface IProps {
  content: ReactElement;
}

export const MobileHeader = ({ setCollapsed, collapsed }) => {
  return (
    <div className="flex items-center relative justify-center w-full border-0 border-b border-solid border-th-border bg-th-background ">
      <span
        className="absolute left-4 flex items-center cursor-pointer z-10 menu-btn"
        onClick={() => setCollapsed((state) => !state)}
      >
        <MenuIcon />
      </span>
      <div
        className={`flex items-center justify-center overflow-hidden gap-2 p-3 cursor-pointer text-sm h-[60px] 
        transition-opacity duration-200 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-lg flex items-center ">LOGO</span>
      </div>
    </div>
  );
};

export default function DefaultLayout({ content }: IProps) {
  const { deviceType } = useDevice();
  const isMobile = deviceType === 'mobile';
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleGotoTop = () => {
    scrollContainer.current?.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  };

  const handleCollapsed = () => {
    if (!collapsed) setCollapsed(true);
  };

  useEffect(() => {
    if (isMobile) return;
    const savedCollapsed = JSON.parse(localStorage.getItem('sider-collapsed'));
    setCollapsed(savedCollapsed);
  }, [isMobile]);

  return (
    <Layout className="flex flex-row h-screen overflow-hidden relative">
      <div
        className={`h-screen overflow-hidden flex ${isMobile && 'absolute'}`}
        style={isMobile ? { zIndex: 11 } : {}}
      >
        <SiderBar collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
      </div>
      {!collapsed && isMobile && (
        <div
          className="absolute h-screen w-screen left-0 top-0 bg-th-black opacity-50 z-10 opacity-layer"
          onClick={handleCollapsed}
        />
      )}
      <div className="flex flex-col flex-1 bg-th-background w-full overflow-hidden">
        {isMobile ? <MobileHeader collapsed={collapsed} setCollapsed={setCollapsed} /> : null}
        <Content
          ref={scrollContainer}
          className="overflow-x-hidden overflow-y-auto flex flex-col flex-1 relative"
        >
          <Author renderContent={content} />
        </Content>
        <div className="block relative w-full h-0">
          <ScrollTopButton ref={scrollContainer} onGotoTop={handleGotoTop} />
        </div>
      </div>
    </Layout>
  );
}
