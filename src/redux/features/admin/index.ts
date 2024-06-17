import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';
import customerReducer from './customer/customerSlice';
import salonReducer from './salons/salonSlice';
import serviceReducer from './service/serviceSlice';

const adminReducers = combineReducers({
  auth: authReducer,
  customers: customerReducer,
  salons: salonReducer,
  services: serviceReducer,
});

export default adminReducers;
