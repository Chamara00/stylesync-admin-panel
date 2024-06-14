import React, { useState } from 'react';
import { CustomButton, CustomTextArea, DeleteDialogBox, UpdateDialogBox } from '../../components/components';
import { deleteIcon, editIcon, plusICon } from '../../assets/icons/icons';
import { SERVICE_DATA } from '../../const/DummyData';

const Services = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="text-[36px] text-font_secondary font-bold">Services</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="py-4 w-full flex-col justify-start items-center">
        <CustomButton width="200px" fontSize="16px" onClick={() => setIsFormVisible(true)}>
          <img src={plusICon} alt="Plus icon" width={20} height={20} className="pr-2" /> Add new service
        </CustomButton>
        {isFormVisible && (
          <>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea id="service_name" type="text" name="service_name" width="400px" text="Service name" />
              <CustomTextArea id="service_type" type="text" name="service_type" width="400px" text="Service type" />
            </div>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea id="price" type="number" name="price" width="400px" text="Price" />
              <CustomTextArea id="duration" type="text" name="duration" width="400px" text="Duration" />
            </div>
            <div className="py-2 text-gray-500 font-light text-[12px] flex justify-start items-center">
              Note: Salons can change the price and duration
            </div>
            <div className="flex justify-start items-center gap-2 py-2">
              <CustomButton
                width="150px"
                fontSize="16px"
                buttonColor="white"
                textColor="#2B2B2B"
                border="1px solid #844704"
                hoverColor="#C2C2C2"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton width="150px" fontSize="16px">
                Submit
              </CustomButton>
            </div>
          </>
        )}

        <div className="border-t border-[#C2C2C2]" style={{ marginTop: '20px' }} />
      </div>
      <div className="pb-10">
        <div className="text-[16px] text-font_secondary font-normal pb-4">List of all services available</div>
        <table className="w-[90%] text-sm text-left  text-font_secondary">
          <thead className="text-sm text-font_primary uppercase bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Servie name
              </th>
              <th scope="col" className="px-6 py-3">
                Service type
              </th>
              <th scope="col" className="px-6 py-3">
                Price (Rs.)
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICE_DATA.map((item) => (
              <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 ">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.duration}</td>
                <td className="px-6 py-4 text-right flex justify-start items-center gap-2">
                  <img src={editIcon} alt="edit icon" className="cursor-pointer" onClick={handleUpdateOpen} />
                  <img src={deleteIcon} alt="delete icon" onClick={handleDeleteOpen} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteDialogBox
        open={deleteOpen}
        handleClose={handleDeleteClose}
        title="Delete service"
        text="You can't undo after delete. Are you sure, you want delete ?"
        buttonText="Delete"
      />
      <UpdateDialogBox
        open={updateOpen}
        handleClose={handleUpdateClose}
        title="Update service"
        buttonText="Save"
        children={
          <>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea
                id="service_name"
                type="text"
                name="service_name"
                width="200px"
                text="Edit Service name"
              />
              <CustomTextArea
                id="service_type"
                type="text"
                name="service_type"
                width="200px"
                text="Edit Service type"
              />
            </div>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea id="price" type="number" name="price" width="200px" text="Edit Price" />
              <CustomTextArea id="duration" type="text" name="duration" width="200px" text="Edit Duration" />
            </div>
          </>
        }
      />
    </div>
  );
};

export default Services;
