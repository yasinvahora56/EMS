import React, { useState } from "react";
import logo from '../Images/logo.jpg'
import { Search } from "lucide-react";

const Payroll = () => {

  const [search, setSearch] = useState('');
  const [salaryPaid, setSalaryPaid] = useState([
    {
      id: 1,
      image: logo, // Replace with actual image URLs
      name: "Yasin",
      email: "yasin@gmail.com.com",
      designation: "Developer",
      gender: "Male",
      salary: "100000",
      status:"unpaid"
    },
    {
      id: 2,
      image: logo,
      name: "Adnan",
      email: "adnan@gmail.com",
      designation: "Designer",
      gender: "male",
      salary: "100000",
      status:"unpaid"
    },
    {
      id: 3,
      image: logo,
      name: "Raiyyan",
      email: "raiyyan@gmail.com",
      designation: "Marketing",
      gender: "Male",
      salary: "100000",
      status:"unpaid"
    },
    {
      id: 4,
      image: logo,
      name: "Asad",
      email: "asad@gmail.com",
      designation: "Marketing",
      gender: "Male",
      salary: "100000",
      status:"unpaid"
    },
  ])

 

  const handleApproval = (employeId, setStatus) => {

    setSalaryPaid((preveData) =>
      preveData.map((request) =>
        request.id === employeId ? { ...request, status: setStatus} : request
      )
    );


  } 


  

  
  return (
    <>

<div className="max-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Salary Table</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Employee..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Salary Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-left text-sm">
                {['ID', 'Image', 'Name', 'Email', 'Designation', 'Gender', 'Salary', 'Status', 'Action'].map((head) => (
                  <th key={head} className="px-4 py-3 font-semibold uppercase">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salaryPaid.filter((employee) =>
                search.toLowerCase() === '' || employee.name.toLowerCase().includes(search.toLowerCase())
              ).map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100 transition-all">
                  <td className="px-4 py-3 text-gray-700">{employee.id}</td>
                  <td className="px-4 py-3">
                    <img src={employee.image} alt={employee.name} className="w-12 h-12 rounded-full border-2 border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{employee.name}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.email}</td>
                  <td className="px-4 py-3 text-gray-700">{employee.designation}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.gender}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">₹{employee.salary}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${employee.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{employee.status}</span>
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
  <button className="bg-gradient-to-r from-green-400 to-green-700 px-6 py-3 cursor-pointer rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-2 hover:shadow-2xl animate-bounce"
    onClick={() => handleApproval(employee.id, "Paid")}
  >
    Paid
  </button>
</td> */}
<td className=" px-4 py-2">
  <button className="bg-gradient-to-r from-green-400 to-green-700 px-6 py-3 cursor-pointer rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
    onClick={() => handleApproval(employee.id, "Paid")}
  >
    Paid
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  )
}

export default Payroll
