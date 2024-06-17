import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  //baseURL: process.env.ADMIN_PANEL_API_BASE_URL,
  baseURL: 'http://localhost:8000/admin',
  //baseURL: 'https://stylesync-backend-test.onrender.com/admin/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface ErrorResponse {
  error: string;
  message?: string;
}

export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response && axiosError.response.data) {
      // Providing more detailed feedback if available
      return axiosError.response.data.message || axiosError.response.data.error;
    } else if (axiosError.request) {
      // The request was made but no response was received
      return 'The request was made but no response was received';
    } else {
      // Something happened in setting up the request that triggered an Error
      return 'Something went wrong in setting up the request';
    }
  }
  return 'An unknown error occurred';
};
