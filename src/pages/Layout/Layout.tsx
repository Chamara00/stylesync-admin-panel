import React from 'react';
import AdminSidebar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex felx-row bg-white h-screen w-screen overflow-hidden font-Roboto">
      <AdminSidebar />
      <div className="flex-1">
        {/* <AdminHeader /> */}
        <div className="my-4">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Layout;
