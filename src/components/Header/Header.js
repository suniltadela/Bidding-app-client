import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Import the logout action
import './Header.css'; // Import the CSS for styling

const Header = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // To navigate after logout
  // const user = useSelector((state) => state.auth.user); // Get user state from Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem('authToken'); // Remove token from local storage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="header_nav">
      <div className="logo">Genix Auction</div> {/* Brand/logo name */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
