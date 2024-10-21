import axios from 'axios';

// Fetch all auctions
export const fetchAuctions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/auctions/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch auctions');
  }
};

// Fetch auctions created by a specific user
// export const fetchUserAuctions = async (userId) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/api/auctions/user/${userId}`);
//     return response.data; // Assuming the response is an array of user auctions
//   } catch (error) {
//     throw new Error('Failed to fetch user auctions');
//   }
// };
export const fetchUserAuctions = async (userId) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log(token,'getting token here from local')
    
    if (!token) {
      throw new Error('No token found');
    }

    const config = {
      headers: {
        'x-auth-token': token, // Ensure this matches your middleware
      },
    };

    const response = await axios.get(`http://localhost:3000/api/auctions/user/${userId}`, config);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user auctions:', error);
    throw new Error('Failed to fetch user auctions');
  }
};



// Create a new auction
export const createAuction = async (auctionData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auctions', auctionData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create auction');
  }
};

// Place a bid on an auction
export const placeBid = async (auctionId, bidAmount) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/auctions/${auctionId}/bids`, { bidAmount });
    return response.data;
  } catch (error) {
    throw new Error('Failed to place bid');
  }
};
