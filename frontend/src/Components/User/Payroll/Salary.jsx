
import { useState } from 'react';
import logo from '../Images/logo.jpg'
import { Search } from "lucide-react";
import React from 'react';

const Salary = () => {

  const [search, setSearch] = useState('');
  const [salaryPaid, setSalaryPaid] = useState([
    {
      id: 1,
      paid_by:"Admin",
      email: "admin@gmail.com",
      designation: "Owner",
      gender: "Male",
      salary: "100000",
      date:"02/04/2025",
      status:"unpaid"
    },
    {
      id: 2,
      paid_by:"Admin",
      email: "admin@gmail.com",
      designation: "Owner",
      gender: "Male",
      salary: "100000",
      date:"02/03/2025",
      status:"Paid"
    },
    {
      id: 3,
      paid_by:"Admin",
      email: "admin@gmail.com",
      designation: "Owner",
      gender: "Male",
      salary: "100000",
      date:"02/02/2025",
      status:"Paid"
    },
    {
      id: 4,
      paid_by:"Admin",
      email: "admin@gmail.com",
      designation: "Owner",
      gender: "Male",
      salary: "100000",
      date:"02/01/2025",
      status:"Paid"
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

<div className="flex items-center justify-center max-h-screen z-0 ml-90 mt-10">
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
              <tr className="bg-blue-600 text-white text-center text-sm">
                {['ID', 'Paid By', 'Email', 'Designation', 'Gender', 'Salary', 'Date','Status'].map((head) => (
                  <th key={head} className="px-4 py-3 font-semibold uppercase">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salaryPaid.filter((employee) =>
                search.toLowerCase() === '' || employee.paid_by.toLowerCase().includes(search.toLowerCase())
              ).map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100 transition-all">
                  <td className="px-4 py-3 text-gray-700">{employee.id}</td>
                  <td className="px-4 py-3">{employee.paid_by}</td>
                  {/* <td className="px-4 py-3 text-gray-700 font-medium">{employee.name}</td> */}
                  <td className="px-4 py-3 text-gray-600">{employee.email}</td>
                  <td className="px-4 py-3 text-gray-700 text-center">{employee.designation}</td>
                  <td className="px-4 py-3 text-gray-600">{employee.gender}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">₹{employee.salary}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">{employee.date}</td>
                  <td className="px-4 py-3 flex item-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${employee.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{employee.status}</span>
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

export default Salary
