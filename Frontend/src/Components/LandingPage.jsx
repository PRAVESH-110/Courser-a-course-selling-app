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
          <p className="text-xl md:text-2xl text-gray-300 mb-10  mx-auto  leading-relaxed ">
            Create, sell, and manage your online courses with Courser. 
            <span className="text-purple-400  font-semibold"><i> Free of cost.</i></span>
          </p> 

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => handleGetStarted('user-signup')}
className="px-3 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-roboto font-semibold
text-lg rounded-full hover:from-purple-700 border-black  hover:to-blue-700 transform hover:scale-105
transition-all duration-300 shadow-2xl hover:shadow-[0_0_25px_white] cursor-pointer"

            >
              Start Creating 
            </button>
            
          </div>

          {/* Features Grid */}
          <div className="flex justify-center items-center gap-8 max-w-5xl mx-auto">
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
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
