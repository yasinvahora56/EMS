import React, { useState } from 'react';
import { handleError } from '../../../../utils';

const AddEmployeeBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [employeeInfo, setEmployeeInfo] = useState({
    department:["Select","Designing", "Development", "Social Media"],
    employeeName : "",
    email : "",
    phone : "",
    });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {
        employeeName, department, email,phone
      } = employeeInfo;
      
      if (!employeeName || !department || !email || !phone) {
        return handleError("Please fill all fields");
      }
      
        try {
          const url = "http://localhost:8080/auth/signup"
          const response = await fetch (url, {
            method : "POST",
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(employeeInfo)
          })
          const result = await response.json()
          const { success, message, error } = result
          if (success) {
            handleSuccess(message);
          } else if (error) {
            if (error.details) {
              handleError(error.details); // Show backend validation error
            }else if(!success){
              handleError(message)
            } else {
              handleError("Please try again.")
            }
          }
        } catch (error) {
          handleError(error.message || "An unexpected error occurred")
        }
    }



  const departments = [
    { label: "Select", value: "1" },
    { label: "Designing", value: "2" },
    { label: "Development", value: "3" },
    { label: "Social Media", value: "4" },
  ];
  
  const managers = [
    { name: "Select", value: "1" },
    { name: "Muhammad", value: "2" },
    { name: "Subhan", value: "3" },
    { name: "Chirag", value: "4" },
  ];

  const designations = [
    { name: "Select", value: "1" },
    { name: "Graphics Designing", value: "2" },
    { name: "Web Development", value: "3" },
    { name: "Social Media", value: "4" },
  ];

  const handleSelect = (e) => {
    setValue(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div>
      <button 
        onClick={toggleModal} 
        className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow hover:shadow-lg cursor-pointer px-4 py-2 font-medium flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add New Employee
      </button>
      
      {isModalOpen && (
        <div className="fixed ml-20 inset-0 bg-opacity-75 z-0 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
          <h1 className='text-red-600'>Password will be 123456 byDefault Employee Must be Change lattere</h1>
              <button 
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"  
                        id="employeeName"
                        name="employeeName"
                        value={employeeInfo.employeeName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address<span className='text-red-500'>*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={employeeInfo.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500'>*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={employeeInfo.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="123-456-7890"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select 
                        name="gender" 
                        id="gender"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <input 
                        type="text" 
                        id="address" 
                        name="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="New York"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                      <input 
                        type="text"
                        id="pincode"
                        name="pincode"
                        maxLength="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department<span className='bg-red-500'>*</span></label>
                      <select 
                        name="department" 
                        id="department" 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value={"Select"} readOnly>Select</option>
                        <option value={"Designing"}>Designing</option>
                        <option value={"Social Media"}>Social Media</option>
                        <option value={"Development"}>Development</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                      <select 
                        name="designation" 
                        id="designation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        {designations.map((option) => (
                          <option key={option.value} value={option.value}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager</label>
                      <select 
                        name="manager" 
                        id="manager" 
                        onChange={handleSelect}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        {managers.map((select) => (
                          <option key={select.value} value={select.value} >{select.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                      <input 
                        type="date" 
                        name="joinDate" 
                        id="joinDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  {/* Education & Qualifications */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Education & Qualifications</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree Name</label>
                        <input 
                          type="text" 
                          id="degree" 
                          name="degree"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="college" className="block text-sm font-medium text-gray-700">College Name</label>
                        <input 
                          type="text" 
                          id="college" 
                          name="college"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="University of Example"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="gradYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <input 
                          type="text" 
                          id="gradYear" 
                          name="gradYear"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="2020"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                        <input 
                          type="text" 
                          id="skills" 
                          name="skills"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="React, HTML, CSS"
                        />
                        <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={toggleModal} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeBtn;