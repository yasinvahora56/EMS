import { useEffect, useState } from "react";
import { BACKEND_URL, token } from "../../../config/config";

const LeaveRequest = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [leaveData, setLeaveData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/leave/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          startDate: startDate,
          endDate: endDate,
          description: description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add Leave");
      }

      const saveLeave = await response.json();
      setLeaves((prevLeave) => [...prevLeave, saveLeave]);
      setName("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      fetchLeaveData();
    } catch (error) {
      console.error("Error adding Leave:", error);
      setError(error.message);
    }
  };

  const fetchLeaveData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/leave/getOne`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setLeaveData(data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-700">
          Request For Leave
        </h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            {error}
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 border border-blue-100">
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-medium text-blue-800 w-28 shrink-0" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-blue-300"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>

          {/* From Date */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-medium text-blue-800 w-28 shrink-0" htmlFor="from">
              From Date:
            </label>
            <input
              type="date"
              name="startdate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-medium text-blue-800 w-28 shrink-0" htmlFor="to">
              To Date:
            </label>
            <input
              type="date"
              name="to_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
            />
          </div>

          {/* Leave Reason */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <label className="font-medium text-blue-800 w-28 shrink-0" htmlFor="reason">
              Reason:
            </label>
            <textarea
              name="reason"
              placeholder="Explain your reason for leave"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 placeholder-blue-300 resize-y min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full py-4 mt-6"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Leave Request List */}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Your Leave Requests</h2>
        
        {leaveData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-blue-100">
            <div className="text-blue-400 text-xl mb-3">No leave requests found</div>
            <p className="text-gray-500">You haven't submitted any leave requests yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaveData.map((leave, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-400 text-white p-4">
                  <h3 className="font-semibold text-lg truncate">{leave.description}</h3>
                </div>
                
                <div className="p-4 border-b border-blue-100">
                  <div className="text-gray-600 text-sm">
                    <span className="font-semibold">Period: </span>
                    {leave.startDate} to {leave.endDate}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-400 font-bold">
                      {leave.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h2 className="font-medium text-blue-800">{leave.name}</h2>
                      <p className="text-sm text-blue-400">Employee</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <span className={`px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium inline-block ${leave.status === "Approved" ? "bg-green-100 text-green-700" : leave.status === "Rejected" ? "bg-red-100 text-red-700" : ""}`}>
                    {leave.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;