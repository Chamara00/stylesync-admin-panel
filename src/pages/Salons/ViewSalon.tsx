import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextArea, TitleText } from '../../components/components';
//import withLoader from '../../components/Animation/WithLoader';
import { useParams } from 'react-router-dom';
import { getSalonById, Salon } from '../../api/salonApi';
import { CircularProgress } from '@mui/material';

const ViewSalon = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
      <div className="text-[36px] text-font_secondary font-bold">Salon profile</div>
      <div className="border-t border-[#C2C2C2] mb-6" />
      <div className="flex justify-between items-center">
        <TitleText text="Salon details" />
        <CustomButton width="150px" fontSize="16px">
          Delete profile
        </CustomButton>
      </div>
      <div className="flex justify-start items-center gap-4 py-2">
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
    </div>
  );
};

export default ViewSalon;
