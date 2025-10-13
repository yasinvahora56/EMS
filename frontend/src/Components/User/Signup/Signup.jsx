import { Link, useNavigate } from "react-router-dom"
import logo from "./image/Login.png"
import { User, Lock, Building, Mail, Calendar, Tag, UserCircle } from 'lucide-react'
import { useState } from "react"
import { BACKEND_URL } from "../../../config/config"
import { handleError, handleSuccess } from "../../../../utils"
import { Phone } from "lucide-react"

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
   name: "",
    email: "",
    gender: "",
    course: "",
    joindate: "",
    department: "",
    password: "",
    phone: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
    const {
      name, email, gender, course, joindate, department, password
    } = signupInfo;
    
    if (!name || !email || !gender || !course || !joindate || !department || !password ) {
      return handleError("Please fill all fields");
    }
    
      try {
        const url = `${BACKEND_URL}/auth/signup`
        const response = await fetch (url, {
          method : "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(signupInfo)
        })
        const result = await response.json()
        const { success, message, error } = result
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else if (error) {
          if (error.details) {
            handleError(error.details); // Show backend validation error
          }else if(!success){
            handleError(message)
          } else {
            handleError("Signup failed. Please try again.")
          }
        }
      } catch (error) {
        handleError(error.message || "An unexpected error occurred")
      }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Panel - Signup Form */}
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-800">Create Account</h2>
                <p className="text-gray-500 mt-2">Join our platform today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={signupInfo.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                  />
                </div>

                 <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={signupInfo.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Row with Gender, Course, Join Date */}
                <div className="flex space-x-2">
                  <div className="w-1/3">
                    <select
                    name="gender"
                    value={signupInfo.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  </div>
                  <div className="w-1/3">
                    <input
                      type="text"
                      name="course"
                      placeholder="Course"
                      value={signupInfo.course}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                    />
                  </div>
                  <div className="w-1/3">
                    <input
                      type="date"
                      name="joindate"
                      value={signupInfo.joindate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                    />
                  </div>
                </div>

                {/* Row department */}
              
                  <div className="w-1/2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-indigo-400" />
                    </div>
                    <select
                      name="department"
                      value={signupInfo.department}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Department</option>
                      <option value="Designing">Designing</option>
                      <option value="Development">Development</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                    </div>
                  </div>
              

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Sign Up
                </button>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Already have an account? 
                    <Link 
                      to="/Login" 
                      className="text-indigo-600 hover:text-indigo-800 ml-2 font-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="w-1/2 bg-indigo-50 flex items-center justify-center p-8">
            <img 
              src={logo} 
              alt="Signup Illustration"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup