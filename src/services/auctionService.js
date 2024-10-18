import axios from 'axios';

export const fetchAuctions = async () => {
  const response = await axios.get('http://localhost:3000/api/auctions/');
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await axios.post('/api/auctions', auctionData);
  return response.data;
};

export const placeBid = async (auctionId, bidAmount) => {
  const response = await axios.post(`/api/auctions/${auctionId}/bids`, { bidAmount });
  return response.data;
};

