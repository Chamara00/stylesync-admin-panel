import React from 'react';
import { DASHBOARD_CARDS_DATA } from '../../const/Data';
import RegistrationChart from '../../components/Charts/RegistrationChart';
import { notificationIcon } from '../../assets/icons/icons';

const Dashboard = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="text-[36px] text-font_secondary font-bold">Dashboard</div>
      <div className="border-t border-[#C2C2C2]" />

      <div className="flex h-full">
        {/* Cards and charts */}
        <div className="w-[70%] h-full overflow-y-auto">
          <div className="flex justify-between items-center flex-wrap gap-4 px-6 py-4">
            {DASHBOARD_CARDS_DATA.map((item) => (
              <StatusCard key={item.id} title={item.title} count={item.count} />
            ))}
          </div>
          <div className="flex-col pb-24">
            <RegistrationChart data={salonData} title="Salon Registrations" />
            <RegistrationChart data={customerData} title="Customer Registrations" />
          </div>
        </div>

        {/* Notifications */}
        <div className="w-[30%] border-l border-[#C2C2C2] pl-4 h-full overflow-y-auto">
          <div className="text-[24px] text-font_secondary font-[500] py-4">Notifications</div>
          {/* Add notification items here */}
          <div>
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Jsut now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

type StatusCardProps = {
  title: string;
  count: number;
};

const StatusCard = ({ title, count }: StatusCardProps) => {
  return (
    <div className="border border-primary px-2 py-3 h-[80px] w-[215px] rounded-[12px]">
      <div className="text-[16px] font-medium text-font_secondary text-center">{title}</div>
      <div className="text-[24px] font-semibold text-secondary text-center">{count}</div>
    </div>
  );
};

type NotificationRowProps = {
  message: string;
  time: string;
};

const NotificationRow = ({ message, time }: NotificationRowProps) => {
  return (
    <div className="flex justify-start items-center py-2">
      <img src={notificationIcon} alt="Notification icon" className="pr-2" />
      <div className="flex-col justify-start items-start">
        <div className="text-[14px] font-light text-font_secondary">{message}</div>
        <div className=" text-[12px] font-extralight text-[#767676]">{time}</div>
      </div>
    </div>
  );
};

const salonData = [
  { name: 'Mon', count: 100 },
  { name: 'Tue', count: 250 },
  { name: 'Wed', count: 150 },
  { name: 'Thu', count: 300 },
  { name: 'Fri', count: 244 },
  { name: 'Sat', count: 57 },
  { name: 'Sun', count: 174 },
];

const customerData = [
  { name: 'Mon', count: 220 },
  { name: 'Tue', count: 300 },
  { name: 'Wed', count: 150 },
  { name: 'Thu', count: 278 },
  { name: 'Fri', count: 312 },
  { name: 'Sat', count: 57 },
  { name: 'Sun', count: 98 },
];
