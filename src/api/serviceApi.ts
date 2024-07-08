import axios from 'axios';

const API_BASE_URL = 'https://stylesync-backend-test.onrender.com/admin';

export interface Service {
  id: number;
  name: string;
  serviceType: string;
  price: number;
  duration: number;
}

export const createService = async (serviceData: Service) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/salons/get-all-salons`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const getAllServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/get-all-salons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getServiceById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/get-salon-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    throw error;
  }
};

export const updateService = async (id: number, serviceData: Service) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/services/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

export const getServiceCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/get-all-salons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service count:', error);
    throw error;
  }
};
