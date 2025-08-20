import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';
import { useNavigation } from '../../contexts/NavigationContext';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageURL: ''
  });

  const [popup, setPopup] = useState({ isVisible: false, message: '', type: 'info' });
  const { navigateTo } = useNavigation();

  const handleCourseClick = () => {
    setPopup({
      isVisible: true,
      message: 'Coming Soon! Course content will be available here.',
      type: 'info'
    });
  };

  useEffect(() => {
    fetchAdminCourses();
  }, []);

  const fetchAdminCourses = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/course/bulk', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      await axios.post('http://localhost:3000/api/v1/admin/createcourse', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPopup({
        isVisible: true,
        message: 'Course created successfully!',
        type: 'success'
      });
      setFormData({ title: '', description: '', price: '', imageURL: '' });
      setShowCreateForm(false);
      fetchAdminCourses();
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
          message: 'Failed to create course. Please try again.',
          type: 'error'
        });
      }
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      await axios.put('http://localhost:3000/api/v1/admin/editcourse', {
        ...formData,
        courseId: editingCourse._id
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPopup({
        isVisible: true,
        message: 'Course updated successfully!',
        type: 'success'
      });
      setFormData({ title: '', description: '', price: '', imageURL: '' });
      setEditingCourse(null);
      fetchAdminCourses();
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
          message: 'Failed to update course. Please try again.',
          type: 'error'
        });
      }
    }
  };

  const startEditing = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      imageURL: course.imageURL
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingCourse(null);
    setFormData({ title: '', description: '', price: '', imageURL: '' });
  };

  const handleBackToMain = () => {
    navigateTo('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
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
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-md hover:bg-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="dashboard-content">
            <div className="admin-actions mb-6 flex space-x-4">
              <button 
                onClick={() => {
                  setShowCreateForm(!showCreateForm);
                  if (editingCourse) {
                    setEditingCourse(null);
                    setFormData({ title: '', description: '', price: '', imageURL: '' });
                  }
                }}
                className="bg-blue-600/20 border border-blue-500/30 text-blue-400 px-6 py-2 rounded-md hover:bg-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
              >
                {showCreateForm ? 'Cancel' : 'Create New Course'}
              </button>
            </div>

            {(showCreateForm || editingCourse) && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </h3>
                <form onSubmit={editingCourse ? handleEditCourse : handleCreateCourse} className="space-y-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title:</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description:</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      className="form-input"
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Price:</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL:</label>
                    <input
                      type="url"
                      value={formData.imageURL}
                      onChange={(e) => setFormData({...formData, imageURL: e.target.value})}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      type="submit"
                      className="flex-1 bg-green-600/20 border border-green-500/30 text-green-400 py-2 px-4 rounded-md hover:bg-green-600/30 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
                    >
                      {editingCourse ? 'Update Course' : 'Create Course'}
                    </button>
                    {editingCourse && (
                      <button 
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            <div className="admin-courses">
              <h3 className="text-xl font-semibold text-white mb-4">My Created Courses</h3>
              {courses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300">You haven't created any courses yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <div 
                      key={course._id} 
                      className="bg-white/5 border border-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={handleCourseClick}
                    >
                      <div className="mb-3">
                        {course.imageURL && (
                          <img 
                            src={course.imageURL} 
                            alt={course.title}
                            className="w-full h-32 object-cover rounded-md mb-3"
                          />
                        )}
                      </div>
                      <h4 className="font-semibold text-white mb-2">{course.title}</h4>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{course.description}</p>
                      <p className="text-green-400 font-medium mb-3">Price: ${course.price}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent course click when editing
                          startEditing(course);
                        }}
                        className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-400 py-2 px-4 rounded-md hover:bg-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors text-sm"
                      >
                        Edit Course
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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

export default AdminDashboard;
