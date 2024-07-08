import React, { useState } from 'react';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../../const/Navigations';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IconLogout } from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';

interface SidebarLinkProps {
  item: {
    key: string;
    label: string;
    path: string;
    icon: JSX.Element;
  };
  onClick?: () => void;
  isCollapsed: boolean;
}

const linkClasses = 'flex items-center gap-2 px-3 py-2 hover:no-underline active:text-white rounded-sm ';

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, onClick, isCollapsed }) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      to={item.path}
      onClick={handleClick}
      className={`text-md font-medium flex items-center gap-2 px-2 py-2 cursor-pointer ${
        isActive ? 'bg-primary rounded-full text-secondary' : 'text-white '
      }`}
    >
      <span className="text-lg mr-1">{item.icon}</span>
      {!isCollapsed && <span className="text-lg font-medium ">{item.label}</span>}
    </Link>
  );
};

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleFirstMenuItemClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AnimatePresence>
      <div className={`flex flex-col ${isCollapsed ? 'w-[66px]' : 'w-[180px]'} p-3 bg-[#2e2528] mx-3 my-5 rounded-3xl`}>
        <div className="flex-1">
          <div className="text-2xl font-bold text-center pt-3 text-white">{isCollapsed ? 'S' : 'StyleSync'}</div>
          <div className="flex-1 py-12 flex flex-col gap-4">
            {SIDEBAR_LINKS.map((item, index) => (
              <SidebarLink
                key={item.key}
                item={item}
                isCollapsed={isCollapsed}
                onClick={index === 0 ? handleFirstMenuItemClick : undefined}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-yellow-100">
          {SIDEBAR_BOTTOM_LINKS.map((item) => (
            <SidebarLink key={item.key} item={item} isCollapsed={isCollapsed} />
          ))}
          <div className={classNames('text-white cursor-pointer', linkClasses)}>
            <span className="text-lg mr-1">
              <IconLogout />
            </span>
            {!isCollapsed && <span className="text-lg font-medium ">Logout</span>}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AdminSidebar;
