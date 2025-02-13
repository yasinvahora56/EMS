import { useEffect, useState } from "react";
import { TbBounceRightFilled } from "react-icons/tb";
import { FaCheck, FaTimes, FaAngleDown } from "react-icons/fa";
const AttendenceManage = () => {
  const [selectedOption, setSelectedOption] = useState("")
  const [newStatus, setNewStatus] = useState([])
  

  useEffect (() => {

    setNewStatus([
      {
        id:1,
        name:"Yasin",
        leaveType: "For Enjoy",
        from: "15-02-2025",
        to: "20-02-2025",
        status: "Pending"
      },
      {
        id:2,
        name:"Asad",
        leaveType: "For Enjoy",
        from: "15-02-2025",
        to: "20-02-2025",
        status: "Approved"
      },
      {
        id:3,
        name:"Adnan",
        leaveType: "For Enjoy",
        from: "15-02-2025",
        to: "20-02-2025",
        status: "Rejected"
      },
      {
        id:4,
        name:"Raiyyan",
        leaveType: "For Enjoy",
        from: "15-02-2025",
        to: "20-02-2025",
        status: "Approved"
      },
    ]);

    setSelectedOption([
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
    ]);



  }, []);

  

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

  const leaveStatusColor = (color) => {
    switch (color) {
      case "Pending":
        return "bg-yellow-300 text-black";
      case "Rejected":
        return "bg-red-300 text-black";
      case "Approved":
        return "bg-green-300 text-black";
    }
  }

  const handleLeaveApproval = (employeId, newStatus) => {
    setNewStatus((preventHandle) =>
      preventHandle.map((request) =>
        request.id === employeId ? { ...request, status: newStatus} : request
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Attendance & Leave Management</h1>
        <div className="flex gap-2 justify-center items-center">
          <label className="text-md text-gray-600" htmlFor="select">
            Select
          </label>
          <select
            className="border-2 border-gray-300 text-center px-4 py-2 rounded-md hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            name=""
            id=""
          >
            <option value="attendance">Attendance</option>
            <option value="leave">Leave</option>
          </select>
        </div>
      </header>
      <hr className="border-gray-300 mb-6" />

      {/* Attendance Records Section */}
      <div className="flex justify-center">
        {selectedOption == "attendance" ? (<section className="w-full max-w-6xl">
          <h2 className="font-medium text-2xl text-gray-700 mb-4">
            Attendance Records
          </h2>
          <div className="border p-4 rounded-lg shadow-lg bg-white overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-6 py-3 border border-gray-300">Employee Name</th>
                  <th className="px-6 py-3 border border-gray-300">Time</th>
                  <th className="px-6 py-3 border border-gray-300">Date</th>
                  <th className="px-6 py-3 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedOption.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-center text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-3 border border-gray-300">
                      {employee.name}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {employee.time}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {employee.date}
                    </td>
                    <td
                      className={`px-6 py-3 border border-gray-300 rounded-md ${statusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>) : (<section className="w-full max-w-6xl">
          <h2 className="font-medium text-2xl text-gray-700 mb-4">
            Leave Records
          </h2>
          <div className="border p-4 rounded-lg shadow-lg bg-white overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="px-6 py-3 border border-gray-300">Employee Name</th>
                  <th className="px-6 py-3 border border-gray-300">Leave type</th>
                  <th className="px-6 py-3 border border-gray-300">From</th>
                  <th className="px-6 py-3 border border-gray-300">To</th>
                  <th className="px-6 py-3 border border-gray-300">Status</th>
                  <th className="px-6 py-3 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newStatus.map((employe) => (
                  <tr
                    key={employe.id}
                    className="text-center text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-3 border border-gray-300">
                      {employe.name}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {employe.leaveType}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {employe.from}
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      {employe.to}
                    </td>
                    <td
                      className={`px-6 py-3 border border-gray-300 rounded-md ${leaveStatusColor(employe.status)}`}
                    >
                      {employe.status}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {employe.status == "Pending" ? (
                        <div className="flex flex-nowrap gap-3 justify-center items-center">
                          <button 
                          className="bg-green-600 shadow-green-400 py-2 px-4 rounded-full text-white flex flex-nowrap items-center justify-center gap-1 cursor-pointer"
                          onChange={() => handleLeaveApproval(employe.id, "Approved")}
                          ><TbBounceRightFilled />Approve
                          </button>
                          <button 
                          className="bg-red-600 shadow-red-400 py-2 px-4 rounded-full text-white flex flex-nowrap items-center justify-center gap-1 cursor-pointer"
                          onChange={() => handleLeaveApproval(employe.id, "Rejected")}
                          >
                          <FaTimes />Reject
                          </button>
                        </div>
                      ) : (
                        employe.status
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>)}
      </div>
    </div>
  );
};

export default AttendenceManage;
