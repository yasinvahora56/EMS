import { CheckCircleIcon, Search, XCircleIcon } from "lucide-react";
import { FaHourglassHalf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BACKEND_URL, token } from "../../../config/config";
import Attandance from "../Attandance/Attendance.jsx"

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [dateTime, setDateTime] = useState();
  const [search, setSearch] = useState('');

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/employee/attendance`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Data fetched Successfully", data.employeeData);
        setAttendance(data.employeeData);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      const time = now.toLocaleTimeString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setDateTime(`${date} | ${time}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    "Checked In": {
      bg: "bg-green-500 text-white",
      icon: <CheckCircleIcon className="w-5 h-5 mr-1" />,
    },
    "On Break": {
      bg: "bg-amber-500 text-white",
      icon: <FaHourglassHalf className="w-4 h-4 mr-1" />,
    },
    "Checked Out": {
      bg: "bg-red-500 text-white",
      icon: <XCircleIcon className="w-5 h-5 mr-1" />,
    },
  };

  
  

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="max-w-6xl w-full">
          {/* Search Bar */}
          <div className="relative w-60">
            <input
              className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="bg-transparent rounded-lg px-6 py-4 flex justify-between items-center w-[100%]">
          <h2 className="text-3xl font-bold text-blue-500 text-nowrap">📅 Attendance Records</h2>
          
        </div>
          <h1 className="text-lg font-semibold text-gray-600 text-nowrap">{dateTime}</h1>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-200">
          <table className="w-full table-auto">
            <thead className="bg-blue-400 text-white">
              <tr>
                <th className="px-6 py-4 text-left">No</th>
                <th className="px-6 py-4 text-left">Employee Name</th>
                <th className="px-6 py-4 text-left">Check-in</th>
                <th className="px-6 py-4 text-left">Check-out</th>
                <th className="px-6 py-4 text-left">Total Hours</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
            {attendance?.filter(employee => 
                search.toLowerCase() === '' ? employee : 
                (employee.status && employee.status.toLowerCase().includes(search.toLowerCase()))
              ).map((employee, index) =>    (
                <tr key={employee._id} className="hover:bg-blue-100 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{employee.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{employee.checkin || "--"}</td>
                  <td className="px-6 py-4 text-gray-700">{employee.checkout || "--"}</td>
                  <td className="px-6 py-4 text-gray-700">{employee.totalHours || "--"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[employee.status]?.bg}`}>
                      {statusConfig[employee.status]?.icon}
                      {employee.status || "N/A"}
                    </span>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No attendance data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      <Attandance/>
      </div>
    </div>
  );
};

export default Attendance;
