// src/components/PropertyDetail.jsx
import React from "react";
import Layout from "../layout/Index";
import { Link } from "react-router-dom";

const PropertyDetail = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        {/* Main Property Image */}
        <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-4">
          <img
            src="https://media.istockphoto.com/id/1567429058/photo/landscaping-on-middleclass-homes-aerial-neighborhood-fresh-cut-lawns.jpg?s=612x612&w=0&k=20&c=XnYq0Vcl34LsM2V4Jto2_4rZSaDWwSGqW5-oSOHWz-s="
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-20">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslWSpgkIcc4R36vMgTW0iTN37UDI2QUSL9DByR6P1a2mBo7spQLBSz0uf2nKMfNYFAF8&usqp=CAU"
                alt={`Image ${i}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Property Info List */}
        <div className="space-y-3 text-sm text-gray-700 mb-6">
          <p>
            <strong>Lot Size:</strong> 1200x1500
          </p>
          <p>
            <strong>Parcel ID:</strong> 1234567
          </p>
          <p>
            <strong>Owner Contact Number:</strong> 123456789
          </p>
          <p>
            <strong>Agent Contact Number:</strong> +1 123456789
          </p>
          <p>
            <strong>Legal Description:</strong> Lorem ipsum is simply dummy text
            of the printing and typesetting industry.
          </p>
          <p>
            <strong>Land Zoning:</strong> Residential
          </p>
          <p>
            <strong>Nearby Landmarks:</strong> New York City
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center items-center gap-4 mt-8">
          <Link
            to={"/user-detail"}
            className="w-full sm:w-1/2 border text-center border-red-600 text-red-600 font-bold py-3 px-3 rounded-lg hover:bg-red-50 transition duration-300"
          >
            ENQUIRE NOW
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
