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
  console.log('called!');
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

export const deleteCarById = createAsyncThunk('cars/deleteCarById', async (carId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
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

// Create an async thunk for fetching a car by ID
// export const getCarById = createAsyncThunk('cars/getCarById', async (carId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
//     if (!response.ok) {
//       throw new Error(`The request failed with status ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error.message;
//   }
// });

// Create an async thunk for creating a new car
export const createCar = createAsyncThunk('cars/createCar', async (carData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`, {
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
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the created car to the state
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default carsSlice.reducer;

// Create async thunks
