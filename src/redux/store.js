import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/usersSlice';
import reservationsSlice from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    reservations: reservationsSlice,
  },
});
export default store;
