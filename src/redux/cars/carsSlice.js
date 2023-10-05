import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseApi from '../url';

// Define an initial state
const initialState = {
  cars: [],
  submitted: false,
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

export const deleteCarById = createAsyncThunk('cars/deleteCarById', async (carId) => {
  try {
    const response = await fetch(`${BaseApi}cars/${carId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`The request failed with status ${response.status}`);
    }
    // Return the deleted car ID as a result
    return carId;
  } catch (error) {
    throw error.message;
  }
});

// Create an async thunk for creating a new car

export const createCar = createAsyncThunk('cars/createCar', async (carData, thunkAPI) => {
  try {
    const response = await fetch(`${BaseApi}cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error(`The request failed with status ${response.status}`);
    }
    const data = await response.json();
    thunkAPI.dispatch(getCars());
    return data;
  } catch (error) {
    throw error.message;
  }
});

// Create a cars slice
const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setSubmitted: (state) => {
      state.submitted = false;
    },
  },
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
      })
      .addCase(deleteCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted car from the state
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      })
      .addCase(deleteCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createCar.fulfilled, (state) => {
        state.submitted = true;
      });
  },
});

export const { setSubmitted } = carsSlice.actions;
// Export the reducer
export default carsSlice.reducer;

// Create async thunks
