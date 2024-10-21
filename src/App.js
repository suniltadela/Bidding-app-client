import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AuctionPage from './pages/AuctionPage';
import ProtectedRoute from './components/ProtectedRoute';
import { checkLoggedIn } from './redux/slices/authSlice'; // Import the checkLoggedIn action

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedIn()); // Check login status on app load
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route
          path="/auction/:id"
          element={
            <ProtectedRoute>
              <AuctionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
