import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";
import { FaHourglassHalf } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";

const Attandance = () => {

    const Data = [
        {
            id: 1,
            name: "Abdul Aziz",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          {
            id: 2,
            name: "Adnan",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          {
            id: 3,
            name: "Raiyyan",
            time: "00:00:00 AM",
            date: "13-02-2025",
            status: "Absent",
          },
          {
            id: 4,
            name: "Asad",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          {
            id: 5,
            name: "Rahil",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Half Day",
          },
          {
            id: 6,
            name: "Muhammad",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          
          {
            id: 7,
            name: "Asad",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          {
            id: 8,
            name: "Rahil",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Half Day",
          },
          {
            id: 9,
            name: "Muhammad",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Present",
          },
          {
            id: 10,
            name: "Subhan",
            time: "10:25:50 AM",
            date: "13-02-2025",
            status: "Absent",
          },
    ]


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
      <h1 className="font-bold text-2xl my-4 flex">18/02/2025<span className="mx-2">Tuesday</span></h1>
    <div className="flex flex-row gap-4 mb-4">

{AttandanceData.map((data) => 
<div className="w-60 h-20">

<div className={`flex ${statusConfig[data.type]?.bg} p-3 flex-row justify-between items-center gap-6 rounded-lg`}>
<div className="">
<h1 className="font-bold text-2xl">{data.number}</h1>
<p className="font-normal text-xl">{data.type}</p>
</div>
<div>
 <div className="font-bold text-2xl">{data.icon}</div>
</div>
</div>

</div>
)}


</div>
    <div className="w-250 flex flex-col">     
    <section className="">
      <h2 className="font-bold text-2xl text-black mb-6 text-start">📅 Attendance Records</h2>

      <div className="overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Employee Name</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {Data.map((employee, index) => (
              <tr key={employee.id} className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-6 py-4 text-gray-700">{employee.name}</td>
                <td className="px-6 py-4 text-gray-700">{employee.time}</td>
                <td className="px-6 py-4 text-gray-700">{employee.date}</td>
                <td className={`px-6 py-4 font-medium rounded-lg flex items-center ${statusConfig[employee.status]?.bg}`}>
                  {statusConfig[employee.status]?.icon}
                  {employee.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
  </div>
  )
}

export default Attandance
