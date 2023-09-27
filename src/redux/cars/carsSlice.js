import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state
const initialState = {
  cars: [],
  isLoading: false,
  error: null,
};

// Define the API URL for fetching cars (adjust this URL as needed)
const API_BASE_URL = 'http://localhost:3000/api';

// Create an async thunk for fetching cars
export const getCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`);
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
