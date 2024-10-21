import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/authService';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { loginSuccess } from '../../redux/slices/authSlice'; // Import the action to handle successful login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await login(email, password);
      console.log(response, 'loginres');
      
      if (response.token) {
        // localStorage.setItem('authToken', response.token);
        
        // Dispatch the user data and token to Redux store
        dispatch(loginSuccess({ user: response.user, token: response.token }));

        navigate('/');
      } else {
        setErrorMessage('Invalid login credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Welcome back. Enter your credentials to access your account.</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
          </div>
          <div className="checkbox-field">
            <input type="checkbox" id="keep-signed-in" />
            <label htmlFor="keep-signed-in">Keep me signed in</label>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>
        <div className="social-login">
          <p>or sign up with</p>
          <div className="social-buttons">
            <button className="google-btn">Google</button>
            <button className="apple-btn">Apple</button>
            <button className="facebook-btn">Facebook</button>
          </div>
        </div>
        <p>Don’t have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default Login;
