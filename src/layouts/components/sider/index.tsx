import { Layout } from 'antd';
import Navbar from './Navbar';
import Trigger from './Trigger';
import AppBranch from './AppBranch';
import UserBtn from './UserBtn';
import DarkModeBtn from './DarkModeBtn';
const { Sider } = Layout;

export default function SiderBar({ setCollapsed, collapsed, isMobile }) {
  const onSetCollapsed = (collapsed) => {
    setCollapsed(collapsed);
    localStorage.setItem('sider-collapsed', JSON.stringify(collapsed));
  };

  const onChangePage = () => {
    if (isMobile) setCollapsed(true);
  };

  return (
    <Sider
      trigger={<Trigger collapsed={collapsed} setCollapsed={onSetCollapsed} />}
      className="overflow-hidden"
      width={280}
      collapsedWidth={isMobile ? 0 : 64}
      defaultCollapsed={false}
      collapsible
      collapsed={collapsed}
    >
      <AppBranch
        onChangePage={onChangePage}
        collapsed={collapsed}
        textSize={collapsed ? 'text-md' : 'text-lg justify-center'}
      />
      <Navbar onChangePage={onChangePage} />
      <UserBtn collapsed={collapsed} />
      <DarkModeBtn collapsed={collapsed} />
    </Sider>
  );
}
