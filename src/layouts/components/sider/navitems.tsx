import { DashboardIcon, SearchIcon } from '@/components/icons';

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
    key: '/dashboard',
  },
  {
    label: 'Suggestion',
    path: '/cv-suggestion',
    icon: <SearchIcon />,
    key: '/cv-suggestion',
  },
];
