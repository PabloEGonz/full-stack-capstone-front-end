import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BaseApi from '../url';

// Create async thunks
export const createReserve = createAsyncThunk('reservations/createReserve',
  async (data) => {
    try {
      const response = await fetch(`${BaseApi}users/${data.user_id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
      // Handle non-success HTTP status codes here
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();

      return res;
    } catch (error) {
    // Handle any other errors that may occur during the request
      return error.message;
    }
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

export const getReservations = createAsyncThunk('reservations/fetchReservations', async (userId) => {
  try {
    const response = await fetch(`${BaseApi}/users/${userId}/reservations`);
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
