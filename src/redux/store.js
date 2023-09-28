import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/usersSlice';
import reservationsSlice from './reservations/reservationsSlice';
import carsSlice from './cars/carsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsSlice,
    reservations: reservationsSlice,
  },
});
export default store;
