import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, handleAxiosError } from '../../../../services/api';
import NotificationController from '../../../../services/notification';

interface Admin {
  email: string;
  password: string;
}

export interface AuthState {
  user: Admin | null;
  loading: boolean;
  message: string | null;
  error: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  message: null,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        NotificationController.success(action.payload.message);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      });
  },
});

export default authSlice.reducer;

export const adminLogin = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/login', userData);
      console.log('fetched admin data');
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
