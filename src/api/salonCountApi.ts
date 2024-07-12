import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/admin';

export const getTotalSalonCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/total_salon_count`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching total salon count:', error);
    throw error;
  }
};

export const getSalonCountThisMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/salon_count_this_month`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salon count this month:', error);
    throw error;
  }
};

export const getSalonCountToday = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/salons/salon_count_today`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salon count today:', error);
    throw error;
  }
};
