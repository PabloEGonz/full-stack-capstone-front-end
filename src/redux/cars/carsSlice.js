import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseApi from '../url';

// Define an initial state
const initialState = {
  cars: [],
  isLoading: false,
  error: null,
};

// Create an async thunk for fetching cars
export const getCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const response = await fetch(`${BaseApi}cars`);
    if (!response.ok) {
      throw new Error(`The request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
});

// Create a cars slice
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default carsSlice.reducer;

// Create async thunks
