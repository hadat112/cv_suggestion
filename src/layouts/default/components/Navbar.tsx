import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowDownIcon } from '@/components/icons';

export const navitems = [
  {
    label: 'Tổng quan',
    key: '/overall',
  },
];

export default function Navbar() {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === current) return;
    router.push(e.key);
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router.pathname]);

  return (
    <Menu
      className="border-none custom-menu text-[16px] h-full bg-th-background"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={navitems}
      expandIcon={<ArrowDownIcon />}
    />
  );
}
