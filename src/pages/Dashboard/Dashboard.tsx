import React, { useEffect, useState } from 'react';
import { getSalonCountThisMonth, getSalonCountToday, getTotalSalonCount } from '../../api/salonCountApi';
import { CircularProgress } from '@mui/material';
import { getCustomerCountThisMonth, getCustomerCountToday, getTotalCustomerCount } from '../../api/customerCountApi';
import SalonChart from '../../components/Charts/SalonChart';
import CustomerChart from '../../components/Charts/CustomerChart';

const Dashboard = () => {
  const [totalSalonCount, setTotalSalonCount] = useState(0);
  const [salonCountThisMonth, setSalonCountThisMonth] = useState(0);
  const [salonCountToday, setSalonCountToday] = useState(0);
  const [totalCustomerCount, setTotalCustomerCount] = useState(0);
  const [customerCountThisMonth, setCustomerCountThisMonth] = useState(0);
  const [customerCountToday, setCustomerCountToday] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalonCounts = async () => {
      setLoading(true);
      try {
        // salon counts
        const totalSalons = await getTotalSalonCount();
        const salonsThisMonth = await getSalonCountThisMonth();
        const salonsToday = await getSalonCountToday();

        // customer counts
        const totalCustomers = await getTotalCustomerCount();
        const customersThisMonth = await getCustomerCountThisMonth();
        const customersToday = await getCustomerCountToday();

        setTotalSalonCount(totalSalons);
        setSalonCountThisMonth(salonsThisMonth);
        setSalonCountToday(salonsToday);
        setTotalCustomerCount(totalCustomers);
        setCustomerCountThisMonth(customersThisMonth);
        setCustomerCountToday(customersToday);
      } catch (error) {
        console.error('Error fetching salon counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  const SALON_DATA = [
    {
      id: 'total_salons',
      title: 'Total Salons',
      count: totalSalonCount,
    },
    {
      id: 'month_salons',
      title: 'Total salons registered this month',
      count: salonCountThisMonth,
    },
    {
      id: 'today_salons',
      title: 'Total salons registered today',
      count: salonCountToday,
    },
  ];

  const CUSTOMER_DATA = [
    {
      id: 'total_customers',
      title: 'Total Customers',
      count: totalCustomerCount,
    },
    {
      id: 'month_customers',
      title: 'Total customers registered this month',
      count: customerCountThisMonth,
    },
    {
      id: 'today_customers',
      title: 'Total customers registered today',
      count: customerCountToday,
    },
  ];

  return (
    <div className="w-full h-screen overflow-auto px-10 py-6">
      <div className="text-[36px] text-font_secondary font-bold font-League uppercase">Dashboard</div>
      <div className="border-t border-[#C2C2C2]" />

      {/* Cards and charts */}
      <div className="flex flex-row justify-start items-center">
        <div className="flex justify-between items-start flex-col gap-4 px-6 py-4">
          {SALON_DATA.map((item) => (
            <StatusCard key={item.id} title={item.title} count={item.count} />
          ))}
        </div>
        <SalonChart />
      </div>

      <div className="border-t border-[#C2C2C2]" />

      <div className="flex flex-row justify-start items-center">
        <div className="flex justify-between items-start flex-col gap-4 px-6 py-4">
          {CUSTOMER_DATA.map((item) => (
            <StatusCard key={item.id} title={item.title} count={item.count} />
          ))}
        </div>
        <CustomerChart />
      </div>
    </div>
  );
};

export default Dashboard;

type StatusCardProps = {
  title: string;
  count: number | null;
};

const StatusCard = ({ title, count }: StatusCardProps) => {
  return (
    <div className="border border-primary px-2 py-4  w-[300px] rounded-[12px]">
      <div className="text-[20px] font-medium text-font_secondary text-center">{title}</div>
      <div className="text-[32px] font-semibold text-secondary text-center">{count}</div>
    </div>
  );
};
