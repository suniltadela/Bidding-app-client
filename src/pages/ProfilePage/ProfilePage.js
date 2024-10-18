import React from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css'; // Assuming you have a separate CSS file for styling

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const auctions = useSelector((state) => state.auction.items);

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.name}!</h2> {/* Welcome message with user's name */}
      <p>Email: {user?.email}</p>

      <h3>Your Auctions</h3>
      {auctions.length > 0 ? (
        <ul>
          {auctions
            .filter((auction) => auction.creator === user?._id)
            .map((auction) => (
              <li key={auction._id}>{auction.title}</li>
            ))}
        </ul>
      ) : (
        <p>You have no auctions listed.</p> // Message if no auctions are found
      )}
    </div>
  );
};

export default ProfilePage;
