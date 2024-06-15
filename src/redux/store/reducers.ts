import { combineReducers } from 'redux';
import adminReducers from '../features/admin';

const rootReducer = combineReducers({
  admin: adminReducers,
});

export default rootReducer;
