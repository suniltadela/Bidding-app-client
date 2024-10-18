import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuctionCard.css';

const AuctionCard = ({ auction }) => {
  const navigate = useNavigate();  // useNavigate hook for programmatic navigation

  const handleBidNowClick = () => {
    const token = localStorage.getItem('authToken');  // Check if the user is authenticated

    if (token) {
      // If token exists, navigate to the auction details page
      navigate(`/auction/${auction._id}`);
    } else {
      // If no token, redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="auction-card">
      <img src={auction.imageUrl} alt={auction.title} />
      <div className="auction-details">
        <span className="live-auction">Live Auction</span> {/* Live Auction label */}
        <h4>{auction.title}</h4>
        <div className="bids">
          <div className="min-bid">
            <>Min Bid:</> <><strong>${auction.minimumBid ? auction.minimumBid : '50'}</strong></> {/* Minimum Bid */}
          </div>
          <div className="current-bid">
            <>Current Bid:</><><strong>${auction.currentBid}</strong></> {/* Current Bid */}
          </div>
        </div>
        <button onClick={handleBidNowClick}>Bid Now</button> {/* Bid Now button */}
      </div>
    </div>
  );
};

export default AuctionCard;
