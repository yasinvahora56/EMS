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
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeTask, setEmployeeTask] = useState([]);

  const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

  const API_URL = "https://ems-pq48.onrender.com";

  // Fetch current status on load
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  // Update date and time
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

  // Fetch attendance records to get current status
  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/attendance/records`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }

      const data = await response.json();
      setAttendanceData(data);
      
      // Set initial state based on latest record
      if (data.records && data.records.length > 0) {
        const latestRecord = data.records[0]; // Assuming sorted by most recent first
        
        // Set status
        setCurrentStatus(latestRecord.status);
        
        // Set times
        if (latestRecord.checkin) {
          const checkinDate = new Date(latestRecord.checkin);
          setCheckInTime(checkinDate.toLocaleTimeString());
        }
        
        if (latestRecord.checkout) {
          const checkoutDate = new Date(latestRecord.checkout);
          setCheckOutTime(checkoutDate.toLocaleTimeString());
          
          if (latestRecord.totalHours) {
            const hours = Math.floor(latestRecord.totalHours);
            const minutes = Math.floor((latestRecord.totalHours - hours) * 60);
            setTotalWorkingHours(`${hours}h ${minutes}m`);
          }
        }
        
        // Set break times if available (assuming last break entry)
        if (latestRecord.breaks && latestRecord.breaks.length > 0) {
          const lastBreak = latestRecord.breaks[latestRecord.breaks.length - 1];
          if (lastBreak.startTime) {
            const breakStartDate = new Date(lastBreak.startTime);
            setBreakTime(breakStartDate.toLocaleTimeString());
          }
          
          if (lastBreak.endTime) {
            const breakEndDate = new Date(lastBreak.endTime);
            setBreakEndTime(breakEndDate.toLocaleTimeString());
          }
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const getEmployeeTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/task/EmployeeTask`, {
        method: "GET",
        headers:{
          "content-type":"application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if(!response.ok){
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()
      setEmployeeTask(data.tasks)

    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);      
    }
  }

  useEffect(() => {
    getEmployeeTasks()
  }, []);


  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/attendance/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check in');
      }

      const data = await response.json();
      
      const now = new Date();
      setCheckInTime(now.toLocaleTimeString());
      setCurrentStatus("Checked In");
      
      // Refresh attendance data
      fetchAttendanceRecords();
      
      setLoading(false);
    } catch (error) {
      console.error("Error during check-in:", error);
      setError(error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const handleBreak = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/attendance/startBreak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start break');
      }

      const data = await response.json();
      
      const now = new Date();
      setBreakTime(now.toLocaleTimeString());
      setCurrentStatus("On Break");
      
      // Refresh attendance data
      fetchAttendanceRecords();
      
      setLoading(false);
    } catch (error) {
      console.error("Error starting break:", error);
      setError(error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const handleBreakEnd = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/attendance/endBreak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to end break');
      }

      const data = await response.json();
      
      const now = new Date();
      setBreakEndTime(now.toLocaleTimeString());
      setCurrentStatus("Checked In");
      
      // Refresh attendance data
      fetchAttendanceRecords();
      
      setLoading(false);
    } catch (error) {
      console.error("Error ending break:", error);
      setError(error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/attendance/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check out');
      }

      const data = await response.json();
      
      const now = new Date();
      setCheckOutTime(now.toLocaleTimeString());
      setCurrentStatus("Checked Out");
      
      // Set total working hours from response
      if (data.attendance && data.attendance.totalHours) {
        const hours = Math.floor(data.attendance.totalHours);
        const minutes = Math.floor((data.attendance.totalHours - hours) * 60);
        setTotalWorkingHours(`${hours}h ${minutes}m`);
      }
      
      // Refresh attendance data
      fetchAttendanceRecords();
      
      setLoading(false);
    } catch (error) {
      console.error("Error during check-out:", error);
      setError(error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to determine if a button should be disabled
  const isButtonDisabled = (buttonType) => {
    switch (buttonType) {
      case "Check In":
        return currentStatus !== "Not Started" && currentStatus !== "Checked Out";
      case "Break":
        return currentStatus !== "Checked In";
      case "Break End":
        return currentStatus !== "On Break";
      case "Check Out":
        return currentStatus !== "Checked In";
      default:
        return false;
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
              ${currentStatus === "Checked In" ? "bg-green-500 text-white" : 
                currentStatus === "On Break" ? "bg-amber-500 text-white" : 
                currentStatus === "Checked Out" ? "bg-red-500 text-white" : 
                "bg-gray-300 text-gray-700"
              }
            `}>
              <span className="font-semibold">{currentStatus}</span>
              <FaCircle className="animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
            <p>{error}</p>
            <button 
              className="text-red-600 underline mt-2" 
              onClick={() => setError(null)}
            >
              Clear
            </button>
          </div>
        )}

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
                ${loading ? 'opacity-70' : ''}
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
                    disabled={loading || isButtonDisabled(item.title)}
                    className={`
                      ${item.textColor} bg-white rounded-full p-3 
                      hover:bg-opacity-80 transition-all
                      ${(loading || isButtonDisabled(item.title)) ? 'opacity-50 cursor-not-allowed' : ''}
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
            {employeeTask.map((task, index) => (
              <div 
                key={index} 
                className={`
                  ${getPriorityColor(task.priority)} 
                  px-4 py-3 rounded-lg flex justify-between items-center
                  hover:shadow-md transition-all
                `}
              >
                <span className="font-medium">{task.description}</span>
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