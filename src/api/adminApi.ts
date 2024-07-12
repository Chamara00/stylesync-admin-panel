import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/admin';

export interface AdminLoginResponse {
  message: string;
}

export const adminLogin = async (email: string, password: string): Promise<AdminLoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error;
  }
};
