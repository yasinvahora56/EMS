import logo from '../Images/logo.jpg';
import { Home, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ImProfile } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import { IoFingerPrint } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";

const SideNav = ({ toggleSidebar }) => {
  const [expended, setExpended] = useState(true);
  const navigate = useNavigate();

  const expend = () => {
    setExpended(!expended);
    toggleSidebar();
  };

  const logOutHandle = () => {
    enqueueSnackbar("LogOut Successfully 🎉", { variant: "success" });
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 h-screen z-50">
      <nav className={`h-full ${expended ? "w-56" : "w-20"} bg-gray-800 text-white shadow-lg flex flex-col transition-all duration-300`}>
        
        {/* Logo Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-600">
          <div className="flex items-center gap-3">
            {expended && <img src={logo} className="w-14 h-14 rounded-full" alt="Logo" />}
            {expended && (
              <div>
                <h1 className="font-bold text-lg">Yasin Vahora</h1>
                <p className="text-gray-400 text-sm">Owner</p>
              </div>
            )}
          </div>
          <button 
            className="text-white bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-600 transition-all" 
            onClick={expend}
          >
            {expended ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex-1 overflow-y-auto mt-4 space-y-1">
          <li>
            <Link to="/admin/dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <Home className="w-5 h-5" />
              {expended && <span className="font-medium">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/employee" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <User className="w-5 h-5" />
              {expended && <span className="font-medium">Employee</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/attandance" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <IoFingerPrint className="w-5 h-5" />
              {expended && <span className="font-medium">Attendance</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/leave" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <SlCalender className="w-5 h-5" />
              {expended && <span className="font-medium">Leave</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/payroll" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <GiTakeMyMoney className="w-5 h-5" />
              {expended && <span className="font-medium">Payroll</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/profile" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <ImProfile className="w-5 h-5" />
              {expended && <span className="font-medium">Profile</span>}
            </Link>
          </li>
        </ul>

        {/* Logout Button (Sticky Bottom) */}
        <div className="p-4 mt-auto border-t border-gray-600">
          <button 
            className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-red-600 transition-all ml-2" 
            onClick={logOutHandle}
          >
            <LogOut className="w-5 h-5" />
            {expended && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-600 text-sm text-center">
          <p>© 2025 {expended && "Yasin Vahora"}</p>
        </div>
      </nav>
    </aside>
  );
};

export default SideNav;
