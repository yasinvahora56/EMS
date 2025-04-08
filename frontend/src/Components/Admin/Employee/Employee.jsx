import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { BACKEND_URL, token } from '../../../config/config';
const Employee = () => {
  const[employeeData, setEmployeeData] = useState([])
  const[employee, setEmployee] = useState([])
  const [isModalOpen, setIsModalOpen] = useState();
const toggleModal = (employeeId) => {
        // if(!isModalOpen){
        //     setEditData({ ...adminData })
        // }
        fetchEmployee(employeeId)
        setIsModalOpen(!isModalOpen);
    }

  const fetchAllEmployee = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/employee/`,{
        method:"GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()
      if(response.ok){
       
        if(Array.isArray(data.employeeData)){
          setEmployeeData(data.employeeData)
        }else{
          setEmployeeData([data.employeeData])
        }

      }
      console.log("Data fetched Successfully", data)
    } catch (error) {
      console.log("Error During Fetch Employee Data",error)
    }
  }

  useEffect(() => {
    fetchAllEmployee()
  }, [])

  const fetchEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/employee/${employeeId}`, {
        methode: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (response.ok) {
        setEmployee(data.leaves);
    }
    } catch (error) {
      console.log("Error During Fetch One Employee Data",error)
    }
  }

  const [search, setSearch] = useState('');
 

  return (
    <>
       <div className="p-6 ml-20 "> {/* Sidebar ke hisaab se margin & width adjust ki */}
          
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
          </div>

          {/* 🔹 Employee Table */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-[80%]">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Id</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Designation</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">Course</th>
                  <th className="py-3 px-4 text-left">Join Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {employeeData.filter(employee => 
                  search.toLowerCase() === '' ? employee : employee.name.toLowerCase().includes(search.toLowerCase())
                ).map((employee) => (
                  <tr key={employee.id} onClick={() => toggleModal(employee._id)} className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <td className="py-3 px-4">{employee.id}</td>
                    <td className="py-3 px-4">{employee.name}</td>
                    <td className="py-3 px-4">{employee.email}</td>
                    <td className="py-3 px-4">{employee.designation}</td>
                    <td className="py-3 px-4">{employee.gender}</td>
                    <td className="py-3 px-4">{employee.course}</td>
                    <td className="py-3 px-4">{employee.joindate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=''>
        {isModalOpen && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
                    
                    <div className='bg-white p-6 rounded-lg shadow-xl w-96'>
                    <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-full cursor-pointer"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={"hey"}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name">Email:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={employee.name}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label htmlFor="designation">Designation:</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={"Hey"}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={"Hey"}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="joindate">Join Date:</label>
                                    <input
                                        type="text"
                                        name="joindate"
                                        value={"hey"}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        disabled
                                    />
                                </div>
                                
                            </div>
                    </div>
                   
                </div>
            )}
        </div>
   
    </>
  );
};

export default Employee;
