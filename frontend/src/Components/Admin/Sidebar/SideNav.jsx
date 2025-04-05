import { BACKEND_URL, token } from '../../../config/config';
import { Home, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ImProfile } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import { IoFingerPrint } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { handleError } from '../../../../utils';

const SideNav = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [expended, setExpended] = useState(true);
  const [adminData, setAdminData] = useState({})

  const fetchAdminData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/profile/myProfile`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()
      if(response.ok){
        setAdminData({
          name: data.employeeData.name || "Guest",
          designation: data.employeeData.designation || "Not Available"
        })
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const expend = () => {
    setExpended(!expended);
    toggleSidebar();
  };

  const logOutHandle = (e) => {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('id')
      localStorage.removeItem('role')
      handleError('Admin Logout')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }

  return (
    <aside className="fixed top-0 h-screen z-50">
      <nav className={`h-full ${expended ? "w-56" : "w-20"} bg-gray-800 text-white shadow-lg flex flex-col transition-all duration-300`}>
        
        {/* Logo Section */}
        <div className="p-4 flex justify-between items-center border-b border-gray-600">
          <div className="flex items-center gap-3">
            {/* {expended && <img src={logo} className="w-14 h-14 rounded-full" alt="Logo" />} */}
            {expended && (
              <div>
                <h1 className="font-bold text-lg">{adminData.name}</h1>
                <p className="text-gray-400 text-sm">{adminData.designation}</p>
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
            <Link to="dashboard" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <Home className="w-5 h-5" />
              {expended && <span className="font-medium">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="employee" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <User className="w-5 h-5" />
              {expended && <span className="font-medium">Employee</span>}
            </Link>
          </li>
          <li>
            <Link to="attandance" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <IoFingerPrint className="w-5 h-5" />
              {expended && <span className="font-medium">Attendance</span>}
            </Link>
          </li>
          <li>
            <Link to="leave" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <SlCalender className="w-5 h-5" />
              {expended && <span className="font-medium">Leave</span>}
            </Link>
          </li>
          <li>
            <Link to="payroll" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
              <GiTakeMyMoney className="w-5 h-5" />
              {expended && <span className="font-medium">Payroll</span>}
            </Link>
          </li>
          <li>
            <Link to="profile" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all ml-2">
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
