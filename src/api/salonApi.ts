import axios from 'axios';

const API_BASE_URL = 'https://stylesync-backend-test.onrender.com/admin';

export interface Review {
  id: number;
  time: string;
  date: string;
  value: number;
  customerId: number;
  salonId: number;
}

export interface Salon {
  id: number;
  name: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  contactNo: string;
  latitude: number;
  longitude: number;
  review: Review[];
}

export const getAllSalons = async (): Promise<Salon[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/get-all-salons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all salons:', error);
    throw error;
  }
};

export const getSalonById = async (id: number): Promise<Salon> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/get-salon-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salon by ID:', error);
    throw error;
  }
};
