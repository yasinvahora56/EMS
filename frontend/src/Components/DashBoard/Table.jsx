import React, { useState } from "react";
import logo from '../Images/logo.jpg'
import CreatNewBtn from "./CreatNewBtn";
import { Search } from "lucide-react";
import ThreeBlockes from "./threeBlockes";

const Table = () => {
  const data = [
    {
      id: 1,
      image: logo, // Replace with actual image URLs
      name: "John Doe",
      email: "john.doe@example.com",
      designation: "Developer",
      gender: "Male",
      course: "B.Tech",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      image: logo,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      designation: "Designer",
      gender: "Female",
      course: "B.Sc",
      joinDate: "2022-05-10",
    },
    {
      id: 3,
      image: logo,
      name: "Sam Wilson",
      email: "sam.wilson@example.com",
      designation: "Marketing",
      gender: "Male",
      course: "MBA",
      joinDate: "2021-09-20",
    },
  ];

  const [search, setSearch] = useState('');
 

  return (
    <>
    <ThreeBlockes/>
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
    <CreatNewBtn/>
    <div className="absolute left-80 top-90">
    <div className="w-3/4 mt-10">
      <div className="items-left justify-left">
      <h1 className="text-2xl font-bold mb-4">Employee Table</h1>
      </div>
      <div className="rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {data.filter((employee) => {
              return search.toLowerCase() === '' ? employee : employee.name.toLowerCase().includes(search.toLowerCase());
            }).map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-100 transition-colors"
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
                  {employee.course}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {employee.joinDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  );
};

export default Table;
