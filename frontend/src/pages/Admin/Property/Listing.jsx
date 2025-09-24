import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/property`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setProperties(response.data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="2xl:text-2xl text-md font-semibold mb-6">
          All Properties
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full md:text-[12px] text-[8px] text-center text-gray-500 dark:text-gray-400">
          <thead className="md:text-[12px] text-[8px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th className="px-2 py-3">SR.NO</th>
              <th className="px-2 py-3">ParcelId</th>
              <th className="px-2 py-3">Owner Name</th>
              <th className="px-2 py-3">Area</th>
              <th className="px-2 py-3">Location</th>
              <th className="px-2 py-3">Latitude</th>
              <th className="px-2 py-3">Longitude</th>
              <th className="px-2 py-3">Zoning</th>
              <th className="px-2 py-3">Use Code</th>
              <th className="px-2 py-3">Description</th>
              <th className="px-2 py-3">Legal Description</th>
              <th className="px-2 py-3">Block</th>
              <th className="px-2 py-3">City</th>
              <th className="px-2 py-3">State</th>
              <th className="px-2 py-3">Zip Code</th>
              <th className="px-2 py-3">Building Count</th>
              <th className="px-2 py-3">Building Area</th>
              {/* <th className="px-2 py-3">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="18" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan="18" className="text-center py-4">
                  <img
                    src="/oder.jpg"
                    alt="No properties"
                    className="inline-block w-70 h-70"
                  />
                  <p>No properties found.</p>
                </td>
              </tr>
            ) : (
              properties.map((pro, index) => (
                <tr
                  key={pro.id}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{pro.parcelId}</td>
                  <td className="px-2 py-2">{pro.ownerName}</td>
                  <td className="px-2 py-2">{pro.area}</td>
                  <td className="px-2 py-2">{pro.location}</td>
                  <td className="px-2 py-2">{pro.latitude}</td>
                  <td className="px-2 py-2">{pro.longitude}</td>
                  <td className="px-2 py-2">{pro.zoning}</td>
                  <td className="px-2 py-2">{pro.useCode}</td>
                  <td className="px-2 py-2">{pro.useDescription}</td>
                  <td className="px-2 py-2">{pro.legalDescription}</td>
                  <td className="px-2 py-2">{pro.block}</td>
                  <td className="px-2 py-2">{pro.city}</td>
                  <td className="px-2 py-2">{pro.state}</td>
                  <td className="px-2 py-2">{pro.zipCode}</td>
                  <td className="px-2 py-2">{pro.buildingCount}</td>
                  <td className="px-2 py-2">{pro.buildingArea}</td>
                  {/* <td className="px-2 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(pro)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {pro.status === 1 ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => handleDelete(pro.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProperty;
