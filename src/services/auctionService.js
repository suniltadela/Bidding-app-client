import axios from 'axios';

// Fetch all auctions
export const fetchAuctions = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auctions/`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch auctions');
  }
};

export const fetchUserAuctions = async (userId) => {
  try {
    const token = localStorage.getItem('authToken');
    // console.log(token,'getting token here from local')
    
    if (!token) {
      throw new Error('No token found');
    }

    const config = {
      headers: {
        'x-auth-token': token, // Ensure this matches your middleware
      },
    };

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auctions/user/${userId}`, config);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user auctions:', error);
    throw new Error('Failed to fetch user auctions');
  }
};



// Create a new auction
export const createAuction = async (auctionData) => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    
    const response = await axios.post(
      '${process.env.REACT_APP_BASE_URL}/api/auctions',
      auctionData,
      {
        headers: {
          'x-auth-token': token, // Include the token in the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create auction');
  }
};



export const updateAuction = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auctions/${id}`, 
      updatedData,
      {
        headers: {
          'x-auth-token': token, // Include the token in the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update auction');
  }
};

export const deleteAuction = async (id) => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/auctions/${id}`, {
      headers: {
        'x-auth-token': token, // Include the token in the headers
      },
    });
  } catch (error) {
    throw new Error('Failed to delete auction');
  }
};

// Place a bid on an auction
// Place a bid on an auction (PATCH request)
export const placeBid = async (auctionId, bidAmount) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/auctions/${auctionId}`,
      { currentBid: bidAmount },
      {
        headers: { 'x-auth-token': token }, // Include the token in the headers
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to place bid');
  }
};
