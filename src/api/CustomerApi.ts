import axios from 'axios';

const API_BASE_URL = 'https://stylesync-backend-test.onrender.com/admin';

export interface Customer {
  id: number;
  name: string;
  gender: string;
  image: string;
  contactNo: string;
  isTemporary: boolean;
  OTP: string;
  isVerified: boolean;
  email: string;
  review: { salonId: number; value: number; date: string; time: string }[];
  customerAppointmentBlock: {
    staffId: number;
    startTime: string;
    isCancel: boolean;
    date: string;
    customerId: number;
    formattedDate: string;
  }[];
}

export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/get-all-customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/getcustomer-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    throw error;
  }
};

export const deleteCustomerById = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/customer/delete-customer/${id}`);
  } catch (error) {
    console.error('Error deleting customer by ID:', error);
    throw error;
  }
};
