import { LogoutIcon } from '@/components/icons';
import { useAuthStore } from '@/stores/auth';
import { Avatar, Dropdown, MenuProps } from 'antd';
import cn from 'classnames';

export default function UserBtn({ collapsed }) {
  const { handleLogout } = useAuthStore();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Sign out',
      icon: <LogoutIcon className="text-[1rem] inline-flex" />,
    },
  ];

  return (
    <div className="bg-th-background-1">
      <Dropdown
        arrow={{ pointAtCenter: true }}
        trigger={['hover']}
        placement={collapsed ? 'topLeft' : 'topCenter'}
        menu={{
          items,
          className: 'custom-menu-dropdown',
          onClick: (menuItem) => {
            if (menuItem.key === 'logout') {
              handleLogout();
            }
          },
        }}
      >
        <div
          className={cn('flex flex-shrink-0 overflow-hidden items-center rounded-lg m-1 cursor-pointer', {
            'justify-center': collapsed,
            ' hover:bg-th-white border border-solid border-th-background-1 hover:border-th-border px-3 gap-x-3 py-2':
              !collapsed,
          })}
        >
          <Avatar
            src="/avt.png"
            alt="avt"
            size="large"
            className="min-w-[40px] border border-solid border-th-border"
          />
          {!collapsed && (
            <div className="flex flex-col justify-center">
              <p className="text-base font-semibold mb-0 whitespace-nowrap">Ha Van Dat</p>
              <p className="text-md mb-0 text-th-text-hint">datha</p>
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
}
