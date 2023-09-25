import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:3000/api';

export const createReserve = createAsyncThunk('reservations/createReserve', async (payload) => {
  const res = {
    username: payload.username,
    car_id: payload.car_id,
    reservation_date: payload.reservation_date,
    due_date: payload.due_date,
    service_fee: payload.service_fee,
  };
  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(res),
  });
  const data = await response.json();
  return data;
});

export const getReserve = createAsyncThunk('reservations/getReserve', async () => {
  const response = await fetch(`${API_BASE_URL}/reservations`);
  const data = await response.json();
  return data;
});

export const deleteReserve = createAsyncThunk('reservations/deleteReserve', async (payload) => {
  const response = await fetch(`${API_BASE_URL}/reservations/${payload}`, {
    method: 'DELETE', headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  reservations: [],
  regsuccess: null,
};

const reservationSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReserve.fulfilled, (state, action) => {
      state.regsuccess = action.payload;
    });
    builder.addCase(getReserve.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.getsuccess = true;
    });
    builder.addCase(deleteReserve.fulfilled, (state, action) => {
      state.reservations = state.reservations.filter((reserve) => reserve.id !== action.payload);
    });
  },
});

export default reservationSlice.reducer;
