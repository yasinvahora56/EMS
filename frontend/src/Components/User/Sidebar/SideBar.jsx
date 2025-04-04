import asad_master from '../Images/asad_master.jpg';
import { Home, User, LogOut, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import { IoFingerPrint } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { handleError } from '../../../../utils';
import { ToastContainer } from 'react-toastify';

const SideBar = () => {
  const [expended, setExpended] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logdinUser, setLogdinUser] = useState('')
  const [userDesignation, setUserDesignation] = useState('')
  const navigate = useNavigate();

  // Check screen size and set mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close sidebar on desktop view
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    

    // Check on initial load
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobileView);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Guest";
    const storedDesignation = localStorage.getItem("designation") || "Not Available";

    setLogdinUser(storedName)
    setUserDesignation(storedDesignation)

  }, [])

  const logOutHandle = (e) => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('name')
    handleError('User Logout')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  

  const EmployeeData = [
    {
      id: 1,
      name: "Asad Master",
      designation: "Developer",
      logo: asad_master,
    },
  ]

  const NavLinks = [
    { 
      icon: <Home className="w-5 h-5 transition-transform group-hover:scale-110" />, 
      label: "Dashboard", 
      path: "dashBoard" 
    },
    { 
      icon: <SlCalender className="w-5 h-5 transition-transform group-hover:scale-110" />, 
      label: "Leave Request", 
      path: "leaveRequest" 
    },
    { 
      icon: <GiTakeMyMoney className="w-5 h-5 transition-transform group-hover:scale-110" />, 
      label: "Payroll", 
      path: "salary" 
    },
    { 
      icon: <ImProfile className="w-5 h-5 transition-transform group-hover:scale-110" />, 
      label: "Profile", 
      path: "profile" 
    }
  ];

  // Render desktop sidebar
  const renderDesktopSidebar = () => (
    <aside className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-40 ${expended ? "w-64" : "w-20"}`}>
      <nav className={`h-full bg-gradient-to-b from-gray-50 to-gray-100 shadow-2xl border-r border-gray-200 flex flex-col`}>
        {/* Logo Section */}
        <div className={`p-4 pb-8 flex items-center transition-all duration-300 ${expended ? "justify-between" : "justify-center"}`}>
          {EmployeeData.map((employee) => (
            <div key={employee.id} className={`flex transition-all duration-300 ${expended ? "flex-row gap-3 items-center" : "flex-col items-center"}`}>
              {expended && (
                <>
                  {/* <img 
                    src={employee.logo} 
                    className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-md" 
                    alt="Profile" 
                  /> */}
                  <div className='flex flex-col text-center'>
                    <h1 className='font-bold text-xl text-gray-800'>{logdinUser}</h1>
                    <p className='text-sm text-gray-500 font-light'>{userDesignation}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          
          <button 
            onClick={() => setExpended(!expended)} 
            className={`p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ${!expended ? "mx-auto" : ""}`}
            aria-label={expended ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {expended ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 space-y-2 px-4">
          {NavLinks.map((link, index) => (
            <li 
              key={index} 
              className="group"
            >
              <Link 
                to={link.path} 
                className={`
                  flex items-center space-x-3 p-3 rounded-lg 
                  transition-all duration-300 
                  ${expended ? "justify-start" : "justify-center"}
                  hover:bg-blue-500 hover:text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                `}
              >
                {link.icon}
                {expended && (
                  <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <button 
            onClick={logOutHandle}
            className={`
              flex items-center space-x-3 w-full p-3 rounded-lg 
              bg-red-50 text-red-600 hover:bg-red-500 hover:text-white
              transition-all duration-300 
              ${expended ? "justify-start" : "justify-center"}
            `}
          >
            <LogOut className="w-5 h-5" />
            {expended && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2025 {expended && "Yasin Vahora"}
          </p>
        </div>
      </nav>
    </aside>
  );

  // Render mobile sidebar
  const renderMobileSidebar = () => (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex justify-between items-center p-4">
        {EmployeeData.map((employee) => (
          <div key={employee.id} className="flex items-center space-x-3">
            <img 
              src={employee.logo} 
              className="w-10 h-10 rounded-full border-2 border-blue-500" 
              alt="Profile" 
            />
            <div>
              <h1 className='font-bold text-lg text-gray-800'>{logdinUser}</h1>
              <p className='text-xs text-gray-500 font-light'>{userDesignation}</p>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-blue-500 text-white"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`
          md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-xl 
          transition-transform duration-300 z-50
          ${mobileMenuOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="p-4">
          <ul className="space-y-2">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {link.icon}
                  <span className="font-medium text-gray-700">{link.label}</span>
                </Link>
              </li>
            ))}
            
            <li>
              <button 
                onClick={logOutHandle}
                className="flex items-center space-x-3 w-full p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Yasin Vahora
          </p>
        </div>
      </div>
      <ToastContainer/>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block">
        {renderDesktopSidebar()}
      </div>

      {/* Mobile Sidebar */}
      {renderMobileSidebar()}
    </>
  );
};

export default SideBar;