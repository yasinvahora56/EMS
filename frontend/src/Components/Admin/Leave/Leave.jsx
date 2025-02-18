import { useState } from 'react';
import logo from '../Images/logo.jpg';
import { CheckCircleIcon } from 'lucide-react';

const Leave = () => {

    

    const LeaveData = [
        {
            id:1,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Yasin Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:2,
            type: "Sick Leave",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Asad Master",
            designation: "Devloper",
            status:"",
        },
        {
            id:3,
            type: "Tour Visiting",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Adnan Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:4,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Raiyyan Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:5,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Rahil Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:6,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Rahil Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:7,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Rahil Vahora",
            designation: "Devloper",
            status:"",
        },
        {
            id:8,
            type: "Request For Time Out",
            days: "7",
            date: "Nov 21-28, 2025",
            img: logo,
            name: "Rahil Vahora",
            designation: "Devloper",
            status:"",
        },
    ]

    const [leaveStatus, setLeaveStatus] = useState(LeaveData);

    const handleApprove = (employeeId, newStatus) => {
        setLeaveStatus((prevData) =>
            prevData.map((leave) =>
                leave.id === employeeId ? { ...leave, status: newStatus} : leave
            ) 
        )        
    }

    const statusColor = (status) => {
        switch (status) {
            case "Approve":
                return "text-green-800";
            case "Reject":
                return "text-red-600";
        }
    }


  return (
    <>
    <h1 className='text-3xl font-bold ml-60 items-center justify-center'>Leave Request</h1>
    <div className='ml-60 mt-10 flex flex-wrap gap-4'>
    
    {leaveStatus.map((leave, index) => 

<div key={leave.id} className={`max-w-60 ${index % 2 === 0 ? "bg-amber-200" : "bg-green-200"} rounded-md p-3 shadow`}>

        
      
<div>
 
  <div className={`p-3 border-b-1 flex flex-col gap-1 text-left font-bold ${index % 2 === 0 ? "text-amber-800 border-amber-700":"text-green-800 border-green-700"}`}>
  <h3 className='font-bold text-md'>{leave.type}</h3>
  <p className='font-thin text-sm'>{leave.days}<span>{leave.date}</span></p>
  </div>
  <div className={`${index % 2 === 0 ? "text-amber-800 border-amber-700":"text-green-800 border-green-700"} flex gap-4 p-4 items-center border-b-1 border-amber-300 text-yellow-800`}>
      <img src={logo} className='w-15 h-15 rounded-full' alt="" />
      <div className={`whitespace-nowrap ${index % 2 === 0 ? "text-amber-800 border-amber-700":"text-green-800 border-green-700"}`}>
          <h1 className='font-medium text-lg'>{leave.name}</h1>
          <p>{leave.designation}</p>
      </div>
  </div>
  <div className='pl-4 pt-4 flex gap-3 items-center justify-end '>
        {leave.status === "" ? (
            <>
            <button className={` px-3 py-2 rounded-md cursor-pointer hover:shadow text-white ${index % 2 === 0 ? "bg-amber-800" : "bg-green-800"}`}
            onClick={() => handleApprove(leave.id, "Reject")}
            >Reject</button>
            <button className={`px-3 py-2 rounded-md cursor-pointer hover:shadow text-white ${index % 2 === 0 ? "bg-amber-800" : "bg-green-800"}`}
            onClick={() => handleApprove(leave.id, "Approve")}
            >Approve</button>
            </>
        ):(
            <p className={`flex items-center justify-center mx-auto font-bold text-xl ${index % 2 === 0 ? "text-amber-800" : "text-green-800"} ${statusColor(leave.status)  }` }>{leave.status}</p>
        )}
  </div>
</div>
</div>
    )}
    
    </div>
    </>
  )
}

export default Leave
