import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/admin';

export const getTotalCustomerCount = async (): Promise<number> => {
  try {
    const response = await axios.get<number>(`${API_BASE_URL}/customer/total_customer_count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total customer count:', error);
    throw error;
  }
};

export const getCustomerCountThisMonth = async (): Promise<number> => {
  try {
    const response = await axios.get<number>(`${API_BASE_URL}/customer/this_month_count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer count for this month:', error);
    throw error;
  }
};

export const getCustomerCountToday = async (): Promise<number> => {
  try {
    const response = await axios.get<number>(`${API_BASE_URL}/customer/today_count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer count for today:', error);
    throw error;
  }
};
