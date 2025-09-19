import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ListUser = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalRecords: 0,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch user from API
  const fetchUser = async (page = 1, search = "") => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user`, {
        params: {
          page: search ? 1 : page,
          limit: search ? 10000 : pagination.perPage,
          search: search || undefined,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setUser(response.data.data);
      if (!search) {
        setPagination(response.data.meta);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // initial load
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE_URL}/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          });
          toast.success("user deleted successfully!");
          fetchUser(pagination.currentPage, searchTerm);
          Swal.fire("Deleted!", "user has been deleted.", "success");
        } catch (error) {
          console.error("Delete failed:", error);
          toast.error("Failed to delete user");
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 1 ? 0 : 1;
    try {
      await axios.patch(
        `${API_BASE_URL}/api/user/${user.id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      toast.success("Status updated successfully");
      fetchUser(pagination.currentPage, searchTerm);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handlePageChange = (newPage) => {
    fetchUser(newPage, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchUser(1, value); // search always fetches from first page
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="2xl:text-2xl text-md font-semibold mb-6">All User</h2>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
        </div>
        {/* <Link
          to="/admin/user/add"
          className="text-white bg-gradient-to-r from-[#8763DC] to-[#B363E0] px-4 py-2 rounded-full hover:bg-gray-800 transition"
          style={{ whiteSpace: "nowrap" }}
        >
          Add user / Receptionist
        </Link> */}
      </div>

      <table className="w-full md:text-sm text-[10px] text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" md:text-xs text-[10px]  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3">SR.NO</th>
            <th className="px-2 py-3">Name</th>
            <th className="px-2 py-3">Email</th>
            <th className="px-2 py-3">Phone No</th>
            <th className="px-2 py-3">Booking Date</th>
            <th className="px-2 py-3">Booking Time</th>

            {/* <th className="px-2 py-3">Status</th> */}
            {/* <th className="px-2 py-3">Attendance</th> */}
            <th className="px-2 py-3">Image</th>
            {/* <th className="px-2 py-3">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {user.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                {searchTerm ? (
                  <span className="text-gray-500 text-lg">
                    No user found for "{searchTerm}"
                  </span>
                ) : (
                  <img
                    src="/oder.jpg"
                    alt=""
                    className="inline-block w-70 h-70"
                  />
                )}
              </td>
            </tr>
          ) : (
            user.map((user, index) => (
              <tr
                key={user.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-2 md:py-4 py-2 ">{index + 1}</td>

                <td className="px-2 md:py-4 py-2">{user.name}</td>
                <td className="px-2 md:py-4 py-2">{user.email}</td>
                <td className="px-2 md:py-4 py-2">{user.phone}</td>
                <td className="px-2 md:py-4 py-2">
                  {user.bookings?.length > 0 ? (
                    <ul>
                      {user.bookings.map((booking) => (
                        <li key={booking.id}>{booking.date}</li>
                      ))}
                    </ul>
                  ) : (
                    "No Booking"
                  )}
                </td>
                <td className="px-2 md:py-4 py-2">
                  {user.bookings?.length > 0 ? (
                    <ul>
                      {user.bookings.map((booking) => (
                        <li key={booking.id}>{booking.slots}</li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>
                {/* <td className="px-2 py-4">
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`px-3 py-1 rounded ${
                      user.status === 1 ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {user.status === 1 ? "Active" : "Inactive"}
                  </button>
                </td> */}
                {/* <td className="px-2 py-4">
                  <Link
                    to={`/admin/attendance/${user.id}`}
                    className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-600 hover:text-white transition duration-200"
                  >
                    List Attendance
                  </Link>
                </td> */}
                <td className="px-2 md:py-4 py-2 text-center">
                  {user.image ? (
                    <div className="flex justify-center">
                      <img
                        src={`${API_BASE_URL}${user.image}`}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  ) : (
                    "No Image"
                  )}
                </td>
                {/* <td className="px-2 md:py-4 py-2">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls (hide if searching) */}
      {!searchTerm && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListUser;
