import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogedIn = true;
    },
    signup(state) {
      state.isLogedIn = true;
    },
    logout(state) {
      state.isLogedIn = false;
      localStorage.removeItem("userId");
    },
  },
});

export const authActions = authSlice.actions

export default authSlice.reducer