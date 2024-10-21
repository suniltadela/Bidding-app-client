import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Retrieve user from localStorage
  token: localStorage.getItem('authToken') || null, // Retrieve the token from localStorage
  isLoggedIn: !!localStorage.getItem('authToken'), // Set to true if token exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user; // Set user details
      state.token = action.payload.token; 
      state.isLoggedIn = true; 
      localStorage.setItem('authToken', action.payload.token); 
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user in localStorage
    },
    logout(state) {
      state.user = null; // Reset user
      state.token = null;
      state.isLoggedIn = false; 
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('user'); // Remove user from localStorage
    },
    setUser(state, action) {
      state.user = action.payload; // Set user data in state
    },
    checkLoggedIn(state) {
      state.isLoggedIn = !!localStorage.getItem('authToken');
    },
  },
});

export const { loginSuccess, logout, setUser, checkLoggedIn } = authSlice.actions;
export default authSlice.reducer;
