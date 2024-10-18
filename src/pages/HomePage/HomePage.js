import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuctions } from '../../redux/slices/auctionSlice';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const auctions = useSelector((state) => state.auction.items);

  useEffect(() => {
    async function fetchAuctions() {
      const response = await axios.get('http://localhost:3000/api/auctions/');
      dispatch(setAuctions(response.data));
    }
    fetchAuctions();
  }, [dispatch]);

  return (
    <div className="home-page">
      <div className="auction-card-container"> {/* Flex container */}
        {auctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
