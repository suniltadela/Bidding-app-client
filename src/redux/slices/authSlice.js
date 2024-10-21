import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false, // Add isLoggedIn state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true; // Set logged in status to true
      localStorage.setItem('authToken', action.payload.token); // Store token in localStorage
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false; // Reset logged in status
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    setUser(state, action) {
      state.user = action.payload; // Set user data in state
    },
    checkLoggedIn(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true; // Set logged in status based on token existence
      }
    },
  },
});

export const { loginSuccess, logout, setUser, checkLoggedIn } = authSlice.actions;
export default authSlice.reducer;
