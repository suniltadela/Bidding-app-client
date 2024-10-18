import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');  // Get token from localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the route
  return children;
};

export default ProtectedRoute;
