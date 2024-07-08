import {
  IconMenuDeep,
  IconLayoutDashboard,
  IconPerfume,
  IconAffiliate,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import React from 'react';

export const SIDEBAR_LINKS = [
  {
    key: 'menu',
    label: 'Menu',
    path: '/admin/dashboard/',
    icon: <IconMenuDeep />,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <IconLayoutDashboard />,
  },
  {
    key: 'salons',
    label: 'Salons',
    path: '/admin/dashboard/salons',
    icon: <IconPerfume />,
  },
  {
    key: 'customers',
    label: 'Customers',
    path: '/admin/dashboard/customers',
    icon: <IconUser />,
  },
  {
    key: 'services',
    label: 'Services',
    path: '/admin/dashboard/services',
    icon: <IconAffiliate />,
  },
];

export const SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'Settings',
    path: '/admin/dashboard/settings',
    icon: <IconSettings />,
  },
];
