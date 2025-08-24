import { useNavigation } from '../contexts/NavigationContext';

const LandingPage = () => {
  const { navigateTo, setAuthType } = useNavigation();

  const handleGetStarted = (authType) => {
    setAuthType(authType);
    navigateTo('auth', { authType: authType });
  };

  return (
<div className="min-h-screen py-4 flex flex-col">      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div className="text-center  max-w-7xl">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-2 leading-tight ">
            Launch Your Course
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-6  mx-auto  leading-relaxed ">
            Create, sell, and manage your online courses with Courser. 
            <span className="text-purple-400  font-semibold"><i> Free of cost.</i></span>
          </p> 

          {/* Features Section */}
          <div className="flex justify-center items-center gap-8 mt-8 max-w-5xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/10 transition-all duration-300 flex-1 max-w-xs font-sans-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Course Creation</h3>
              <p className="text-gray-400 font-inter">Create professional courses with our intuitive interface. No technical skills required.</p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/10 transition-all duration-300 flex-1 max-w-xs font-sans-800">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Platform</h3>
              <p className="text-gray-400">Start selling your courses immediately. No setup fees, no monthly costs.</p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/10 transition-all duration-300 flex-1 max-w-xs font-sans-800">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics & Insights</h3>
              <p className="text-gray-400">Track your course performance and student engagement with detailed analytics.</p>
            </div>
          </div>

          {/* User Role Explanation */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-10 mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Choose Your Role</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Admin Section */}
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Creator</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Create and manage your own courses. Share your knowledge with the world and build your teaching brand.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 mb-4">
                  <li>• Create unlimited courses</li>
                  <li>• Track student progress</li>
                  <li>• Earn from your expertise</li>
                </ul>
              </div>

              {/* User Section */}
              <div className="text-left">
                <div className="flex items-center mb-4 ">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Learner</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Discover and enroll in courses to expand your skills and knowledge from expert instructors.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 mb-4">
                  <li>• Browse diverse course catalog</li>
                  <li>• Learn at your own pace</li>
                  <li>• Access course materials anytime</li>
                </ul>
              </div>
            </div>

            {/* Authentication Requirements */}
            <div className="bg-purple-900/20 border border-purple-400/30 rounded-3xl p-4 mb-6">
              <p className="text-purple-300 text-sm font-medium">
                💡 <span className="font-semibold">Important:</span> Dont forget to signin to create/ access courses
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleGetStarted('admin-signup')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold
                text-lg rounded-full hover:from-purple-700 hover:to-purple-800 transform hover:scale-105
                transition-all duration-300 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
              >
                Create Courses (Admin)
              </button>
              
              <button 
                onClick={() => handleGetStarted('user-signin')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold
                text-lg rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105
                transition-all duration-300 shadow-lg hover:shadow-blue-500/25 cursor-pointer"
              >
                Browse Courses (User)
              </button>
            </div>

            {/* Additional Auth Options */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center text-sm text-gray-400">
              <span>Already have an account?</span>
              <button 
                onClick={() => handleGetStarted('admin-signin')}
                className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                Admin Sign In
              </button>
              <span>•</span>
              <button 
                onClick={() => handleGetStarted('user-signin')}
                className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                User Sign in
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
