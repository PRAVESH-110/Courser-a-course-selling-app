import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing');
  const [authType, setAuthType] = useState('user-signin'); // Track which auth form to show
  const navigate = useNavigate();
  const location = useLocation();

  // Update current page when location changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setCurrentPage('landing');
    } else if (path === '/auth') {
      setCurrentPage('auth');
    } else if (path === '/dashboard') {
      setCurrentPage('dashboard');
    } else if (path === '/courses') {
      setCurrentPage('courses');
    } else if (path === '/main') {
      setCurrentPage('main');
    }
  }, [location]);

  const navigateTo = (page, options = {}) => {
    const { addToHistory = true, replace = false, authType: newAuthType } = options;
    
    if (addToHistory && currentPage !== page) {
      setNavigationHistory(prev => [...prev, currentPage]);
    }
    
    setCurrentPage(page);
    
    // Set auth type if provided
    if (newAuthType) {
      setAuthType(newAuthType);
    }
    
    // Map page names to routes
    const routeMap = {
      'landing': '/',
      'auth': '/auth',
      'main': '/main',
      'dashboard': '/dashboard',
      'courses': '/courses'
    };
    
    const route = routeMap[page];
    if (route) {
      if (replace) {
        navigate(route, { replace: true });
      } else {
        navigate(route);
      }
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      navigateTo(previousPage, { addToHistory: false, replace: true });
    } else {
      // If no history, go to landing page
      navigateTo('landing', { addToHistory: false, replace: true });
    }
  };

  const canGoBack = () => {
    return navigationHistory.length > 0;
  };

  const clearHistory = () => {
    setNavigationHistory([]);
  };

  const value = {
    currentPage,
    navigationHistory,
    authType,
    setAuthType,
    navigateTo,
    goBack,
    canGoBack,
    clearHistory
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
