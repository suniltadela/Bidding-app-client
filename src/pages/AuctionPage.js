// src/pages/AuctionPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import AuctionDetails from '../components/AuctionDetails/AuctionDetails';
import { useSelector } from 'react-redux';

const AuctionPage = () => {
  const { id } = useParams();
  const auction = useSelector((state) =>
    state.auction.items.find((item) => item._id === id)
  );

  if (!auction) return <p>Auction not found</p>;

  return <AuctionDetails auction={auction} />;
};

export default AuctionPage;
