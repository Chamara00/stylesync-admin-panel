import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, handleAxiosError } from '../../../../services/api';
import NotificationController from '../../../../services/notification';

export interface Service {
  id: number;
  name: string;
  serviceType: string;
  price: number;
  duration: string;
}

export interface ServiceState {
  services: Service[];
  loading: boolean;
  message: string | null;
  error: boolean;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  message: null,
  error: false,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // get all services
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // get service by id
      .addCase(getServiceById.pending, (State) => {
        State.loading = true;
        State.error = false;
        State.message = null;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        NotificationController.success(action.payload.message);
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        NotificationController.success(action.payload.message);
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      })

      // get service count
      .addCase(getServiceCount.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = null;
      })
      .addCase(getServiceCount.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        NotificationController.success(action.payload.message);
      })
      .addCase(getServiceCount.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
        NotificationController.error(state.message);
      });
  },
});

export default serviceSlice.reducer;

export const createService = createAsyncThunk(
  '/admin/dashboard/services/create-service',
  async (serviceData: { name: string; serviceType: string; price: number; duration: string }, { rejectWithValue }) => {
    try {
      console.log('Service data:', serviceData);
      const response = await axiosInstance.post('/services/create-service', serviceData);
      console.log('create service');
      console.log(response);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getAllServices = createAsyncThunk<Service[], void, { rejectValue: string }>(
  '/admin/dashboard/services',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/services/get-all-services');
      console.log('fetch all services');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getServiceById = createAsyncThunk('services/get-service-by-id/:id', async (service_id: number) => {
  try {
    const response = await axiosInstance.get(`/admin/dashboard/services/${service_id}`);
    console.log('fetched service');
    console.log(response);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
});

export const updateService = createAsyncThunk(
  'services/update-service',
  async (
    userData: { id: number; name: string; serviceType: string; price: number; duration: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(`/admin/dashboard/services/${userData.id}`, userData);
      console.log('update service');
      console.log(response);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteService = createAsyncThunk<Service[], number, { rejectValue: string }>(
  '/admin/dashboard/services/delete',
  async (service_id: number) => {
    try {
      const response = await axiosInstance.delete(`/services/delete-service/${service_id}`);
      console.log('delete service');
      console.log(response);
      return response.data;
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

export const getServiceCount = createAsyncThunk('services/get-service-count', async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard/services/count');
    console.log('service count');
    console.log(response);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
});
