import { useEffect, useState } from "react";
import { LogIn, Coffee, LogOut, Clock, Calendar } from "lucide-react";
import { MdOutlineTimerOff, MdTask } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const UserDashBoard = () => {
  const [dataTime, setDateTime] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState('');
  const [currentStatus, setCurrentStatus] = useState('Not Started');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setDateTime(`${date} | ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setCurrentStatus("Check-in")
    localStorage.setItem('checkInTimestamp', now.getTime().toString());
  };

  const handleBreak = () => {
    const now = new Date();
    setBreakTime(now.toLocaleTimeString());
    setCurrentStatus("Break")
    localStorage.setItem('breakTimestamp', now.getTime().toString());
  };

  const handleBreakEnd = () => {
    const now = new Date();
    setBreakEndTime(now.toLocaleTimeString());
    setCurrentStatus("Check-in")
    localStorage.setItem('breakEndTimestamp', now.getTime().toString());
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now.toLocaleTimeString());
    setCurrentStatus("Check-Out")
    calculateTotalHours(now.getTime());
  };

  const calculateTotalHours = (checkOutTimestamp) => {
    const checkInTimestamp = parseInt(localStorage.getItem('checkInTimestamp') || '0');
    const breakTimestamp = parseInt(localStorage.getItem('breakTimestamp') || '0');
    const breakEndTimestamp = parseInt(localStorage.getItem('breakEndTimestamp') || '0');

    if (!checkInTimestamp) {
      setTotalWorkingHours('Please check in first');
      return;
    }

    let totalWorkDuration = checkOutTimestamp - checkInTimestamp;

    if (breakTimestamp && breakEndTimestamp) {
      const breakDuration = breakEndTimestamp - breakTimestamp;
      totalWorkDuration -= breakDuration;
    }

    const hours = Math.floor(totalWorkDuration / (1000 * 60 * 60));
    const minutes = Math.floor((totalWorkDuration % (1000 * 60 * 60)) / (1000 * 60));

    setTotalWorkingHours(`${hours}h ${minutes}m`);
  };

  const TodayTasks = [
    {
      task: "Meeting With Your Senior",
      priority: "high"
    },
    {
      task: "Taking Interview of New Employees",
      priority: "medium"
    },
    {
      task: "Complete Pending Work from Yesterday",
      priority: "low"
    },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Employee Dashboard</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <Calendar className="mr-2 w-5 h-5" />
              <span className="text-lg">{dataTime}</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center">
            <div className={`
              rounded-full px-4 py-2 flex items-center gap-2 shadow-md
              ${currentStatus === "Check-in" ? "bg-green-500 text-white" : 
                currentStatus === "Break" ? "bg-amber-500 text-white" : 
                currentStatus === "Check-Out" ? "bg-red-500 text-white" : 
                "bg-gray-300 text-gray-700"
              }
            `}>
              <span className="font-semibold">{currentStatus}</span>
              <FaCircle className="animate-pulse" />
            </div>
          </div>
        </div>

        {/* Time Tracking Grid */}
        <div className="grid md:grid-cols-5 gap-6 mb-10">
          {[
            { 
              title: "Check In", 
              time: checkInTime, 
              icon: <LogIn className="w-8 h-8" />, 
              onClick: handleCheckIn,
              bgColor: "bg-blue-100",
              textColor: "text-blue-800"
            },
            { 
              title: "Break", 
              time: breakTime, 
              icon: <Coffee className="w-8 h-8" />, 
              onClick: handleBreak,
              bgColor: "bg-amber-100",
              textColor: "text-amber-800"
            },
            { 
              title: "Break End", 
              time: breakEndTime, 
              icon: <MdOutlineTimerOff className="w-8 h-8" />, 
              onClick: handleBreakEnd,
              bgColor: "bg-green-100",
              textColor: "text-green-800"
            },
            { 
              title: "Check Out", 
              time: checkOutTime, 
              icon: <LogOut className="w-8 h-8" />, 
              onClick: handleCheckOut,
              bgColor: "bg-red-100",
              textColor: "text-red-800"
            },
            { 
              title: "Total Working Hours", 
              time: totalWorkingHours, 
              icon: <Clock className="w-8 h-8" />, 
              bgColor: "bg-purple-100",
              textColor: "text-purple-800"
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`
                ${item.bgColor} ${item.textColor} 
                rounded-xl shadow-md p-6 transform transition-all 
                hover:scale-105 hover:shadow-lg
              `}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-semibold mb-2">{item.title}</h2>
                  <p className="text-2xl font-bold">{item.time || '-'}</p>
                </div>
                {item.onClick ? (
                  <button 
                    onClick={item.onClick} 
                    className={`
                      ${item.textColor} bg-white rounded-full p-3 
                      hover:bg-opacity-80 transition-all
                    `}
                  >
                    {item.icon}
                  </button>
                ) : (
                  <div className={`${item.textColor} opacity-70`}>
                    {item.icon}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <MdTask className="mr-3 text-blue-500" />
            Today's Tasks
          </h2>
          <div className="space-y-4">
            {TodayTasks.map((task, index) => (
              <div 
                key={index} 
                className={`
                  ${getPriorityColor(task.priority)} 
                  px-4 py-3 rounded-lg flex justify-between items-center
                  hover:shadow-md transition-all
                `}
              >
                <span className="font-medium">{task.task}</span>
                <span className="text-sm capitalize font-semibold">
                  {task.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;