import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigate for redirect
import './Signup.css';
import { register } from '../../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');  // Success message state
  const [errorMessage, setErrorMessage] = useState('');      // Error message state
  const navigate = useNavigate();  // To redirect after signup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const { firstname, lastname, email, password } = formData;
    
    try {
      await register(firstname, lastname, email, password);  // Call the register function
      
      // Show success message and clear error message
      setSuccessMessage('Signup successful!');
      setErrorMessage('');

      // Clear form fields
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      });

      // After a delay, redirect to login page
      setTimeout(() => {
        setSuccessMessage('');  // Clear success message
        navigate('/login');  // Redirect to login page
      }, 3000);  // Wait for 3 seconds before redirecting

    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      setSuccessMessage('');  // Clear any success message if there's an error
    }
  };

  useEffect(() => {
    // If there are any messages, they disappear after 3 seconds
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);  // Message disappears after 3 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign up</h1>
        <p>New bidders, fill in your details to get started with the auction.</p>

        {/* Display success or error messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSignup}>
          <div className="input-field">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="password-hint">Password criteria check</p>
          </div>
          <button type="submit" className="signup-button">
            Submit
          </button>
        </form>

        <p>or sign up with</p>
        <div className="social-buttons">
          <button className="google-btn">Google</button>
          <button className="apple-btn">Apple</button>
          <button className="facebook-btn">Facebook</button>
        </div>

        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
