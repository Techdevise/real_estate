import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCog } from "react-icons/fa";

const AdminSidebar = ({ menu, toggleMenu }) => {
  return (
    <aside className="flex flex-col h-full bg-gray-800 text-gray-500">
      {/* Logo */}
      <button
        className="inline-flex items-center justify-center h-20 w-full bg-blue-600 hover:bg-blue-500"
        onClick={toggleMenu}
      >
        <span className="text-white text-3xl">{menu ? "Real_Esate" : "L"}</span>
      </button>

      {/* Navigation */}
      <nav className="flex flex-col mx-4 my-6 space-y-4 flex-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-lg ${
              isActive ? "bg-white text-blue-600" : "hover:bg-gray-700 text-gray-400"
            } ${menu ? "justify-start" : "justify-center"}`
          }
        >
          <FaTachometerAlt className="h-6 w-6" />
          {menu && <span className="ml-2">Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-lg ${
              isActive ? "bg-white text-blue-600" : "hover:bg-gray-700 text-gray-400"
            } ${menu ? "justify-start" : "justify-center"}`
          }
        >
          <FaUsers className="h-6 w-6" />
          {menu && <span className="ml-2">All Users</span>}
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-lg ${
              isActive ? "bg-white text-blue-600" : "hover:bg-gray-700 text-gray-400"
            } ${menu ? "justify-start" : "justify-center"}`
          }
        >
          <FaFileAlt className="h-6 w-6" />
          {menu && <span className="ml-2">Documents</span>}
        </NavLink>
      </nav>

      {/* Settings */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex items-center py-3 px-2 rounded-lg ${
            isActive ? "bg-white text-blue-600" : "hover:bg-gray-700 text-gray-400"
          } ${menu ? "justify-start" : "justify-center"}`
        }
      >
        <FaCog className="h-6 w-6" />
        {menu && <span className="ml-2">Settings</span>}
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;
