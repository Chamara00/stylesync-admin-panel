import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextArea, DeleteDialogBox, UpdateDialogBox } from '../../components/components';
import { deleteIcon, editIcon, plusICon } from '../../assets/icons/icons';
import { createService, getAllServices, deleteService, getServiceById } from '../../api/serviceApi';
import { Service, NewService } from '../../api/serviceApi';
import { CircularProgress } from '@mui/material';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [formData, setFormData] = useState<NewService>({
    name: '',
    serviceType: '',
    price: 0,
    duration: '',
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getAllServices();
      setServices(servicesData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const newService = await createService(formData);
      setServices([...services, newService]);
      setIsFormVisible(false);
      setFormData({ name: '', serviceType: '', price: 0, duration: '' });
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedServiceId !== null) {
      try {
        await deleteService(selectedServiceId);
        setServices(services.filter((service) => service.id !== selectedServiceId));
        setDeleteOpen(false);
        setSelectedServiceId(null);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  // const handleUpdate = async () => {
  //   if (selectedServiceId !== null) {
  //     try {
  //       const updatedService = await updateService(selectedServiceId, { id: selectedServiceId, ...formData });
  //       setServices(services.map(service => (service.id === selectedServiceId ? updatedService : service)));
  //       setUpdateOpen(false);
  //       setSelectedServiceId(null);
  //       setFormData({ name: '', serviceType: '', price: 0, duration: '' });
  //     } catch (error) {
  //       console.error('Error updating service:', error);
  //     }
  //   }
  // };

  const handleDeleteOpen = (id: number) => {
    setSelectedServiceId(id);
    setDeleteOpen(true);
  };

  const handleUpdateOpen = async (id: number) => {
    setSelectedServiceId(id);
    try {
      const serviceData = await getServiceById(id);
      setFormData(serviceData);
      setUpdateOpen(true);
    } catch (error) {
      console.error('Error fetching service by ID:', error);
    }
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setSelectedServiceId(null);
    setFormData({ name: '', serviceType: '', price: 0, duration: '' });
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
      <div className="text-[36px] text-font_secondary font-bold">Services</div>
      <div className="border-t border-[#C2C2C2]" />
      <div className="py-4 w-full flex-col justify-start items-center">
        <CustomButton width="200px" fontSize="16px" onClick={() => setIsFormVisible(!isFormVisible)}>
          <img src={plusICon} alt="Plus icon" width={20} height={20} className="pr-2" /> Add new service
        </CustomButton>

        {isFormVisible && (
          <>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea id="service_name" name="name" width="400px" text="Service name" onChange={handleChange} />
              <CustomTextArea
                id="service_type"
                name="serviceType"
                width="400px"
                text="Service type"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-start items-center gap-4 py-2">
              <CustomTextArea id="price" name="price" width="400px" text="Price" onChange={handleChange} />
              <CustomTextArea id="duration" name="duration" width="400px" text="Duration" onChange={handleChange} />
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

              <CustomButton width="150px" fontSize="16px" onClick={handleSubmit}>
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
                Service name
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
            {services.map((item) => (
              <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 ">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.serviceType}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.duration}</td>
                <td className="px-6 py-4 text-right flex justify-start items-center gap-2">
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="cursor-pointer"
                    onClick={() => handleUpdateOpen(item.id)}
                  />
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => handleDeleteOpen(item.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteDialogBox
        open={deleteOpen}
        onClick={handleDelete}
        title="Delete service"
        text="You can't undo after delete. Are you sure, you want delete?"
        buttonText="Delete"
      />
      <UpdateDialogBox
        open={updateOpen}
        handleClose={handleUpdateClose}
        // onClick={handleUpdate}
        title="Update service"
        buttonText="Save"
      >
        <div className="flex justify-start items-center gap-4 py-2">
          <CustomTextArea
            id="service_name"
            name="name"
            width="200px"
            text="Edit Service name"
            value={formData.name}
            onChange={handleChange}
          />
          <CustomTextArea
            id="service_type"
            name="serviceType"
            width="200px"
            text="Edit Service type"
            value={formData.serviceType}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-start items-center gap-4 py-2">
          <CustomTextArea
            id="price"
            name="price"
            width="200px"
            text="Edit Price"
            value={formData.price.toString()}
            onChange={handleChange}
          />
          <CustomTextArea
            id="duration"
            name="duration"
            width="200px"
            text="Edit Duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </UpdateDialogBox>
    </div>
  );
};

export default Services;
