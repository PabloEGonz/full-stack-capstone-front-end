import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BaseApi from '../url';

// Create async thunks
export const createReserve = createAsyncThunk('reservations/createReserve', async (payload) => {
  const res = {
    username: payload.username,
    car_id: payload.car_id,
    reservation_date: payload.reservation_date,
    due_date: payload.due_date,
    service_fee: payload.service_fee,
  };
  const response = await fetch(`${BaseApi}/reservations`, {
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
  const response = await fetch(`${BaseApi}/reservations`);
  const data = await response.json();
  return data;
});

export const deleteReserve = createAsyncThunk('reservations/deleteReserve', async (payload) => {
  const response = await fetch(`${BaseApi}/reservations/${payload}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
});

export const getReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/reservations');
    if (!response.ok) {
      throw new Error(`The request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
});

const initialState = {
  reservations: [],
  regsuccess: null,
  isLoading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReserve.fulfilled, (state, action) => {
        state.regsuccess = action.payload;
      })
      .addCase(getReserve.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.getsuccess = true;
      })
      .addCase(deleteReserve.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter((reserve) => reserve.id !== action.payload);
      })
      .addCase(getReservations.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getReservations.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        reservations: action.payload,
      }))
      .addCase(getReservations.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }));
  },
});

export default reservationSlice.reducer;
