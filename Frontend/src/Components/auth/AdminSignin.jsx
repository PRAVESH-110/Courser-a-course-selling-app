import { useState } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';

const AdminSignin = ({ onSigninSuccess, onSwitchToSignup }) => {
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
      const response = await axios.post('http://localhost:3000/api/v1/admin/signin', formData);
      setPopup({
        isVisible: true,
        message: 'Admin sign in successful!',
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

  return (
    <>
      <div className="auth-form ">
        <h2>Admin Sign In</h2>
        <p>Access your admin account</p>
        
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
              placeholder="Enter your admin email"
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
              placeholder="Enter your admin password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Signing In...' : 'Sign In as Admin'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button className="btn-secondary">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M24 9.5c3.5 0 6.1 1.5 7.5 2.8l5.6-5.6C33.6 3.1 29.1 1 24 1 14.9 1 7.1 6.6 3.6 14.5l6.7 5.2C11.9 13 17.4 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.6c-.5 2.7-2 5-4.2 6.6l6.6 5.1c3.9-3.6 6.5-9 6.5-15.7z"/>
    <path fill="#FBBC05" d="M10.3 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-6.7-5.2C2.6 16.8 1.5 20.2 1.5 24s1.1 7.2 2.9 9.9l6.7-5.2z"/>
    <path fill="#EA4335" d="M24 46.5c6.1 0 11.3-2 15.1-5.5l-6.6-5.1c-2 1.3-4.6 2.1-8.5 2.1-6.6 0-12.2-4.5-14.2-10.7l-6.7 5.2C7.1 41.4 14.9 46.5 24 46.5z"/>
  </svg>
  Sign in with Google
</button>
        
        <div className="text-center mt-6">
          <span className="text-gray-400">Don't have an admin account? </span>
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

export default AdminSignin;
