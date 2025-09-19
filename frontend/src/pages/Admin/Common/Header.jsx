import { FaBars, FaSearch, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar,userData  }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Token remove
    navigate("/admin/login"); // Redirect to login
  };

  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white relative">
      {/* Sidebar toggle */}
      <div className="mr-8 cursor-pointer" onClick={toggleSidebar}>
        <FaBars className="md:w-8 md:h-8 w-6 h-6" />
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md sm:-ml-2">
        <FaSearch className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400" />
        <input
          type="text"
          role="search"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 w-full border-2 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
        />
      </div>

      {/* User section */}
      <div className="flex flex-shrink-0 items-center ml-auto relative">
        <button
          className="relative inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="font-semibold">{userData?.name || "Admin"}</span>
            <span className="text-sm text-gray-600">{userData?.email || "Admin@example.com"}</span>
          </div>
          <span className="md:h-12 h-8 md:w-12 w-8 md:ml-2 sm:ml-3 md:mr-2 bg-gray-100 rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/68.jpg"
              alt="user profile"
              className="h-full w-full object-cover"
            />
          </span>
          <FaChevronDown className="hidden sm:block h-6 w-6 text-gray-300" />
        </button>

        {/* User panel dropdown */}
        {panelOpen && (
          <div className="absolute top-20 right-0 bg-white border border-gray-200 rounded-md p-2 w-56 shadow-lg z-50">
            <div className="p-2 hover:bg-blue-100 cursor-pointer">Profile</div>
            <div className="p-2 hover:bg-blue-100 cursor-pointer">Messages</div>
            <div
              className="p-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
