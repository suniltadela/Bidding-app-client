import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login/Login';
import AuctionDetails from './components/AuctionDetails/AuctionDetails';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        {/* Assume auction details is shown under /auction/:id */}
        <Route path="/auction/:id" element={<AuctionDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

