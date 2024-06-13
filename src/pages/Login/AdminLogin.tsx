import React from 'react';
import { CustomTextField, CustomButton } from '../../components/components';
import { loginAnimation } from '../../assets/icons/icons';
// import mainTheme from '../../theme/theme';
// import { CustomTextField } from '../../components/components';

const AdminLogin = () => {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex justify-center items-center h-screen w-1/2 left-0 pl-10">
        <img src={loginAnimation} alt="Login page" className="w-3/4 h-3/4" />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-4xl font-[400] mb-6">StyleSync Admin</h1>
        <h1 className="text-2xl font-semibold mb-4 text-secondary">Login</h1>

        <div className="mb-4">
          <p className="block text-font_secondary mb-2">Email</p>
          <CustomTextField id="email" name="Email" type="text" />
        </div>
        <div className="mb-6">
          <p className="block text-font_secondary mb-2">Password</p>
          <CustomTextField id="password" name="Password" type="password" />
        </div>

        <CustomButton type="submit" children="Login" fontSize="16px" bold="600" textColor="white" />
      </div>
    </div>
  );
};

export default AdminLogin;
