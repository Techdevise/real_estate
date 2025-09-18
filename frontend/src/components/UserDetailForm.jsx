// src/components/UserDetailForm.jsx
import React, { useState } from "react";
import Layout from "../layout/Index";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "/UserIcon.png";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetailForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // handle file select
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]); // save file
    }
  };

  // handle input fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // handle form submit -> ADD user API hit
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("email", userData.email);
    formData.append("address", userData.address);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/add/user`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const userId = response.data.data.id;
    localStorage.setItem("user_id", userId);

    if (response.data.alreadyExists) {
      toast.info("User already exists, proceeding to schedule...");
    } else {
      toast.success("User Added Successfully!");
    }

    // redirect after success OR existing
    navigate("/schedule");
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("Failed to add user");
  }
};

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl font-bold text-center mb-6">User Detail</h2>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="fileInput" className="cursor-pointer relative">
            <img
              src={
                selectedImage ? URL.createObjectURL(selectedImage) : UserIcon
              }
              alt="User"
              className="w-24 h-24 rounded-full object-cover mb-2 bg-gray-200 p-2"
            />
          </label>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <p className="text-sm text-gray-600">User image (Optional)</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
              required
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
              value={userData.email}
              onChange={handleChange}
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
              required
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
              value={userData.address}
              onChange={handleChange}
              className="mt-1 py-3 pl-2 block w-full rounded-md border-gray-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] focus:border-red-500 focus:ring-red-500"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
            <Link
              to={"/"}
              className="w-full sm:w-1/2 border text-center border-gray-400 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              GO BACK
            </Link>
            <button
              type="submit"
              className="w-full text-center sm:w-1/2 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              SCHEDULE NOW
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UserDetailForm;
