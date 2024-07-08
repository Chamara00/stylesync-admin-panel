import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextArea, TitleText } from '../../components/components';
import { FaStar } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerById, deleteCustomerById, Customer } from '../../api/CustomerApi';
import { CircularProgress } from '@mui/material';

const ViewCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        if (id) {
          setLoading(true);
          const customerData = await getCustomerById(Number(id));
          setCustomer(customerData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getCustomer();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCustomerById(Number(id));
      navigate('/admin/dashboard/customers');
    } catch (err) {
      setError(err as Error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="text-[36px] text-font_secondary font-bold">Customer profile</div>
      <div className="border-t border-[#C2C2C2] mb-6" />
      <div className="flex justify-between items-center">
        <TitleText text="Customer details" />
        <CustomButton width="150px" fontSize="16px" onClick={handleDelete}>
          Delete profile
        </CustomButton>
      </div>
      <div className="flex justify-start items-center gap-4 py-2">
        <CustomTextArea
          id="name"
          name="name"
          width="300px"
          text="Customer name"
          disabled={true}
          value={customer?.name || ''}
        />
        <CustomTextArea
          id="email"
          name="email"
          width="300px"
          text="Email"
          disabled={true}
          value={customer?.email || ''}
        />
        <CustomTextArea
          id="gender"
          name="gender"
          width="150px"
          text="Gender"
          disabled={true}
          value={customer?.gender || 'Female'}
        />
      </div>
      <div className="border-t border-[#C2C2C2] my-6" />
      <TitleText text="Customer appointments" />
      {customer?.customerAppointmentBlock?.length ? (
        <table className="w-[80%] text-sm text-left text-font_secondary mt-4">
          <thead className="text-sm text-font_primary uppercase bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Start time
              </th>
              <th scope="col" className="px-6 py-3">
                Staff Id
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {customer.customerAppointmentBlock.map((item, index) => (
              <tr key={`${item.customerId}-${index}`} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.formattedDate}</td>
                <td className="px-6 py-4">{item.startTime}</td>
                <td className="px-6 py-4">{item.staffId}</td>
                <td className="px-6 py-4">{item.isCancel ? 'Cancelled' : 'Scheduled'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-font_secondary">No records</div>
      )}
      <div className="border-t border-[#C2C2C2] my-6" />
      <TitleText text="Customer reviews" />
      {customer?.review?.length ? (
        <table className="w-[80%] text-sm text-left text-font_secondary mt-4">
          <thead className="text-sm text-font_secondary uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Salon name
              </th>
              <th scope="col" className="px-6 py-3">
                Review
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {customer.review.map((item, index) => (
              <tr key={`${item.salonId}-${index}`} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.salonId}</td>
                <td className="px-6 py-4 flex gap-1 items-center">
                  {item.value} <FaStar color="#FFD700" scale={1.2} />
                </td>
                <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-font_secondary">No records</div>
      )}
    </div>
  );
};

export default ViewCustomer;
