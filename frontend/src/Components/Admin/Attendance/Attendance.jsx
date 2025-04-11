import { Backpack, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { FaHourglassHalf } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BACKEND_URL, token } from "../../../config/config";

const Attandance = () => {

  const [attendance, setAttendance] = useState([])


  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/employee/attendance`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log("Data fetched Successfully", data.employeeData)
        setAttendance(data.employeeData)
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }

  useEffect(() => {
    fetchAttendance()
  },[])


    const statusColor = (status) => {
        switch (status) {
          case "Present":
            return "bg-green-200 text-green-700";
          case "Absent":
            return "bg-red-200 text-red-700";
          case "On Leave":
            return "bg-yellow-200 text-yellow-700";
          default:
            return "bg-gray-200 text-gray-700";
        }
      };

      const statusConfig = {
        Present: { bg: "bg-green-100 text-green-700", icon: <CheckCircleIcon className="w-5 h-5 inline-block mr-1" /> },
        Late: { bg: "bg-green-100 text-green-700", icon: <CheckCircleIcon className="w-5 h-5 inline-block mr-1" /> },
        "Half Day": { bg: "bg-amber-100 text-amber-700", icon: <CheckCircleIcon className="w-5 h-5 inline-block mr-1" /> },
        Absent: { bg: "bg-red-100 text-red-700", icon: <XCircleIcon className="w-5 h-5 inline-block mr-1" /> },
        "On Leave": { bg: "bg-yellow-100 text-yellow-700", icon: <ClockIcon className="w-5 h-5 inline-block mr-1" /> },
      };

      const AttandanceData = [
        {
          number:3,
          type:"Late",
          icon:<FaHourglassHalf/>,
        },
        {
          number:4,
          type:"Present",
          icon: <AiFillCheckCircle color="green"/>,
        },
        {
          number:2,
          type:"Absent",
          icon: <AiFillCheckCircle color="red"/>,
        },
        {
          number:1,
          type:"Half Day",
          icon: <AiFillClockCircle/>,
        },
      ]


  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row">
      <h2 className="font-bold text-2xl text-black mb-6 text-start">📅 Attendance Records</h2>
      <h1 className="font-bold text-2xl my-4 flex">18/02/2025<span className="mx-2">Tuesday</span></h1>
      </div>
    <div className="w-250 flex">     
    <section className="">
      <div className="overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Employee Name</th>
              <th className="px-6 py-3 text-left">Checkin</th>
              <th className="px-6 py-3 text-left">CheckOut</th>
              <th className="px-6 py-3 text-left">Total Hours</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {attendance?.map((employee) => (
              <tr key={employee._id} className={`hover:bg-gray-100 transition-colors `}>
                <td className="px-6 py-4 text-gray-700">name</td>
                <td className="px-6 py-4 text-gray-700">{employee.checkin}</td>
                <td className="px-6 py-4 text-gray-700">{employee.checkout}</td>
                <td className="px-6 py-4 text-gray-700">{employee.totalHours}</td>
                <td className={`px-6 py-4 font-medium rounded-lg flex items-center ${statusConfig[employee.status]?.bg}`}>
                  {statusConfig[employee.status]?.icon}
                  {employee.status}
                </td>
              </tr>
            ) || [])}
          </tbody>
        </table>
      </div>
    </section>
  </div>
  </div>
  )
}

export default Attandance
