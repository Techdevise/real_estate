// src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Top Bar with Time */}
      {/* <div className="w-full bg-white p-2 text-right text-sm text-gray-500 border-b border-gray-200">
        10:02 PM
      </div> */}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;