import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { useNavigation } from '../../contexts/NavigationContext';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { navigateTo } = useNavigation();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/course/preview');
      setCourses(response.data.courses || []);
    } catch (error) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMain = () => {
    navigateTo('main');
  };

  if (loading) return (
    <div className="text-center py-8">
      <div className="text-lg text-gray-300">Loading courses...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-8">
      <div className="text-lg text-red-400">{error}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-center mb-8 relative">
        <button
          onClick={handleBackToMain}
          className="absolute left-0 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Main</span>
        </button>
        <h2 className="text-3xl font-bold text-white">Available Courses</h2>
      </div>
      
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-300 text-lg">No courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
