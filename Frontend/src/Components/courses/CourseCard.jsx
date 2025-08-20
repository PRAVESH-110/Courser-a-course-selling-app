import { useState } from 'react';
import axios from 'axios';
import Popup from '../common/Popup';

const CourseCard = ({ course }) => {
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [popup, setPopup] = useState({ isVisible: false, message: '', type: 'info' });

  const handleCourseClick = () => {
    setPopup({
      isVisible: true,
      message: 'Coming Soon! Course content will be available here.',
      type: 'info'
    });
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setPopup({
        isVisible: true,
        message: 'Please sign in to purchase courses',
        type: 'warning'
      });
      return;
    }

    setPurchasing(true);
    try {
      await axios.post('http://localhost:3000/api/v1/course/purchase', 
        { courseId: course._id },
        { 
          headers: { 
            'Authorization': `Bearer ${token}` 
          } 
        }
      );
      setPurchased(true);
      setPopup({
        isVisible: true,
        message: 'Course purchased successfully!',
        type: 'success'
      });
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
          message: 'Failed to purchase course. Please try again.',
          type: 'error'
        });
      }
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={handleCourseClick}
      >
        <div className="course-image">
          <img 
            src={course.imageURL || 'https://via.placeholder.com/300x200'} 
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
          <div className="text-2xl font-bold text-green-600 mb-4">${course.price}</div>
          <button 
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              purchased 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : purchasing 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
            onClick={handlePurchase}
            disabled={purchasing || purchased}
          >
            {purchased ? 'Purchased' : purchasing ? 'Purchasing...' : 'Purchase Course'}
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

export default CourseCard;
