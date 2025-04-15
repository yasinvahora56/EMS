import React, { useEffect, useState } from "react";
import { Search, Mail, Phone, MapPin, Briefcase, Calendar, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { BACKEND_URL, token } from '../../../config/config';
import AddEmployeeBtn from './addEmployeeBtn.jsx'

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store original data for filtering
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [courseOptions, setCourseOptions] = useState([]); // Store unique course options
  const [statusOptions, setStatusOptions] = useState(['Active', 'Inactive', 'On Leave']); // Default status options
  const [filters, setFilters] = useState({
    course: '',
    status: ''
  });

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
      console.log("All employee data:", data);
      
      let employeeArray = [];
      if (response.ok) {
        if (Array.isArray(data.employeeData)) {
          employeeArray = data.employeeData;
        } else if (data.employeeData) {
          employeeArray = [data.employeeData];
        } else if (Array.isArray(data)) {
          employeeArray = data;
        } else {
          employeeArray = [data];
        }
        
        setEmployeeData(employeeArray);
        setOriginalData(employeeArray);
        
        // Extract unique course options from fetched data
        const uniqueCourses = [...new Set(employeeArray
          .filter(emp => emp.course) // Filter out undefined or null courses
          .map(emp => emp.course))];
        setCourseOptions(uniqueCourses);
        
        // Extract unique status options if available in the data
        const uniqueStatuses = [...new Set(employeeArray
          .filter(emp => emp.status) // Filter out undefined or null statuses
          .map(emp => emp.status))];
        if (uniqueStatuses.length > 0) {
          setStatusOptions(uniqueStatuses);
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
      console.log("Single employee data:", data);
      
      if (response.ok) {
        if (data.employee) {
          setSelectedEmployee(data.employee);
        } else if (data.employeeData) {
          setSelectedEmployee(data.employeeData);
        } else if (Array.isArray(data)) {
          setSelectedEmployee(data[0]);
        } else if (data._id || data.id || data.name) {
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

  // Apply all filters
  const applyFilters = () => {
    let filteredData = [...originalData];
    
    // Apply course filter if selected
    if (filters.course) {
      filteredData = filteredData.filter(emp => 
        emp.course && emp.course.toLowerCase() === filters.course.toLowerCase()
      );
    }
    
    // Apply status filter if selected
    if (filters.status) {
      filteredData = filteredData.filter(emp => 
        // If status exists in data, use it, otherwise use the "Active" from UI
        (emp.status && emp.status.toLowerCase() === filters.status.toLowerCase()) ||
        (!emp.status && filters.status.toLowerCase() === 'active')
      );
    }
    
    // Apply search filter if entered
    if (search) {
      filteredData = filteredData.filter(emp => 
        (emp.name && emp.name.toLowerCase().includes(search.toLowerCase())) ||
        (emp.designation && emp.designation.toLowerCase().includes(search.toLowerCase())) ||
        (emp.email && emp.email.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    setEmployeeData(filteredData);
  };
  
  // // Reset all filters
  // const resetFilters = () => {
  //   setFilters({
  //     course: '',
  //     status: ''
  //   });
  //   setSearch('');
  //   setEmployeeData(originalData);
  // };
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Effect to apply filters when filters or search change
  useEffect(() => {
    applyFilters();
  }, [filters, search]);

  return (
    <>
      <div className="p-6 ml-20">
        {/* Header Section with Search and Filters */}
        <div className="bg-white shadow-md rounded-lg px-6 py-4 mb-4 w-full md:w-4/5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-60">
              <input
                className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">Filter by:</span>
              </div>
              
              {/* Course Filter */}
              <div>
                <select 
                  className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.course}
                  onChange={(e) => handleFilterChange('course', e.target.value)}
                >
                  <option value="">All Courses</option>
                  {courseOptions.map((course, index) => (
                    <option key={index} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <select 
                  className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              {/* Reset Filters Button */}
              {/* <button
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                onClick={resetFilters}
              >
                Reset
              </button> */}
              <AddEmployeeBtn/>
            </div>
          </div>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-4/5">
          {employeeData.map((employee) => (
            <div 
              key={employee._id || employee.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-2 bg-blue-600"></div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                    {/* Placeholder for employee image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                      {employee.name ? employee.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded-full">
                    {employee.status || "Active"}
                  </span>
                </div>
                
                <h2 className="font-bold text-lg mb-1">{employee.name || "N/A"}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  {employee.designation || "N/A"} • {employee.course || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">{employee.email || "N/A"}</p>
                <p className="text-sm text-gray-600 mb-3">Join Date: {employee.joindate || "N/A"}</p>
                <p className="text-sm text-gray-600">Gender: {employee.gender || "N/A"}</p>
                
                <div className="mt-4 flex justify-end">
                  <button  
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => toggleModal(employee)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message if no employees found */}
        {employeeData.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center w-full md:w-4/5">
            <p className="text-gray-600">No employees found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Full Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto ml-55">
          <div className="container px-4 py-6">
            {/* Header with title and close button */}
            <div className="flex flex-col mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Employee Profile</h1>
              <p className="text-gray-600">View and manage employee details</p>

              <button
                className="absolute top-6 right-6 bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100"
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
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side - Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-6 w-80 md:w-1/3">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {selectedEmployee.name ? selectedEmployee.name.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-center">{selectedEmployee.name || "N/A"}</h2>
                    <p className="text-gray-600">{selectedEmployee.designation || "N/A"}</p>
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium py-1 px-3 rounded-full">
                        {selectedEmployee.status || "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-gray-500" />
                      <span className="text-gray-700">{selectedEmployee.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gray-500" />
                      <span className="text-gray-700">{selectedEmployee.phone || "(555) 123-4567"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-gray-500" />
                      <span className="text-gray-700">{selectedEmployee.location || "San Francisco, CA"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase size={18} className="text-gray-500" />
                      <span className="text-gray-700">{selectedEmployee.department || "Engineering"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-gray-500" />
                      <span className="text-gray-700">Joined {selectedEmployee.joindate || "N/A"}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills ? (
                        selectedEmployee.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">React</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">TypeScript</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">Node.js</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">GraphQL</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">AWS</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Tabs & Content */}
                <div className="bg-white rounded-lg shadow-md w-full md:w-2/3">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200">
                    <button 
                      className={`py-4 px-6 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button 
                      className={`py-4 px-6 font-medium ${activeTab === 'performance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('performance')}
                    >
                      Performance
                    </button>
                    <button 
                      className={`py-4 px-6 font-medium ${activeTab === 'timeoff' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('timeoff')}
                    >
                      Time Off
                    </button>
                    <button 
                      className={`py-4 px-6 font-medium ${activeTab === 'education' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('education')}
                    >
                      Education
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">About</h3>
                        <p className="text-gray-700 mb-6">
                          {selectedEmployee.about || "Experienced developer with a focus on frontend technologies. Loves solving complex problems and mentoring junior developers."}
                        </p>

                        <h3 className="text-lg font-bold mb-3">Work Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-600">Department</p>
                            <p className="font-medium">{selectedEmployee.department || "Engineering"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Manager</p>
                            <p className="font-medium">{selectedEmployee.manager || "Sarah Wilson"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Position</p>
                            <p className="font-medium">{selectedEmployee.designation || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Course</p>
                            <p className="font-medium">{selectedEmployee.course || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gender</p>
                            <p className="font-medium">{selectedEmployee.gender || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'performance' && (
                      <div className="text-center p-12">
                        <p className="text-gray-600">Performance data will be displayed here.</p>
                      </div>
                    )}

                    {activeTab === 'timeoff' && (
                      <div className="text-center p-12">
                        <p className="text-gray-600">Time off information will be displayed here.</p>
                      </div>
                    )}

                    {activeTab === 'education' && (
                      <div className="text-center p-12">
                        <p className="text-gray-600">Education history will be displayed here.</p>
                      </div>
                    )}
                  </div>
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

// https://preview--sleek-employee-view.lovable.app/

export default Employee;