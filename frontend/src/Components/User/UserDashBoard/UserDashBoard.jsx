import { useEffect, useState } from "react";
import { LogIn, Coffee, LogOut } from "lucide-react";
import { MdOutlineTimerOff, MdTask } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const UserDashBoard = () => {
  const [dataTime, setDateTime] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${date} - ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setCurrentStatus("Check-in")
    // Store timestamp for calculation
    localStorage.setItem('checkInTimestamp', now.getTime().toString());
  };

  const handleBreak = () => {
    const now = new Date();
    setBreakTime(now.toLocaleTimeString());
    setCurrentStatus("Break")
    // Store timestamp for calculation
    localStorage.setItem('breakTimestamp', now.getTime().toString());
  };

  const handleBreakEnd = () => {
    const now = new Date();
    setBreakEndTime(now.toLocaleTimeString());
    setCurrentStatus("Check-in")
    // Store timestamp for calculation
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

    // If there was a break, subtract break duration
    if (breakTimestamp && breakEndTimestamp) {
      const breakDuration = breakEndTimestamp - breakTimestamp;
      totalWorkDuration -= breakDuration;
    }

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(totalWorkDuration / (1000 * 60 * 60));
    const minutes = Math.floor((totalWorkDuration % (1000 * 60 * 60)) / (1000 * 60));

    setTotalWorkingHours(`${hours}h ${minutes}m`);
  };

  const TodayTasks = [
    {
      task: "Meating With Your Senier"
    },
    {
      task: "Taking Interviwe of new Employees"
    },
    {
      task: "Give All the work completly of yesterday"
    },
  ]

  

 

  return (
    <div className="flex flex-col ml-70 mt-10">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Employee Dashboard <span className="text-2xl font-bold mb-6 text-center text-gray-800">({dataTime})</span>
        </h1>
        <div className="flex items-center justify-center mb-3 mx-3">
        <div className={`rounded-full text-xl text-white px-4 py-2 flex items-center gap-2 ${currentStatus === "Check-in" ? "bg-green-300 shadow-green-200" : ""} ${currentStatus === "Break" ? "bg-amber-300 shadow-amber-200" : ""} ${currentStatus === "Check-Out" ? "bg-red-300 shadow-red-200" : ""}`}>
          <h2>{currentStatus}</h2>
          <FaCircle />
        </div>
        </div>
      </div>
      <div className=""> 
        <div className="bg-white">
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
              <div>
                <h1 className="text-md font-semibold">Check In</h1>
                <p className="text-2xl font-bold">{checkInTime}</p>
              </div>
              <button onClick={handleCheckIn} className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">
                <LogIn />
              </button>
            </div>
            <div className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
              <div>
                <h1 className="text-md font-semibold">Break</h1>
                <p className="text-2xl font-bold">{breakTime}</p>
              </div>
              <button onClick={handleBreak} className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">
                <Coffee />
              </button>
            </div>
            <div className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
              <div>
                <h1 className="text-md font-semibold">Break End</h1>
                <p className="text-2xl font-bold">{breakEndTime}</p>
              </div>
              <button onClick={handleBreakEnd} className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">
                <MdOutlineTimerOff />
              </button>
            </div>
            <div className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
              <div>
                <h1 className="text-md font-semibold">Check Out</h1>
                <p className="text-2xl font-bold">{checkOutTime}</p>
              </div>
              <button onClick={handleCheckOut} className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">
                <LogOut />
              </button>
            </div>
            <div className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
              <div>
                <h1 className="text-md font-semibold">Total Working Hours:</h1>
                <p className="text-2xl font-bold">{totalWorkingHours}</p>
              </div>
              {/* <button onClick={handleCheckOut} className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">
                <LogOut />
              </button> */}
            </div>
          </div>
        </div>
      </div>


                <div className="max-w-100 mt-10 flex flex-col gap-4">
                  <h1 className="font-semibold text-2xl">Today's Tasks</h1>
                  <div className="bg-white shadow-xl flex flex-col gap-4 p-4 rounded-lg">
                      {TodayTasks.map((task, index) => 
                        <h1 className={`px-3 py-2 rounded-lg ${index % 2 ? "bg-green-200" : "bg-red-200"}`}> {task.task}</h1>
                      )}
                  </div>
                </div>

    </div>
  );
};

export default UserDashBoard;