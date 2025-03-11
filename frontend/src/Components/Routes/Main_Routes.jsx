// main_routes.js
import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../User/Signup/Signup";
import AdminRoutes from "./AdminRoutes";
import Dashboard from "../../Components/Admin/DashBoard/DashBoard"; // Assuming this component exists
import Employee from "../../Components/Admin/Employee/Employee";
import Attendance from "../../Components/Admin/Attendance/Attendance"; // Assuming this exists based on your nav
import Leave from "../../Components/Admin/Leave/Leave"; // Assuming this exists based on your nav
import Payroll from "../../Components/Admin/Salary/Payroll";
import Profile from "../../Components/Admin/Profile/Profile";
import UserRoutes from "./UserRoutes";
import UserDashBoard from "../User/UserDashBoard/UserDashBoard";
import LeaveReaquest from "../User/LeaveRequest/LeaveReaquest"
import Salary from "../User/Payroll/Salary";
import UserProfile from "../User/Profile/UserProfile";

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AdminRoutes />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "admin/employee",
        element: <Employee />
      },
      {
        path: "admin/attandance",
        element: <Attendance />
      },
      {
        path: "admin/leave",
        element: <Leave />
      },
      {
        path: "admin/payroll",
        element: <Payroll />
      },
      {
        path: "admin/profile",
        element: <Profile />
      },
      {
        path: "Dashboard", // For your logOutHandle navigation
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/home',
    element: <UserRoutes />,
    children: [
      {
        path: "", // ✅ Yaha "/" nahi likhna, sirf blank chhod do
        element: <UserDashBoard />
      },
      {
        path: "dashBoard", // ✅ Relative path banake likho
        element: <UserDashBoard />
      },
      {
        path: "leaveRequest",
        element: <LeaveReaquest />
      },
      {
        path: "salary",
        element: <Salary />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
    ]
  },
  {
    path: "*",
    element: <div>Page Not Found</div>
  }
]);

export default router;