import React, { useState } from "react";
import logo from '../Images/logo.jpg'
import CreatNewBtn from "../DashBoard/CreatNewBtn";
import { Plus, Search } from "lucide-react";
const Employee = () => {
  const data = [
    {
      id: 1,
      image: logo, // Replace with actual image URLs
      name: "Yasin",
      email: "yasin@gmail.com.com",
      designation: "Developer",
      gender: "Male",
      course: "B.Tech",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      image: logo,
      name: "Adnan",
      email: "adnan@gmail.com",
      designation: "Designer",
      gender: "Female",
      course: "B.Sc",
      joinDate: "2022-05-10",
    },
    {
      id: 3,
      image: logo,
      name: "Raiyyan",
      email: "raiyyan@gmail.com",
      designation: "Marketing",
      gender: "Male",
      course: "MBA",
      joinDate: "2021-09-20",
    },
    {
      id: 4,
      image: logo,
      name: "Asad",
      email: "asad@gmail.com",
      designation: "Marketing",
      gender: "Male",
      course: "MBA",
      joinDate: "2021-09-20",
    },
  ];

  const [search, setSearch] = useState('');
 

  return (
    <>
       <div className="p-6 ml-[20rem] w-[calc(100%-20rem)]"> {/* Sidebar ke hisaab se margin & width adjust ki */}
          
          {/* 🔹 Header Section with Search & Add Button */}
          <div className="bg-white shadow-md rounded-lg px-6 py-4 flex justify-between items-center mb-4 w-[80%]">

            {/* Search Bar */}
            <div className="relative w-60">
              <input
                className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Add New Button */}
            <CreatNewBtn/>
          </div>

          {/* 🔹 Employee Table */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-[80%]">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Id</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Designation</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">Course</th>
                  <th className="py-3 px-4 text-left">Join Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {data.filter(employee => 
                  search.toLowerCase() === '' ? employee : employee.name.toLowerCase().includes(search.toLowerCase())
                ).map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <td className="py-3 px-4">{employee.id}</td>
                    <td className="py-3 px-4">
                      <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="py-3 px-4">{employee.name}</td>
                    <td className="py-3 px-4">{employee.email}</td>
                    <td className="py-3 px-4">{employee.designation}</td>
                    <td className="py-3 px-4">{employee.gender}</td>
                    <td className="py-3 px-4">{employee.course}</td>
                    <td className="py-3 px-4">{employee.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

   
    </>
  );
};

export default Employee;
