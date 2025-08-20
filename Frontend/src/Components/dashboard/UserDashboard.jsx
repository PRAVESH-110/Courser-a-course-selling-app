import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '../../contexts/NavigationContext';
import { API_ENDPOINTS } from '../../config/api';

const UserDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { navigateTo } = useNavigation();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    const token = localStorage.getItem('userToken');
    
    if (!token) return;

    try {
      const response = await axios.get(API_ENDPOINTS.user.purchases, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.data.purchases || response.data.purchases.length === 0) {
      console.log("No purchases to show");
    }

      setPurchases(response.data.purchases);
    } catch (error) {
      setError('Failed to fetch purchases');
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMain = () => {
    navigateTo('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userType');
    navigateTo('landing', { replace: true });
  };

  if (loading) return (
    <div className="text-center py-8">
      <div className="text-lg text-gray-300">Loading dashboard...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-8">
      <div className="text-lg text-red-400">{error}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToMain}
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Main</span>
            </button>
            <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-md hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="dashboard-content">
          <div className="purchased-courses">
            <h3 className="text-xl font-semibold text-white mb-4">My Purchased Courses</h3>
            {purchases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-300">You haven't purchased any courses yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase._id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">Course ID: <span className="font-medium text-white">{purchase.courseId}</span></p>
                    <p className="text-sm text-gray-300">Purchased on: <span className="font-medium text-white">{new Date(purchase.createdAt).toLocaleDateString()}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
