// auctionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    items: [], // Default state is an empty array
  },
  reducers: {
    setAuctions(state, action) {
      state.items = action.payload; // Set auctions to state
    },
  },
});

export const { setAuctions } = auctionSlice.actions; // Export the action
export default auctionSlice.reducer; // Export the reducer
