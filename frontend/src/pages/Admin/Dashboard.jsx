import { FaPencilAlt, FaPlus, FaUsers, FaChartLine, FaClipboardList, FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [dashboardCounts, setDashboardCounts] = useState({
    totalUser: 0,
    averageMark: 0,
    underperforming: 0,
    underperformingPercent: 0,
    finishedHomework: 0,
    lectionsLeft: 0,
    hoursSpent: 0,
  });

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
          const data = res.data.data;
          setDashboardCounts({
            totalUser: data.userCount || 0,
            averageMark: data.avgMark || 0,
            underperforming: data.underperformingStudents || 0,
            underperformingPercent: data.underperformingPercent || 0,
            finishedHomework: data.finishedHomework || 0,
            lectionsLeft: data.lectionsLeft || 0,
            hoursSpent: data.hoursSpent || 0,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
        </div>
        {/* <div className="flex flex-wrap items-start justify-end -mb-3">
          <button className="inline-flex px-5 py-3 text-blue-600 hover:text-blue-700 focus:text-blue-700 hover:bg-blue-100 focus:bg-blue-100 border border-blue-600 rounded-md mb-3 items-center">
            <FaPencilAlt className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2" />
            Manage dashboard
          </button>
          <button className="inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-purple-700 focus:bg-blue-700 rounded-md ml-6 mb-3 items-center">
            <FaPlus className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2" />
            Create new dashboard
          </button>
        </div> */}
      </div>

      {/* Top stats cards */}
     <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <FaUsers className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {dashboardCounts.totalUser}
            </span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <FaChartLine className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {dashboardCounts.averageMark}
            </span>
            <span className="block text-gray-500">Average mark</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <FaClipboardList className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {dashboardCounts.underperforming}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold">
              ({dashboardCounts.underperformingPercent}%)
            </span>
            <span className="block text-gray-500">
              Underperforming students
            </span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <FaClock className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {dashboardCounts.finishedHomework}%
            </span>
            <span className="block text-gray-500">Finished homeworks</span>
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of applied and left students per month
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              Chart
            </div>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <FaClipboardList className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">25</span>
            <span className="block text-gray-500">Lections left</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <FaClock className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">139</span>
            <span className="block text-gray-500">Hours spent on lections</span>
          </div>
        </div>

        {/* Students by average mark */}
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Students by average mark</span>
            <button
              type="button"
              className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
            >
              Descending
              <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="p-6 space-y-6">
              {[
                { name: "Annette Watson", score: 9.3, img: "https://randomuser.me/api/portraits/women/82.jpg" },
                { name: "Calvin Steward", score: 8.9, img: "https://randomuser.me/api/portraits/men/81.jpg" },
                { name: "Ralph Richards", score: 8.7, img: "https://randomuser.me/api/portraits/men/80.jpg" },
                { name: "Bernard Murphy", score: 8.2, img: "https://randomuser.me/api/portraits/men/79.jpg" },
                { name: "Arlene Robertson", score: 8.2, img: "https://randomuser.me/api/portraits/women/78.jpg" },
                { name: "Jane Lane", score: 8.1, img: "https://randomuser.me/api/portraits/women/77.jpg" },
                { name: "Pat Mckinney", score: 7.9, img: "https://randomuser.me/api/portraits/men/76.jpg" },
                { name: "Norman Walters", score: 7.7, img: "https://randomuser.me/api/portraits/men/75.jpg" },
              ].map((student, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img src={student.img} alt={`${student.name} profile`} />
                  </div>
                  <span className="text-gray-600">{student.name}</span>
                  <span className="ml-auto font-semibold">{student.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Students by type of studying */}
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Students by type of studying</div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              Chart
            </div>
          </div>
        </div>
      </section>

      {/* <section className="text-right font-semibold text-gray-500">
        <a href="#" className="text-blue-600 hover:underline">
          Recreated on Codepen
        </a>{" "}
        with{" "}
        <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">
          Tailwind CSS
        </a>{" "}
        by Sinan AYDOĞAN,{" "}
        <a
          href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard"
          className="text-blue-600 hover:underline"
        >
          original design
        </a>{" "}
        made by Chili Labs and{" "}
        <a
          href="https://codepen.io/azrikahar/pen/abZzaga"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          abZzaga
        </a>
      </section> */}
    </div>
  );
};

export default Dashboard;
