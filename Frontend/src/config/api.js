// API Configuration
// Replace 'http://localhost:3000' with your deployed backend URL
export const API_BASE_URL = 'https://courser-a-course-selling-app.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  user: {
    signup: `${API_BASE_URL}/api/v1/user/signup`,
    signin: `${API_BASE_URL}/api/v1/user/signin`,
    purchases: `${API_BASE_URL}/api/v1/user/purchases`
  },
  admin: {
    signup: `${API_BASE_URL}/api/v1/admin/signup`,
    signin: `${API_BASE_URL}/api/v1/admin/signin`,
    courses: `${API_BASE_URL}/api/v1/admin/course/bulk`,
    createCourse: `${API_BASE_URL}/api/v1/admin/createcourse`,
    editCourse: `${API_BASE_URL}/api/v1/admin/editcourse`
  },
  course: {
    preview: `${API_BASE_URL}/api/v1/course/preview`,
    purchase: `${API_BASE_URL}/api/v1/course/purchase`
  },
  auth: {
    google: `${API_BASE_URL}/api/v1/auth/google`
  }
};
