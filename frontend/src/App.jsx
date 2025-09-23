import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import QRScannerScreen from "./components/QRScannerScreen";
import PropertyDetail from "./components/PropertyDetail";
import UserDetailForm from "./components/UserDetailForm";
import ScheduleConfirmation from "./components/ScheduleConfirmation";
import { ToastContainer } from "react-toastify";
import AdminLayouts from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ListUser from "./pages/Admin/Users/Listing";
import Login from "./pages/Auth/Login";
import AdminPrivateRoute from "./context/AdminPrivateRoute";
import ListProperty from "./pages/Admin/Property/Listing";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/scan" element={<QRScannerScreen />} />
          <Route path="/propertys" element={<PropertyDetail />} />
          <Route path="/user-detail" element={<UserDetailForm />} />
          <Route path="/schedule" element={<ScheduleConfirmation />} />

           <Route path="/admin/login" element={<Login />} />
           <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                {" "}
                <AdminLayouts />
              </AdminPrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<ListUser />} />
            <Route path="property" element={<ListProperty />} />
          </Route>
        </Routes>

        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
