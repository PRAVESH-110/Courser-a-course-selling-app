import { useState } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';
import { API_ENDPOINTS } from '../../config/api';
import { GoogleLogin } from '@react-oauth/google';

const UserSignup = ({ onSignupSuccess, onSwitchToSignin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ isVisible: false, message: '', type: 'info' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.user.signup, formData);
      setPopup({
        isVisible: true,
        message: 'User created successfully! Please sign in.',
        type: 'success'
      });
      setTimeout(() => {
        onSignupSuccess();
      }, 1000);
    } catch (error) {
      if (error.response?.data?.message) {
        setPopup({
          isVisible: true,
          message: error.response.data.message,
          type: 'error'
        });
      } else {
        setPopup({
          isVisible: true,
          message: 'Something went wrong. Please try again.',
          type: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post(API_ENDPOINTS.auth.google, { token: credential });
      setPopup({
        isVisible: true,
        message: 'User created successfully with Google!',
        type: 'success'
      });
      setTimeout(() => {
        onSignupSuccess();
      }, 1000);
    } catch (error) {
      setPopup({
        isVisible: true,
        message: 'Google sign-up failed. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <>
      <div className="auth-form">
        <h2>User Sign Up</h2>
        <p>Create your account</p>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName"><b>First Name</b></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName"><b>Last Name</b></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="form-input"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => {
            setPopup({
              isVisible: true,
              message: 'Google sign-in failed. Please try again.',
              type: 'error'
            });
          }}
        />
        
        <div className="text-center mt-6">
          <span className="text-gray-400">Already have an account? </span>
          <button 
            onClick={onSwitchToSignin}
            className="auth-link"
          >
            Sign In
          </button>
        </div>
      </div>
      
      <Popup
        isVisible={popup.isVisible}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, isVisible: false })}
      />
    </>
  );
};

export default UserSignup;
