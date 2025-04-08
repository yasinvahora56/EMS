import { useEffect, useState } from 'react';
import { BACKEND_URL, token } from '../../../config/config';

const Leave = () => {
    const [leaveData, setLeaveData] = useState([]);
    const[employeeData, setEmployeeData] = useState([])

    const handleDelete = async (e, leaveId) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/leave/delete/${leaveId}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete Leave");
            }
            
            const data = await response.json();
            setLeaveData((prevLeave) => prevLeave.filter((leave) => leave._id !== leaveId));
            console.log("Leave deleted:", data.message);
        } catch (error) {
            console.error("Error deleting Leave:", error);
        }
    }

    const handleStatus = async (e, leaveId, leaveStatus) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/leave/update/${leaveId}`, {
                method: "PATCH",
                headers: {
                    "content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({ status: leaveStatus})
            })
            if(!response.ok){
                throw new Error("Failed to Update Leave");
            }
            const data = await response.json();
            setLeaveData(prevStatus =>
                prevStatus.map(leave => 
                    leave._id === leaveId ? { ...leave, status: leaveStatus} : leave
                )
            )
            console.log("Leave updated:", data.message);
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    }

    const fetchAllLeaveData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/leave/get`, {
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
    }

    useEffect(() => {
        fetchAllLeaveData();
    }, []);

     const fetchEmployee = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/employee/`,{
            method:"GET",
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          const data = await response.json()
          if(response.ok){
           
            if(Array.isArray(data.employeeData)){
              setEmployeeData(data.employeeData)
            }else{
              setEmployeeData([data.employeeData])
            }
    
          }
          console.log("Data fetched Successfully", data)
        } catch (error) {
          console.log("Error During Fetch Employee Data",error)
        }
      }
    
      useEffect(() => {
        fetchEmployee()
      }, [])

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Leave Requests</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaveData.map((leave, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
                        <div className="bg-blue-400 text-white p-4 flex justify-between items-center">
                            <h3 className="font-semibold text-lg flex-wrap text-wrap">{leave.description}</h3>
                            <button 
                                onClick={(e) => handleDelete(e, leave._id)} 
                                className="bg-blue-400 hover:bg-blue-800 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="p-4 border-b border-blue-100">
                            <div className="text-gray-600 text-sm">
                                <span className="font-semibold">Period: </span>
                                {leave.startDate} - {leave.endDate}
                            </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    {leave.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <h2 className="font-medium text-blue-800">{leave.name}</h2>
                                        <p>devloper</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 flex justify-end gap-3">
                            {leave.status == "Pending" && (
                                <>
                                <button 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                onClick={(e) => handleStatus(e, leave._id, "Rejected")}
                            >
                                Reject
                            </button>
                            <button 
                                className="px-4 py-2 bg-blue-400 hover:bg-blue-700 text-white rounded-md transition-colors"
                                onClick={(e) => handleStatus(e, leave._id, "Approved")}
                            >
                                Approve
                            </button>
                                </>
                            )}
                            {leave.status == "Approved" && (
                                <>
                                    <div className='flex items-center gap-2 p-4 text-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium '>
                                        <h1 className='text-green-500'>{leave.status}</h1>
                                    </div>
                                </>
                            )}
                            {leave.status == "Rejected" && (
                               <>
                               <div className='flex items-center gap-2 p-4 text-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium '>
                                   <h1 className='text-red-500'>{leave.status}</h1>
                               </div>
                           </>
                            )}
                        </div>

                    </div>
                ))}
            </div>
            
            {leaveData.length === 0 && (
               <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md border border-blue-100">
               <div className="text-blue-400 text-xl mb-3">No leave requests found</div>
             </div>
            )}
        </div>
    );
}

export default Leave;