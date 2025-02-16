import logo from '../Images/logo.jpg';
import { Home, User, Settings, LogOut } from 'lucide-react';
import { Link, Navigate } from "react-router-dom";
import Profile from '../Profile/Profile';
import { useState } from 'react';
import Setting from '../Images/Setting_Line.png'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

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
      <nav className={`h-full ${expended ? "w-55" : "w-20"} sidebar flex flex-col bg-gradient-to-b from-gray-500 to-gray-500 text-white shadow-lg`}>
        {/* Logo Section */}
          
        <div className="p-4 pb-6 flex justify-between items-center border-b border-blue-300">
            <div className='flex flex-row gap-2'>
          {expended && <img src={logo} className="w-10 h-10 rounded-full" alt="Logo" />}
          {expended && <div className='flex flex-col '>
          <h1 className='font-bold'>Yasin Vahora</h1>
          <p className='font-thin'>Devloper</p>
          </div>
        }
          </div>
<button className={`text-white hover:text-gray-200 transition-all cursor-pointer ${!expended && "absolute top-2 left-6.5"}`} onClick={() => setExpended(!expended)}>
            {/* <span className="sr-only">Close Sidebar</span> */}
            {expended ? "✕" : "☰" }
          </button>
          
        </div>


        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 space-y-2 px-4">
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 transition-all">
            <Home className="w-5 h-5" />
            {expended && <Link to="/Dashboard" className="font-medium">Home</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 transition-all">
            <User className="w-5 h-5" />
            {expended && <Link to="/Profile" className="font-medium">Profile</Link>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 transition-all">
            <Settings className="w-5 h-5" />
            {expended && <span className="font-medium">Settings</span>}
          </li>
          <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 transition-all">
            <LogOut className="w-5 h-5" />
            {expended && <button className="font-medium cursor-pointer">Logout</button>}
          </li>
        </ul>

        {/* Footer Section */}
        <div className="mt-auto p-4 border-t border-blue-300 text-sm text-center">
          <p>© 2025 Yasin Vahora</p>
        </div>
      </nav>
    </aside>
  );
};

export default SideNav;
