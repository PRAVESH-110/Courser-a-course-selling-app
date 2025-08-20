import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-sm mt-auto">

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Courser</h3>
            <p className="text-gray-400 text-sm">
              Your gateway to quality online education and skill development.
            </p>
          </div>
          
          
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/pravesh-dhakal-5b543a254/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 
             2.239 5 5 5h14c2.761 0 5-2.239 
             5-5v-14c0-2.761-2.239-5-5-5zm-11 
             19h-3v-10h3v10zm-1.5-11.268c-.966 
             0-1.75-.784-1.75-1.75s.784-1.75 
             1.75-1.75 1.75.784 
             1.75 1.75-.784 1.75-1.75 
             1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.87 
             0-2.157 1.462-2.157 
             2.971v5.696h-3v-10h2.881v1.367h.041c.401-.761 
             1.379-1.562 2.841-1.562 3.04 
             0 3.6 2.003 3.6 4.604v5.591z"/>
                </svg>
              </a>

              <a href="https://github.com/PRAVESH-110" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 
             12 0 5.303 3.438 9.8 8.205 
             11.387.6.113.82-.258.82-.577 
             0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 
             1.205.084 1.838 1.236 1.838 1.236 
             1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.931 
             0-1.311.469-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 
             0 0 1.008-.322 3.301 1.23.957-.266 
             1.983-.399 3.003-.405 1.02.006 
             2.047.139 3.006.405 2.291-1.552 
             3.297-1.23 3.297-1.23.655 1.653.242 
             2.873.119 3.176.77.84 1.235 1.91 
             1.235 3.221 0 4.609-2.807 5.628-5.479 
             5.922.43.372.823 1.102.823 2.222 
             0 1.606-.015 2.896-.015 3.286 
             0 .321.216.694.825.576 
             4.765-1.588 8.2-6.084 8.2-11.386 
             0-6.627-5.373-12-12-12z"/>
  </svg>
</a>
            </div>
          </div>
        </div>
        
        <div className="  mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Courser. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
