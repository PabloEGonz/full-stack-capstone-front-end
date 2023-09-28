import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseApi from '../url';

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (username) => {
    try {
      const response = await fetch(`${BaseApi}users/?user_name=${username}`);
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const res = await response.json();
      return res;
    } catch (error) {
      return error;
    }
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data) => {
    try {
      const response = await fetch(`${BaseApi}users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      return await response.json();
    } catch (error) {
      return error;
    }
  },
);
const initialState = {
  id: null,
  user_name: null,
  name: null,
  loginError: false,
};
export const usersSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.user_name = payload.user_name;
        state.name = payload.name;
        localStorage.setItem('user_name', JSON.stringify(payload.user_name));
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loginError = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.user_name = payload.user_name;
        state.name = payload.name;
      })
      .addCase(createUser.rejected, (state) => {
        state.loginError = true;
      });
  },
});

export default usersSlice.reducer;
