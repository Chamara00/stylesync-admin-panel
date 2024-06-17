import { RxDashboard } from 'react-icons/rx';
import { FaScissors } from 'react-icons/fa6';
import { IoIosPerson, IoIosSettings } from 'react-icons/io';
import React from 'react';

export const SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <RxDashboard />,
  },
  {
    key: 'salons',
    label: 'Salons',
    path: '/admin/dashboard/salons',
    icon: <FaScissors />,
  },
  {
    key: 'customers',
    label: 'Customers',
    path: '/admin/dashboard/customers',
    icon: <IoIosPerson />,
  },
  {
    key: 'services',
    label: 'Services',
    path: '/admin/dashboard/services',
    icon: <IoIosSettings />,
  },
];

export const SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'settings',
    label: 'System Settings',
    path: '/admin/dashboard/settings',
    icon: <IoIosSettings />,
  },
  // {
  //   key: 'chat_support',
  //   label: 'Support and chat',
  //   path: '/admin/dashboard/chat_support',
  //   icon: <IoIosSettings />,
  // },
];
