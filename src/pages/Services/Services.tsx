import React, { useEffect, useState } from 'react';
import { CustomButton, CustomTextArea, DeleteDialogBox, UpdateDialogBox } from '../../components/components';
import { deleteIcon, editIcon, plusICon } from '../../assets/icons/icons';
import { createService, getAllServices, deleteService, getServiceById, updateService } from '../../api/serviceApi';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
      [name]: name === 'price' || name === 'duration' ? parseInt(value) : value,
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

  const handleUpdate = async () => {
    if (selectedServiceId !== null) {
      try {
        const updatedService = await updateService(selectedServiceId, {
          id: selectedServiceId,
          ...formData,
          duration: parseInt(formData.duration),
        });
        setServices(services.map((service) => (service.id === selectedServiceId ? updatedService : service)));
        setUpdateOpen(false);
        setSelectedServiceId(null);
        setFormData({ name: '', serviceType: '', price: 0, duration: '' });
      } catch (error) {
        console.error('Error updating service:', error);
      }
    }
  };

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

  const filteredServices =
    selectedCategory === 'All' ? services : services.filter((service) => service.serviceType === selectedCategory);

  const categories = Array.from(new Set(services.map((service) => service.serviceType)));

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center w-full min-h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-screen overflow-auto px-10 py-6">
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

        <div className="border-t border-[#C2C2C2] mt-5" />
      </div>

      <div className="py-4 w-full flex-col justify-start items-center">
        <div className="flex gap-4 pb-6">
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary hover:text-black"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary hover:text-black"
            >
              {category}
            </button>
          ))}
        </div>

        <div>
          <div className="text-[24px] text-font_secondary font-bold pb-4">{selectedCategory}</div>
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
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="bg-white border-b">
                  <td className="px-6 py-4">{service.id}</td>
                  <td className="px-6 py-4">{service.name}</td>
                  <td className="px-6 py-4">{service.serviceType}</td>
                  <td className="px-6 py-4">{service.price}</td>
                  <td className="px-6 py-4">{service.duration}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => handleUpdateOpen(service.id)}>
                      <img src={editIcon} alt="Edit icon" width={20} height={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDeleteOpen(service.id)}
                    >
                      <img src={deleteIcon} alt="Delete icon" width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteDialogBox
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        title="Delete service"
        description="Are you sure you want to delete this service?"
        buttonText="Delete"
      />

      <UpdateDialogBox
        open={updateOpen}
        handleClose={handleUpdateClose}
        onClick={handleUpdate}
        title="Update service"
        buttonText="Save"
      >
        <div className="flex justify-start items-center gap-4 py-2">
          <CustomTextArea
            id="update_service_name"
            name="name"
            width="100%"
            text="Service name"
            value={formData.name}
            onChange={handleChange}
          />
          <CustomTextArea
            id="update_service_type"
            name="serviceType"
            width="100%"
            text="Service type"
            value={formData.serviceType}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-start items-center gap-4 py-2">
          <CustomTextArea
            id="update_price"
            name="price"
            width="100%"
            text="Price"
            value={formData.price.toString()}
            onChange={handleChange}
          />
          <CustomTextArea
            id="update_duration"
            name="duration"
            width="100%"
            text="Duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </UpdateDialogBox>
    </div>
  );
};

export default Services;
