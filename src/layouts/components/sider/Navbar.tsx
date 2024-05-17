import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './navitems';

export default function Navbar({ onChangePage }) {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === current) return;
    onChangePage();
    router.push(e.key);
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(router.asPath);
  }, [router]);

  return (
    <Menu
      className="bg-th-background-1 text-label border-none custom-menu text-[16px] p-1 h-full"
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={NAV_ITEMS}
    />
  );
}
