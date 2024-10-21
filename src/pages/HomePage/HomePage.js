import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuctions } from '../../redux/slices/auctionSlice';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import axios from 'axios';
import './HomePage.css';
import headerImage from '../../Resources/headerimage.png';

const HomePage = () => {
  const dispatch = useDispatch();
  const auctions = useSelector((state) => state.auction.items);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get isLoggedIn state

  useEffect(() => {
    async function fetchAuctions() {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auctions/`);
      dispatch(setAuctions(response.data));
    }
    fetchAuctions();
  }, [dispatch]);

  return (
    <div className="home-page">
      <img src={headerImage} alt="Auctions" className="header-image" />
      <>
        {isLoggedIn ? (
          <h1>Welcome <span className='highlight-auctions'>{user?.firstname}</span></h1>
        ) : (
          <h1>Explore <span className="highlight-auctions">Auctions</span></h1>
        )}
      </>
      
      <div className="auction-card-container">
        {auctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
