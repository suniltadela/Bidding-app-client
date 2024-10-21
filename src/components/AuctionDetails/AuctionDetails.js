import React, { useState } from 'react';
import { placeBid } from '../../services/auctionService'; // Import the placeBid function from AuctionService
import './AuctionDetails.css';

const AuctionDetails = ({ auction }) => {
  const [bidAmount, setBidAmount] = useState(auction.currentBid); // State for bid amount
  const [currentBid, setCurrentBid] = useState(auction.currentBid); // State for current bid display
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State for success message

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = async () => {
    try {
      // Validate if bid is higher than both the current bid and minimum bid
      if (bidAmount <= currentBid || bidAmount < auction.minimumBid) {
        setError('Your bid must be equal to or higher than both the minimum bid and the current bid.');
        setSuccess(null);
        return;
      }

      // Call the placeBid service function
      const response = await placeBid(auction._id, bidAmount);

      // Update UI with the new bid and show success message
      setCurrentBid(bidAmount); // Update current bid display
      setBidAmount(''); // Clear bid input field
      setError(null); // Clear error message
      setSuccess('Bid placed successfully!'); // Show success message

    } catch (err) {
      console.error(err);
      setError('Error placing bid.');
      setSuccess(null);
    }
  };

  return (
    <div className="auction-details-container">
      <div className="auction-details-header">
        <img src={auction.imageUrl} alt={auction.title} />
        <h2>{auction.title}</h2>
        <p>Minimum Bid: ${auction.minimumBid}</p>
        <p>Current Bid: ${currentBid}</p> {/* Display updated current bid */}
      </div>

      <div className="auction-description">
        <h4>Description</h4>
        <p>{auction.description}</p>
      </div>

      <div className="place-bid">
        <h4>Place your Bid</h4>
        <input
          type="number"
          value={bidAmount}
          onChange={handleBidChange}
          min={Math.max(currentBid + 1, auction.minimumBid)} // Ensure bid is higher than both current bid and minimum bid
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Success message */}
        <button onClick={handlePlaceBid} className="bid-now-button">Place Bid</button>
      </div>
    </div>
  );
};

export default AuctionDetails;
