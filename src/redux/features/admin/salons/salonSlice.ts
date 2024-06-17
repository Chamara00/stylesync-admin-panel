import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, handleAxiosError } from '../../../../services/api';
import NotificationController from '../../../../services/notification';

export interface Salon {
  id: number;
  name: string;
  email: string;
  location?: string;
  line1?: string;
  line2?: string;
  city?: string;
  country?: string;
  password?: string;
  contactNo: string;
  otp?: string;
  emailVerified?: boolean;
  article?: Article[];
  review?: Review[];
  salonStaff?: Staff[];
}

export interface Article {
  id: number;
  date: Date;
  time: string;
  salonId: number;
}

export interface Review {
  id: number;
  time: string;
  date: Date;
  value: number; // Float in Prisma schema maps to number in TypeScript
  customerId: number;
  salonId: number;
}

export interface Staff {
  id: number;
  name: string;
  gender: string;
}

export interface SalonState {
  salons: Salon[];
  loading: boolean;
  message: string | null;
  error: boolean;
}

const initialState: SalonState = {
  salons: [],
  loading: false,
  message: null,
  error: false,
};

const salonSlice = createSlice({
  name: 'salons',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get all salons
      .addCase(getAllSalons.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getAllSalons.fulfilled, (state, action) => {
        state.loading = false;
        state.salons = action.payload;
      })
      .addCase(getAllSalons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // get salon by id
      .addCase(getSalonById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getSalonById.fulfilled, (state, action) => {
        state.loading = false;
        state.salons = action.payload.salons;
        NotificationController.success(action.payload.message);
      })
      .addCase(getSalonById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })
      .addCase(getSalonCount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getSalonCount.fulfilled, (state, action) => {
        state.loading = false;
        state.salons = action.payload.salons;
        NotificationController.success(action.payload.message);
      })
      .addCase(getSalonCount.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      });
  },
});

export default salonSlice.reducer;

export const getAllSalons = createAsyncThunk<Salon[], void, { rejectValue: string }>(
  '/admin/dashboard/salons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/salons/get-all-salons');
      console.log('fetched all salons');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getSalonById = createAsyncThunk('salons/get-salon-by-id/:id', async (salon_id: number) => {
  try {
    const response = await axiosInstance.get(`/admin/dashboard/salons/${salon_id}`);
    console.log('fetched salon');
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
});

export const getSalonCount = createAsyncThunk('/admin/dashboard/salon-count', async () => {
  try {
    const response = await axiosInstance.get('/salons/get-salon-count');
    console.log('fetched salon count');
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage);
  }
});
