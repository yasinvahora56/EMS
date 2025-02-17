import logo from '../Images/logo.jpg';
import { Home, User, Settings, LogOut } from 'lucide-react';
import { Link, Navigate } from "react-router-dom";
import Profile from '../Profile/Profile';
import { useState } from 'react';
import Setting from '../Images/Setting_Line.png'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import { IoFingerPrint } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import Employee from '../Employee/Employee';

const SideNav = ({ toggleSidebar }) => {

  const [expended, setExpended] = useState(true);
  const navigate = useNavigate();

  const expend = () => {
    setExpended(!expended);
    toggleSidebar();
  }

  const   logOutHandle = () => {
    enqueueSnackbar("LogOut SuccessFully 🎉", {variant: "success"});
    navigate("/Dashboard")
  }

  return (
    <aside className="absolute top-0 h-screen">
      <nav className={`h-full ${expended ? "w-55" : "w-20"} sidebar flex flex-col bg-white text-black shadow-lg`}>
        {/* Logo Section */}
          
        <div className="p-4 pb-8 flex justify-between items-center border-b border-blue-300">
            <div className='flex flex-row gap-2'>
          {expended && <img src={logo} className="w-15 h-15 rounded-full" alt="Logo" />}
          {expended && <div className='flex flex-col '>
          <h1 className='font-bold text-2xl'>Yasin Vahora</h1>
          <p className='font-thin'>Devloper</p>
          </div>
        }
          </div>
<button className={`text-white bg-black px-2 py-1 rounded-full hover:text-gray-200 transition-all cursor-pointer ${!expended && "absolute top-2 left-5.5 "}`} onClick={() => setExpended(!expended)}>
            {/* <span className="sr-only">Close Sidebar</span> */}
            {expended ? "✕" : "☰" }
          </button>
          
        </div>


        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 space-y-2 px-4 ">
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <Home className="w-5 h-5" />
            {expended && <Link to="/Dashboard" className="font-medium">Dashboard</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <User className="w-5 h-5" />
            {expended && <Link to="/Employee" className="font-medium">Employee</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <IoFingerPrint className="w-5 h-5" />
            {expended && <Link to="/Attandance" className="font-medium">Attandance</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <SlCalender className="w-5 h-5" />
            {expended && <Link to="/Leave" className="font-medium">Leave</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <GiTakeMyMoney className="w-5 h-5" />
            {expended && <Link to="/Dashboard" className="font-medium">Payroll</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-black hover:text-white transition-all">
            <ImProfile className="w-5 h-5" />
            {expended && <Link to="/Profile" className="font-medium">Profile</Link>}
          </li>
        </ul>
          <li className="flex items-center space-x-3 p-2 absolute bottom-17 left-5 rounded-lg hover:bg-black hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            {expended && <button className="font-medium cursor-pointer">Logout</button>}
          </li>

        {/* Footer Section */}
        <div className="mt-auto p-4 border-t border-blue-300 text-sm text-center">
          <p>© 2025 {expended && "Yasin Vahora"}</p>
        </div>
      </nav>
    </aside>
  );
};

export default SideNav;
