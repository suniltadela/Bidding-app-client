import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Genix Auction</div> {/* Brand/logo name */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
