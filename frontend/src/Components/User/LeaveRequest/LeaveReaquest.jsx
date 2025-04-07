import { useEffect, useState } from "react";
import { BACKEND_URL, token } from "../../../config/config";

const LeaveRequest = () => {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [leaves, setLeaves] = useState([])
  const [error, setError] = useState("")
  const [leaveData, setLeaveData] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await fetch(`${BACKEND_URL}/leave/create`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          startDate: startDate,
          endDate: endDate,
          description: description
        })
      })
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed t to add Leave");
      }

      const saveLeave = await response.json()
      setLeaves((prevLeave) => [...prevLeave, saveLeave])
      setName("")
      setStartDate("")
      setEndDate("")
      setDescription("")
    } catch (error) {
      console.error("Error adding Leave:", error);
      setError(error.message);
    }
  }

  const fetchLeaveData = async () => {
  
          try {
              const response = await fetch(`${BACKEND_URL}/leave/getOne`, {
                  method: "GET",
                  headers:{
                      "Authorization" : `Bearer ${token}`
                  }
              })
              const data = await response.json()
              console.log(data)
              if(response.ok){
                  setLeaveData(
                      data.leaves
                  )
              }
          } catch (error) {
            console.error("Error fetching leave data:", error);
          }
  
  
  
  
      }
  
      useEffect(() => {
          fetchLeaveData()
      }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl transition-all duration-300">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">
          Request For Leave
        </h1>
        {/* <form onClick={handleSubmit} action=""> */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 space-y-6 border border-gray-100">
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-semibold text-gray-700 w-28 shrink-0" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 placeholder-gray-400"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>

          {/* From Date */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-semibold text-gray-700 w-28 shrink-0" htmlFor="from">
              From Date:
            </label>
            <input
              type="date"
              name="startdate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <label className="font-semibold text-gray-700 w-28 shrink-0" htmlFor="to">
              To Date:
            </label>
            <input
            type="date"
            name="to_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
            />
          </div>

          {/* Leave Type */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="reason">Reason:</label>
            <textarea 
              name='reason' 
              placeholder='Explain your reason'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 placeholder-gray-400 resize-y min-h-[100px]' 
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 w-full py-3 mt-6 transform hover:-translate-y-1 active:translate-y-0"
          >
            Submit Request
          </button>
        </div>
        {/* </form> */}
      </div>

      {/* Leave Request List */}
      <div className="w-full max-w-5xl mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">Your Leave Requests</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Leave Card */}
          <div className="w-64">
            <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-4 space-y-4 border border-gray-100">
              <div className="text-left font-bold border-b pb-2">
                <h3 className="text-md">Sick Leave</h3>
                <p className="font-light text-sm">22-April <span>to</span> 27-April</p>
              </div>
              <div className="flex items-center gap-3 border-b pb-2 border-amber-300 text-yellow-800">
                {/* <img src={logo} className='w-15 h-15 rounded-full' alt="" /> */}
                <div>
                  <h1 className="font-medium text-lg">Yasin Vahora</h1>
                  <p className="text-sm">Developer</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-md font-bold text-green-600">Pending</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
