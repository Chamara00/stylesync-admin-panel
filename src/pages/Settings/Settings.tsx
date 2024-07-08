import React from 'react';
import withLoader from '../../components/Animation/WithLoader';

const Settings = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="text-[36px] text-font_secondary font-bold">Settings</div>
      <div className="border-t border-[#C2C2C2]" />
    </div>
  );
};

export default withLoader(Settings);
