import { combineReducers } from 'redux';
import authReducer from './auth/authSlice';

const adminReducers = combineReducers({
  auth: authReducer,
});

export default adminReducers;
