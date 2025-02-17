import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";


const Attandance = () => {

    const Data = [
        {
            id: 1,
            name: "Yasin",
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
        Absent: { bg: "bg-red-100 text-red-700", icon: <XCircleIcon className="w-5 h-5 inline-block mr-1" /> },
        "On Leave": { bg: "bg-yellow-100 text-yellow-700", icon: <ClockIcon className="w-5 h-5 inline-block mr-1" /> },
      };


  return (
    <div className="flex justify-center mt-10">
    <section className="w-full max-w-5xl">
      <h2 className="font-semibold text-2xl text-gray-700 mb-6 text-start">📅 Attendance Records</h2>

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
  )
}

export default Attandance
