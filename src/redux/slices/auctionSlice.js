import { createSlice } from '@reduxjs/toolkit';

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    items: [],
  },
  reducers: {
    setAuctions(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setAuctions } = auctionSlice.actions;
export default auctionSlice.reducer;

