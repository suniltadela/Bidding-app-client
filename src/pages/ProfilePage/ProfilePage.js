import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuctions } from '../../redux/slices/auctionSlice';
import { fetchUserAuctions } from '../../services/auctionService';
import './ProfilePage.css'; // Your CSS file for styling

const ProfilePage = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.user); // Get the logged-in user
  const [userAuctions, setUserAuctions] = useState([]); // State to hold user's auctions

  useEffect(() => {
    const getUserAuctions = async () => {
      if (user && user.id) { // Use user.id for fetching auctions
        console.log("Fetching auctions for user ID:", user.id);
        try {
          const fetchedUserAuctions = await fetchUserAuctions(user.id);
          console.log("Fetched user auctions:", fetchedUserAuctions);
          
          setUserAuctions(fetchedUserAuctions);
          dispatch(setAuctions(fetchedUserAuctions));
        } catch (error) {
          console.error('Error fetching user auctions:', error);
        }
      } else {
        console.log("No user found or user ID is missing.");
      }
    };

    getUserAuctions(); // Call the function to fetch user auctions
  }, [user, dispatch]);

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.firstname}!</h2> {/* Display first name */}
      <p>Email: {user?.email}</p>

      <h3>Your Auctions</h3>
      {userAuctions.length > 0 ? (
        <ul>
          {userAuctions.map((auction) => (
            <li key={auction._id}>
              <strong>{auction.title}</strong>: {auction.description} (Starting Bid: ${auction.startingBid})
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no auctions listed.</p>
      )}
    </div>
  );
};

export default ProfilePage;
