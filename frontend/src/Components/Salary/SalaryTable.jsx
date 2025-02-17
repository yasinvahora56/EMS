import React, { useState } from "react";
import logo from '../Images/logo.jpg'
import CreatNewBtn from "../DashBoard/CreatNewBtn";
import { Search } from "lucide-react";

const SalaryTable = ({expend, ToggleModal}) => {

  const [search, setSearch] = useState('');
  const [paidSalary, setSalaryPaid] = useState('')

  useState (() => {
    setSalaryPaid([
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
    ]);
  })

  const handleApproval = (employeId, setStatus) => {

    setSalaryPaid((preveData) =>
      preveData.map((request) =>
        request.id === employeId ? { ...request, status: setStatus} : request
      )
    );


  } 


  

  
  return (
    <>
      {expend && (
      <>
       <div className="absolute left-80 top-80 max-w-md mx-auto">
      <input
        className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
    </div>
    {/* <CreatNewBtn/> */}
    <div className="absolute left-80 top-90">
    <div className="w-3/4 mt-10">
      <div className="items-left justify-left">
      <h1 className="text-2xl font-bold mb-4">Salery Table</h1>
      </div>
      <div className="rounded-lg">
        <table className="table-auto w-full border-collapse border border-blue-500 text-left">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paidSalary.filter((employee) => {
              return search.toLowerCase() === '' ? employee : employee.name.toLowerCase().includes(search.toLowerCase());
            }).map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-100 transition-colors p-4"
              >
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {employee.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.gender}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {handleApproval ? employee.status : "Unpaid"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-green-700 px-4 py-2 cursor-pointer rounded-md text-white shadow"
                  onClick={() => handleApproval(employee.id, "Paid")}
                  >Paid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
    )}
    </>
  )
}

export default SalaryTable
