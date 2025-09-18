import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import realeState from "/realeState.jpg";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("adminToken", token);

      toast.success("Login successful 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-3"
      style={{ backgroundImage: `url(${realeState})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 uppercase text-center text-green-500">
          Admin Login
        </h1>

        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200
          placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200
          placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold
          hover:bg-green-600 transition duration-300 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy={7} r={4} />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          Sign In
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
