import { useState, useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';

const Navbar = ({ onLogout }) => {
  const [userType, setUserType] = useState(null);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const { navigateTo, setAuthType } = useNavigation();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userType');
    setUserType(null);
    if (onLogout) {
      onLogout();
    } else {
      navigateTo('landing', { replace: true });
    }
  };

  const handleLogoClick = () => {
    navigateTo('landing');
  };

  const handleAdminClick = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  const handleAdminAuth = (authType) => {
    setAuthType(authType); // Set the specific auth type
    navigateTo('auth', { authType: authType });
    setShowAdminDropdown(false);
  };

  const handleSignIn = () => {
    setAuthType('user-signin');
    navigateTo('auth', { authType: 'user-signin' });
  };

  const handleGetStarted = () => {
    setAuthType('user-signup');
    navigateTo('auth', { authType: 'user-signup' });
  };

  return (
    <nav className="bg-transparent px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between bg-transparent/0 items-center">
        <div className="nav-brand">
          <h1 
            className="logo " 
            onClick={handleLogoClick}>
            Courser
          </h1>
        </div>
        <div className="nav-menu flex items-center space-x-4">

          {/* Home Button */}
<button
  onClick={() => navigateTo('landing')}
  className="p-2 rounded-lg text-white hover:bg-white/10 hover:cursor-pointer transition-colors"
  aria-label="Home"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m10-11v10a1 1 0 01-1 1h-5m-4 0h4"
    />
  </svg>
</button>

          {userType ? (
            <>
              <span className="text-gray-300 text-sm font-bold">
                Logged in as: <span className=" text-white uppercase font-extrabold">{userType}</span>
              </span>
              <button 
                onClick={handleLogout} 
                className="nav-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSignIn}
                className="nav-button"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="nav-button primary"
              >
                Get Started
              </button>
              
              {/* Admin Button */}
              <div className="relative">
                <button 
                  onClick={handleAdminClick}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm hover:from-purple-600 hover:to-pink-600 hover:cursor-pointer transition-all duration-200 shadow-lg">
                  A
                </button>
                
                {/* Admin Dropdown */}
                {showAdminDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-800/95 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-dropdown">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
                    
                    {/* Header with icon */}
                    <div className="relative px-4 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-white">Admin Portal</span>
                      </div>
                    </div>
                    
                    {/* Menu items with icons */}
                    <div className="relative p-2  space-y-1">
                      <button
                        onClick={() => handleAdminAuth('admin-signin')}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-white hover:cursor-pointer hover:bg-white/10 hover:translate-x-1 transition-all duration-200 rounded-lg group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600  rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium ">Sign In</div>
                          <div className="text-xs text-purple-300/70">Access your admin account</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleAdminAuth('admin-signup')}
                        className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-white hover:cursor-pointer hover:bg-white/10 hover:translate-x-1 transition-all duration-200 rounded-lg group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Sign Up</div>
                          <div className="text-xs text-purple-300/70">Create new admin account</div>
                        </div>
                      </button>
                    </div>
                    
                    {/* Footer accent */}
                    <div className="relative px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-t border-purple-500/20">
                      <div className="text-xs text-purple-300/70 text-center">
                        Secure admin access
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showAdminDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowAdminDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
