// src/components/UserDetailForm.jsx
import React from "react";
import Layout from "../layout/Index";
import { Link } from "react-router-dom";
import UserIcon from "/UserIcon.png";
const UserDetailForm = () => {
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl font-bold text-center mb-6">User Detail</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6 bg">
          <img
            src={UserIcon}
            alt="User"
            className="w-24 h-24 rounded-full object-cover mb-2 bg-gray-200 p-2"
          />
          <p className="text-sm text-gray-600">User Photo (Optional)</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="mt-1 py-3 block pl-2 w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
            ></textarea>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
          <Link
            to={"/"}
            className="w-full sm:w-1/2 border text-center border-gray-400 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            GO BACK
          </Link>
          <Link
            to={"/schedule"}
            type="submit"
            className="w-full text-center sm:w-1/2 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            SCHEDULE NOW
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetailForm;
