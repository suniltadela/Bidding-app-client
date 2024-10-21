// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import auctionSlice from './slices/auctionSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    auction: auctionSlice, // Use 'auction' to match your slice name
  },
});

export default store;
