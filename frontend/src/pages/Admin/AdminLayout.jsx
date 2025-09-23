import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./Common/Sidebar";
import AdminHeader from "./Common/Header";

const AdminLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null); // store login user
  const [dashboardCounts, setDashboardCounts] = useState({}); // store counts
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && res.data.data) {
          setUserData(res.data.data.loginUser); // 👈 save logged in user
          setDashboardCounts({
            totalUser: res.data.data.userCount, // 👈 fix spelling & map count
          });
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        navigate("/admin/login");
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL, navigate]);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } transition-width duration-300 flex-shrink-0`}
      >
        <AdminSidebar
          menu={sidebarOpen}
          toggleMenu={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with user info */}
        <AdminHeader
          userData={userData}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayouts;
