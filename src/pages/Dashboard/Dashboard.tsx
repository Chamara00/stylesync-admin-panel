import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationChart from '../../components/Charts/RegistrationChart';
//import { notificationIcon } from '../../assets/icons/icons';
import withLoader from '../../components/Animation/WithLoader';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSalons: 1,
    totalCustomers: 0,
    totalServices: 27,
    totalActiveCustomers: 100,
    totalActiveSalons: 100,
    totalAppointments: 100,
  });

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/customer/get-customer-count');
        setDashboardData((prevData) => ({
          ...prevData,
          totalCustomers: response.data.count,
        }));
      } catch (error) {
        console.error('Error fetching customer count:', error);
      }
    };

    fetchCustomerCount();
  }, []);

  const DASHBOARD_CARDS_DATA = [
    {
      id: 'total_Salons',
      title: 'Total Salons',
      count: dashboardData.totalSalons,
    },
    {
      id: 'total_customers',
      title: 'Total Customers',
      count: dashboardData.totalCustomers,
    },
    {
      id: 'total_services',
      title: 'Total Services',
      count: dashboardData.totalServices,
    },
    {
      id: 'total_active_customers',
      title: 'Total Active Customers',
      count: dashboardData.totalActiveCustomers,
    },
    {
      id: 'total_active_salons',
      title: 'Total Active Salons',
      count: dashboardData.totalActiveSalons,
    },
    {
      id: 'total_appointments',
      title: 'Total Appointments',
      count: dashboardData.totalAppointments,
    },
  ];
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="text-[36px] text-font_secondary font-bold font-League uppercase">Dashboard</div>
      <div className="border-t border-[#C2C2C2]" />

      <div className="flex h-full">
        {/* Cards and charts */}
        <div className="w-full h-full overflow-y-auto">
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
        {/* <div className="w-[30%] border-l border-[#C2C2C2] pl-4 h-full overflow-y-auto">
          <div className="text-[24px] text-font_secondary font-[500] py-4">Notifications</div>
          
          <div>
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
            <NotificationRow message="You have a bug that needs to be fixed" time="Just now" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default withLoader(Dashboard);

type StatusCardProps = {
  title: string;
  count: number | null;
};

const StatusCard = ({ title, count }: StatusCardProps) => {
  return (
    <div className="border border-primary px-2 py-3 h-[80px] w-[215px] rounded-[12px]">
      <div className="text-[16px] font-medium text-font_secondary text-center">{title}</div>
      <div className="text-[24px] font-semibold text-secondary text-center">{count}</div>
    </div>
  );
};

// type NotificationRowProps = {
//   message: string;
//   time: string;
// };

// const NotificationRow = ({ message, time }: NotificationRowProps) => {
//   return (
//     <div className="flex justify-start items-center py-2">
//       <img src={notificationIcon} alt="Notification icon" className="pr-2" />
//       <div className="flex-col justify-start items-start">
//         <div className="text-[14px] font-light text-font_secondary">{message}</div>
//         <div className=" text-[12px] font-extralight text-[#767676]">{time}</div>
//       </div>
//     </div>
//   );
// };

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
