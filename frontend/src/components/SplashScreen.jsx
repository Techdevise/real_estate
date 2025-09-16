// src/components/SplashScreen.jsx
import React from 'react';
import Layout from '../layout/Index';
import { Link } from 'react-router-dom';
import Logo from "/logo.png";
const SplashScreen = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        {/* Logo Placeholder */}
        <div className="w-24 h-24 bg-red-600 flex items-center justify-center rounded-lg rotate-45 mb-4">
          {/* <div className="w-12 h-12 bg-white rounded-lg"></div> */}
          <img src={Logo} alt=""  className='w-12 h-12 bg-white rounded-lg'/>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Logo Here</h1>
        <p className="text-sm text-gray-600 mb-8 max-w-xs">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <Link to={"/scan"} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300">
          SCAN QR CODE
        </Link>
      </div>
    </Layout>
  );
};

export default SplashScreen;