// src/components/QRScannerScreen.jsx
import React from 'react';
import Layout from '../layout/Index';
import { Link } from 'react-router-dom';
import QRScanner from "/qrscaner.png";
const QRScannerScreen = () => {
  return (
    <Layout>
        <Link to={'/property'}>
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="flex items-center justify-between w-full mb-8">
          {/* Your Logo (Small) */}
          <div className="w-8 h-8 bg-black rounded-lg rotate-45"></div>
          <h2 className="text-xl font-bold text-gray-800">Scan QR Code</h2>
          <div className="w-8 h-8"></div> {/* Spacer */}
        </div>
        
        {/* QR Code Placeholder */}
        <div className="w-64 h-64 bg-white border-4 border-blue-500 flex items-center justify-center shadow-lg">
          <img src={QRScanner} alt="" className='w-60 h-60 bg-gray-200' />
        </div>
      </div>
      </Link>
    </Layout>
  );
};

export default QRScannerScreen;