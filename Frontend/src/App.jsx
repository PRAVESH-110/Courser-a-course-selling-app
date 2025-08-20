import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Navbar from './Components/common/Navbar';
import Footer from './Components/common/Footer';
import LandingPage from './Components/LandingPage';
import UserSignup from './Components/auth/UserSignup';
import UserSignin from './Components/auth/UserSignin';
import AdminSignup from './Components/auth/AdminSignup';
import AdminSignin from './Components/auth/AdminSignin';
import CourseList from './Components/courses/CourseList';
import UserDashboard from './Components/dashboard/UserDashboard';
import AdminDashboard from './Components/dashboard/AdminDashboard';
import BackButton from './Components/common/BackButton';
import AnimatedBackground from './Components/AnimatedBg';  // ✅ Correct import

/* ----------------- AUTH LAYOUT ----------------- */
const AuthLayout = () => {
  const { navigateTo, authType } = useNavigation();

  const handleAuthSuccess = (token, userType) => {
    if (userType === 'admin') {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('userType', 'admin');
    } else {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userType', 'user');
    }
    navigateTo('main', { replace: true });
  };

  const handleSwitchAuth = (fromAuth, toAuth) => {
    navigateTo('auth', { authType: toAuth });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {authType === 'user-signin' && (
            <UserSignin 
              onSigninSuccess={(token) => handleAuthSuccess(token, 'user')} 
              onSwitchToSignup={() => handleSwitchAuth('user-signin', 'user-signup')}
            />
          )}
          {authType === 'user-signup' && (
            <UserSignup 
              onSignupSuccess={() => handleSwitchAuth('user-signup', 'user-signin')} 
              onSwitchToSignin={() => handleSwitchAuth('user-signup', 'user-signin')}
            />
          )}
          {authType === 'admin-signin' && (
            <AdminSignin 
              onSigninSuccess={(token) => handleAuthSuccess(token, 'admin')} 
              onSwitchToSignup={() => handleSwitchAuth('admin-signin', 'admin-signup')}
            />
          )}
          {authType === 'admin-signup' && (
            <AdminSignup 
              onSignupSuccess={() => handleSwitchAuth('admin-signup', 'admin-signin')} 
              onSwitchToSignin={() => handleSwitchAuth('admin-signup', 'admin-signin')}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ----------------- MAIN DASHBOARD ----------------- */
const MainDashboard = () => {
  const [userType, setUserType] = useState(null);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userType');
    navigateTo('landing', { replace: true });
  };

  const handleViewCourses = () => navigateTo('courses');
  const handleViewDashboard = () => navigateTo('dashboard');

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar onLogout={handleLogout} />
      
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            
            <h1 className="text-4xl font-bold text-white mb-4 ">Welcome to Courser</h1>
            <p className="text-xl text-gray-300">What would you like to do today?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/5 p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Browse Courses</h3>
              <p className="text-gray-300 mb-4">Explore our collection of available courses</p>
              <button
  onClick={handleViewCourses}
  className="relative px-6 py-2 rounded-lg font-semibold text-white 
             bg-slate-900/90 border-2 border-transparent 
             hover:bg-slate-900 hover:cursor-pointer transition-all duration-300
             before:absolute before:inset-0 before:rounded-lg 
             before:p-[2px] before:bg-gradient-to-r 
             before:from-indigo-500 before:to-purple-500 
             before:-z-10 before:blur-[2px] hover:before:blur-sm"
>
  View Courses
</button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                {userType === 'user' ? 'My Dashboard' : 'Admin Dashboard'}
              </h3>
              <p className="text-gray-300 mb-4">
                {userType === 'user' ? 'View your purchased courses' : 'Manage your created courses'}
              </p>
              <button onClick={handleViewDashboard} className="relative px-6 py-2 rounded-lg font-semibold text-white 
             bg-slate-900/90 border-2 border-transparent 
             hover:bg-slate-900 hover:cursor-pointer transition-all duration-300
             before:absolute before:inset-0 before:rounded-lg 
             before:p-[2px] before:bg-gradient-to-r 
             before:from-indigo-500 before:to-purple-500 
             before:-z-10 before:blur-[2px] hover:before:blur-sm">
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ----------------- COURSES PAGE ----------------- */
const CoursesPage = () => {
  const { navigateTo } = useNavigation();
  const handleBackToMain = () => navigateTo('main');

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          <CourseList onBack={handleBackToMain} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ----------------- DASHBOARD PAGE ----------------- */
const DashboardPage = () => {
  const [userType, setUserType] = useState(null);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

  const handleBackToMain = () => navigateTo('main');

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <BackButton />
          </div>
          {userType === 'user' ? (
            <UserDashboard onBack={handleBackToMain} />
          ) : (
            <AdminDashboard onBack={handleBackToMain} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ----------------- PROTECTED ROUTE ----------------- */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/" replace />;
  return children;
};

/* ----------------- LANDING PAGE ----------------- */
const LandingPageWrapper = () => {
  const { navigateTo } = useNavigation();
  const handleGetStarted = (authType) => navigateTo('auth', { authType });

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-grow">
        <LandingPage onGetStarted={handleGetStarted} />
      </div>
      <Footer />
    </div>
  );
};

/* ----------------- MAIN APP CONTENT ----------------- */
const AppContent = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated Background Layer */}
  <div id="bg-gradient" className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>

    <div id="ripple-overlay" className="absolute inset-0 -z-5 pointer-events-none"></div>

      <AnimatedBackground />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/auth" element={<AuthLayout />} />
        
        {/* Protected Routes */}
        <Route path="/main" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        
        {/* Redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

/* ----------------- APP ----------------- */
function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
