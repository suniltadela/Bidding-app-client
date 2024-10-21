import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuctionCard.css';
import { useDispatch, useSelector } from 'react-redux';

const AuctionCard = ({ auction }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();  
  const [timeLeft, setTimeLeft] = useState(''); // State for time remaining

  // Function to calculate the time difference
  const calculateTimeLeft = () => {
    const endTime = new Date(auction.endDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      return 'Auction Ended';
    }
  };

  // Update the time remaining every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [auction.endDate]);

  const handleBidNowClick = () => {
    const token = localStorage.getItem('authToken');  
    if (isLoggedIn) {
      navigate(`/auction/${auction._id}`);
    } else {
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
            <>Min Bid:</> <><strong>${auction.startingBid ? auction.startingBid : '49'}</strong></> {/* Minimum Bid */}
          </div>
          <div className="current-bid">
            <>Current Bid:</><><strong>${auction.currentBid}</strong></> {/* Current Bid */}
          </div>
          <div className="time-left">
            <span>Ends in:</span> <span>{timeLeft}</span> {/* Dynamic time left */}
          </div>
        </div>
        <button onClick={handleBidNowClick}>Bid Now</button> {/* Bid Now button */}
      </div>
    </div>
  );
};

export default AuctionCard;
