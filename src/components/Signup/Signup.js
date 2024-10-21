import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Signup.css';
import { register } from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, setStatus }) => {
      try {
        await register(values.firstname, values.lastname, values.email, values.password);
        setStatus({ success: 'Signup successful!' });
        
        // Clear form fields
        formik.resetForm();

        // Redirect after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setErrors({ submit: 'Signup failed. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign up</h1>
        <p>New bidders, fill in your details to get started with the auction.</p>

        {/* Display success or error messages */}
        {formik.status?.success && <p className="success-message">{formik.status.success}</p>}
        {formik.errors.submit && <p className="error-message">{formik.errors.submit}</p>}

        <form onSubmit={formik.handleSubmit}>
          <div className="input-field">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="error-message">{formik.errors.firstname}</div>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="error-message">{formik.errors.lastname}</div>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="signup-button" disabled={formik.isSubmitting}>
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
