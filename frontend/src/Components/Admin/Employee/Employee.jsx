import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { BACKEND_URL, token } from '../../../config/config';

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = async (employee) => {
    if (!isModalOpen) {
      setIsLoading(true);
      setSelectedEmployee(employee);
      setIsLoading(false);
    } else {
      setSelectedEmployee(null);
    }
    setIsModalOpen(!isModalOpen);
  }

  const fetchAllEmployee = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/employee/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log("All employee data:", data); // Debug log
      
      if (response.ok) {
        if (Array.isArray(data.employeeData)) {
          setEmployeeData(data.employeeData);
        } else if (data.employeeData) {
          setEmployeeData([data.employeeData]);
        } else if (Array.isArray(data)) {
          setEmployeeData(data);
        } else {
          setEmployeeData([data]);
        }
      }
    } catch (error) {
      console.log("Error During Fetch Employee Data", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  const fetchEmployee = async (employeeId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/employee/${employeeId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      console.log("Single employee data:", data); // Debug log to see structure
      
      if (response.ok) {
        if (data.employee) {
          setSelectedEmployee(data.employee);
        } else if (data.employeeData) {
          setSelectedEmployee(data.employeeData);
        } else if (Array.isArray(data)) {
          setSelectedEmployee(data[0]);
        } else if (data._id || data.id || data.name) {
          // If it has typical employee properties, use it directly
          setSelectedEmployee(data);
        } else {
          console.error("Unexpected data format:", data);
          alert("Could not load employee details. See console for more info.");
        }
      }
    } catch (error) {
      console.log("Error During Fetch One Employee Data", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Debug function to inspect object structure
  const debugObject = (obj) => {
    if (!obj) return "null or undefined";
    
    try {
      return JSON.stringify(obj, null, 2);
    } catch (error) {
      return "Error stringifying object";
    }
  };

  return (
    <>
      <div className="p-6 ml-20">
        {/* Header Section with Search */}
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

        {/* Employee Table */}
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
                search.toLowerCase() === '' ? employee : 
                (employee.name && employee.name.toLowerCase().includes(search.toLowerCase()))
              ).map((employee, index) => (
                <tr 
                  key={employee._id || employee.id} 
                  onClick={() => toggleModal(employee)} // Pass entire employee object
                  className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                >
                  <td className="py-3 px-4">{index + 1}</td>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Employee Details</h2>
              <button
                className="bg-gray-300 px-4 py-2 rounded-full cursor-pointer"
                onClick={() => toggleModal()}
              >
                Close
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-4">
                <p>Loading employee data...</p>
              </div>
            ) : selectedEmployee ? (
              <div className="space-y-4">
                
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedEmployee.name || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={selectedEmployee.email || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="designation">Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    value={selectedEmployee.designation || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="gender">Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={selectedEmployee.gender || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="course">Course:</label>
                  <input
                    type="text"
                    name="course"
                    value={selectedEmployee.course || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="joindate">Join Date:</label>
                  <input
                    type="text"
                    name="joindate"
                    value={selectedEmployee.joindate || "N/A"}
                    className="w-full px-4 py-2 border rounded-lg"
                    disabled
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p>No employee data available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Employee;