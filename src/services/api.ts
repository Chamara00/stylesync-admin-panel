import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.ADMIN_PANEL_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface ErrorResponse {
  error: string;
}

export const handleAxiosError = (error: unknown): string | undefined => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data.error;
    }
  }
  return undefined;
};
