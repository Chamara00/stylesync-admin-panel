import React from 'react';
import { DASHBOARD_CARDS_DATA } from '../../const/Data';

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="text-[36px] text-font_secondary font-bold">Dashboard</div>
      <div className="border-t border-[#C2C2C2]" />

      <div className="flex">
        {/* Cards and charts */}
        <div className="w-[70%]">
          <div className="flex justify-between items-center flex-wrap gap-4 px-6 py-4">
            {DASHBOARD_CARDS_DATA.map((item) => (
              <StatusCard key={item.id} title={item.title} count={item.count} />
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="w-[30%] border-l border-[#C2C2C2] pl-4 min-h-screen">
          <div className="text-24px text-font_secondary font-[500] py-4">Notifications</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

type Props = {
  title: string;
  count: number;
};

const StatusCard = ({ title, count }: Props) => {
  return (
    <div className="border border-primary px-2 py-3 h-[80px] w-[215px] rounded-[12px]">
      <div className="text-[16px] font-medium text-font_secondary text-center">{title}</div>
      <div className="text-[24px] font-semibold text-secondary text-center">{count}</div>
    </div>
  );
};
