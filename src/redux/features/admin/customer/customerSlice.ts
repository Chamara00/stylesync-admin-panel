import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance, handleAxiosError } from '../../../../services/api';
import NotificationController from '../../../../services/notification';
import { Review } from '../salons/salonSlice';

export interface Customer {
  id: number;
  name: string;
  email: string;
  gender?: string | null;
  customerAppointmentBlock?: CustomerAppointmentBlock[] | null;
  review?: Review[] | null;
}

export interface CustomerAppointmentBlock {
  customerId: number;
  date: Date;
  startTime: string;
  staffId: number;
  isCancel: boolean;
}

export interface CustomerState {
  customers: Customer[];
  //id: number;
  // name: string;
  // email: string;
  // gender: string;
  loading: boolean;
  message: string | null;
  error: boolean;
}

const initialState: CustomerState = {
  customers: [],
  //id: 0,
  // name: '',
  // email: '',
  // gender: '',
  loading: false,
  message: null,
  error: false,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //get all customers
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state) => {
        state.loading = false;
        state.error = true;

        NotificationController.error('Loading data failed');
      });
  },
});

export default customerSlice.reducer;

export const getAllCustomers = createAsyncThunk<Customer[], void, { rejectValue: string }>(
  '/admin/dashboard/customers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/customer/get-all-customers', {
        withCredentials: true,
      });
      console.log('fetch all customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getCustomerById = createAsyncThunk('customer/getcustomer-by-id/:id', async (customer_id: number) => {
  try {
    const response = await axiosInstance.get(`/admin/dashboard/customers/${customer_id}`);
    console.log('fetch customer by id');
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
});

export const getCustomerCount = createAsyncThunk('customer/get-customer-count', async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard/customer-count');
    console.log('fetch customer count');
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
});
