import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:3000/api';

// Create async thunks
export const createReserve = createAsyncThunk('reservations/createReserve',
  async (data, userId) => {
    try {
      console.log(JSON.stringify(data));

      const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`, {
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

      console.log(res);
      return res;
    } catch (error) {
    // Handle any other errors that may occur during the request
      return error.message;
    }
  });

export const getReserve = createAsyncThunk('reservations/getReserve', async () => {
  const response = await fetch(`${API_BASE_URL}/reservations`);
  const data = await response.json();
  return data;
});

export const deleteReserve = createAsyncThunk('reservations/deleteReserve', async (payload) => {
  const response = await fetch(`${API_BASE_URL}/reservations/${payload}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
});

export const getReservations = createAsyncThunk('reservations/fetchReservations', async (userId) => {
  console.log('Fetching reservations for user with id:', userId);
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`);
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
