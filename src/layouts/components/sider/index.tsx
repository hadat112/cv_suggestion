import { Layout } from 'antd';
import AppBranch from './AppBranch';
import DarkModeBtn from './DarkModeBtn';
import Navbar from './Navbar';
import Trigger from './Trigger';
import UserBtn from './UserBtn';
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
      collapsible={true}
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
