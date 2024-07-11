import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextArea, TitleText } from '../../components/components';
//import withLoader from '../../components/Animation/WithLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { getSalonById, Salon, SalonStaff, deleteSalon } from '../../api/salonApi';
import { CircularProgress } from '@mui/material';
import { FaStar } from 'react-icons/fa6';

const ViewSalon = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSalon = async () => {
      try {
        if (id) {
          setLoading(true);
          const salonData = await getSalonById(Number(id));
          setSalon(salonData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getSalon();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteSalon(Number(id));
        alert('Salon deleted successfully');
        navigate('/admin/dashboard/salons');
      }
    } catch (err) {
      setDeleteError((err as Error).message);
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
    <div className="w-full h-screen overflow-auto px-10 py-6">
      <div className="text-[36px] text-font_secondary font-bold">Salon profile</div>
      <div className="border-t border-[#C2C2C2] mb-6" />

      <div className="flex justify-between items-center">
        <TitleText text="Salon details" />
        <CustomButton width="200px" fontSize="16px" onClick={handleDelete}>
          Delete {salon?.name}
        </CustomButton>
      </div>

      {deleteError && <div className="text-red-500">{deleteError}</div>}

      <div className="w-[150px] rounded-md">
        <img
          src={salon?.image ? salon.image : 'https://via.placeholder.com/150'}
          alt=""
          className="w-full rounded-md"
        />
      </div>

      <div className="flex justify-start items-center gap-4 py-2">
        <CustomTextArea id="id" name="id" width="100px" text="Salon ID" disabled={true} value={salon?.id} />
        <CustomTextArea id="name" name="name" width="300px" text="Salon name" disabled={true} value={salon?.name} />
        <CustomTextArea id="email" name="email" width="300px" text="Email" disabled={true} value={salon?.email} />
        <CustomTextArea
          id="gender"
          name="gender"
          width="200px"
          text="Contact No"
          disabled={true}
          value={salon?.contactNo}
        />
      </div>
      <div className="text-[18px] font-medium text-font_secondary pt-2">Address</div>
      <div className="flex justify-start items-center gap-4 pb-2">
        <CustomTextArea id="line1" name="line1" width="200px" text="Line 1" disabled={true} value={salon?.line1} />
        <CustomTextArea id="line2" name="line2" width="200px" text="Line 2" disabled={true} value={salon?.line2} />
        <CustomTextArea id="city" name="city" width="200px" text="City" disabled={true} value={salon?.city} />
        <CustomTextArea
          id="country"
          name="country"
          width="200px"
          text="Country"
          disabled={true}
          value={salon?.country}
        />
      </div>
      <div className="border-t border-[#C2C2C2] my-6" />

      {/* Salon Staff Details */}
      <TitleText text="Salon staff details" />
      <div className="flex flex-col gap-4 py-2">
        {salon?.salonStaff.map((salonStaff: SalonStaff) => (
          <div
            key={salonStaff.staff.id}
            className="border rounded-lg p-4 flex flex-row justify-between items-center w-[60%]"
          >
            <div>{salonStaff.staff.id}</div>
            <div className="font-bold">{salonStaff.staff.name}</div>
            <div>{salonStaff.staff.gender}</div>
            <div className="w-[100px] rounded-md">
              <img
                src={salonStaff.staff.image ? salonStaff.staff.image : 'https://via.placeholder.com/150'}
                alt=""
                className="w-full rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#C2C2C2] my-6" />

      {/* Customer reviews */}
      <TitleText text="Customer reviews" />
      {salon?.review?.length ? (
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
            {salon?.review.map((item, index) => (
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
      <div className="border-t border-[#C2C2C2] my-6" />
    </div>
  );
};

export default ViewSalon;
