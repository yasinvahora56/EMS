import { CheckCircleIcon, Search, XCircleIcon } from "lucide-react";
import { FaHourglassHalf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BACKEND_URL, token } from "../../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendance = async (date) => {
    setLoading(true);
    setError(null);
    
    try {
      // Format the date as YYYY-MM-DD for the API request
      const formattedDate = date.toISOString().split('T')[0];
      
      const response = await fetch(`${BACKEND_URL}/employee/attendance?date=${formattedDate}`, {
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
      } else {
        console.error("Error response:", data.message);
        setError(data.message || "Failed to fetch attendance data");
        setAttendance([]);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setError("Network error or server not responding");
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {  
    fetchAttendance(startDate);
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

  const handleDateChange = (value) => {
    setStartDate(value);
    fetchAttendance(value);
  };

  // Improved search to filter by name or status
  const filteredAttendance = attendance?.filter(employee => {
    const searchTerm = search.toLowerCase();
    if (searchTerm === '') return true;
    
    return (
      (employee.name && employee.name.toLowerCase().includes(searchTerm)) ||
      (employee.status && employee.status.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="min-h-screen mt-24 flex flex-col items-center py-10 px-4">
      <div className="max-w-6xl w-full">
        <div className="bg-transparent rounded-lg px-6 py-4 flex justify-between items-center mb-4 w-full">
          {/* Search Bar */}
          <div className="relative w-60">
            <input
              className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search by name or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-500">📅 Find Attendance Records</h2>
          <DatePicker
            selected={startDate} 
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading attendance data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-200">
            <table className="w-full table-auto">
              <thead className="bg-blue-400 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">No.</th>
                  <th className="px-6 py-4 text-left">Employee Name</th>
                  <th className="px-6 py-4 text-left">Check-in</th>
                  <th className="px-6 py-4 text-left">Check-out</th>
                  <th className="px-6 py-4 text-left">Total Hours</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredAttendance && filteredAttendance.length > 0 ? (
                  filteredAttendance.map((employee, index) => (
                    <tr key={employee._id} className="hover:bg-blue-100 transition-colors">
                      <td className="px-6 py-4 text-gray-700 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{employee.name || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-700">{employee.checkin || "--"}</td>
                      <td className="px-6 py-4 text-gray-700">{employee.checkout || "--"}</td>
                      <td className="px-6 py-4 text-gray-700">{employee.totalHours || "--"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[employee.status]?.bg || "bg-gray-400 text-white"}`}>
                          {statusConfig[employee.status]?.icon}
                          {employee.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No attendance data available for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;