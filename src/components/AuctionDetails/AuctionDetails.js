import React from 'react';
import './AuctionDetails.css';

const AuctionDetails = ({ auction }) => {
  return (
    <div className="auction-details-container"> {/* Updated class name */}
      <div className="auction-details-header">
        <img src={auction.imageUrl} alt={auction.title} />
        <h2>{auction.title}</h2>
        <p>Minimum Bid: ${auction.minimumBid}</p>
        <p>Current Bid: ${auction.currentBid}</p>
      </div>
      <div className="auction-description">
        <h4>Description</h4>
        <p>{auction.description}</p>
      </div>
      <div className="auction-reviews">
        <h4>Reviews</h4>
        {/* {auction.reviews.map((review, index) => (
          <div key={index}>
            <strong>{review.user}</strong>
            <p>{review.comment}</p>
            <p>{review.date}</p>
          </div>
        ))} */}
      </div>
      <button className="bid-now-button">Place Bid</button>
    </div>
  );
};

export default AuctionDetails;
