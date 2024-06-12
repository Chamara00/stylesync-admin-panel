import React from 'react';
import { SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../../const/Navigations';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IoIosLogOut } from 'react-icons/io';

interface SidebarLinkProps {
  item: {
    key: string;
    label: string;
    path: string;
    icon: JSX.Element;
  };
}

const linkClasses =
  'flex items-center gap-2 px-3 py-2 hover:text-white hover:no-underline active:text-white rounded-sm text-base';

const SidebarLink: React.FC<SidebarLinkProps> = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? 'text-[#D0D0D0] bg-secondary border-none rounded-[8px]' : 'text-font_secondary',
        linkClasses,
      )}
    >
      <span className="text-lg mr-1">{item.icon}</span>
      <span className="text-lg font-medium ">{item.label}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  return (
    <div className="flex flex-col w-60 p-3 bg-primary">
      <div className="flex-1">
        <div className="text-[40px] font-[400] text-center pt-3 text-secondary">StyleSync</div>
        <div className="flex-1 py-12 flex flex-col gap-0.5">
          {SIDEBAR_LINKS.map((item) => (
            <SidebarLink key={item.key} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-yellow-100">
        {SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames('text-red-700 cursor-pointer', linkClasses)}>
          <span className="text-lg mr-1">
            <IoIosLogOut />
          </span>
          <span className="text-lg font-medium ">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
