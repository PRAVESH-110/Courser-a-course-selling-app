import { useState } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';
import { API_ENDPOINTS } from '../../config/api';
import { GoogleLogin } from '@react-oauth/google';

const UserSignin = ({ onSigninSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await axios.post(API_ENDPOINTS.user.signin, formData);
      setPopup({
        isVisible: true,
        message: 'Sign in successful!',
        type: 'success'
      });
      setTimeout(() => {
        onSigninSuccess(response.data.token);
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

  const handleGoogleSignin = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post(API_ENDPOINTS.auth.google, { token: credential });
      setPopup({
        isVisible: true,
        message: 'Sign in successful with Google!',
        type: 'success'
      });
      setTimeout(() => {
        onSigninSuccess(response.data.token);
      }, 1000);
    } catch (error) {
      setPopup({
        isVisible: true,
        message: 'Google sign-in failed. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <>
      <div className="auth-form ">
        <h2>User Sign In</h2>
        <p>Access your account</p>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <GoogleLogin
          onSuccess={handleGoogleSignin}
          onError={() => {
            setPopup({
              isVisible: true,
              message: 'Google sign-in failed. Please try again.',
              type: 'error'
            });
          }}
        />
        
        <div className="text-center mt-6">
          <span className="text-gray-700">Don't have an account? </span>
          <button 
            onClick={onSwitchToSignup}
            className="auth-link"
          >
            Sign Up
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

export default UserSignin;
