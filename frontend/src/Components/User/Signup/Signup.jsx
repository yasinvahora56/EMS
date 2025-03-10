import { Link } from "react-router-dom";
import logo from "./Image/Login.png";
import { User, Lock, Building } from 'lucide-react';

const Signup = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-900 to-black flex flex-col justify-center items-center ">
        <div className="space-y-6 w-full max-w-md mx-auto">
          {/* Form starts here */}
          <form className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-white text-center">Signup</h2>

            {/* Name Field */}
            <div className="relative">
              <label className="text-gray-300 text-sm font-medium mb-2 block">Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="text-gray-300 text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Gender, Course, Join Date */}
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-3 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                  placeholder="Gender"
                />
              </div>
              <div className="w-1/3">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Course</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-3 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                  placeholder="Course"
                />
              </div>
              <div className="w-1/3">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Join Date</label>
                <input
                  type="date"
                  id="joindate"
                  name="joindate"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-3 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                />
              </div>
            </div>

            {/* Employee ID & Designation */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Employee ID</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="id"
                    name="id"
                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                    placeholder="Enter your ID"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Designation</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                    placeholder="Enter your Designation"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-gray-300 text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer mt-2">
              Signup
            </button>

            <p className="text-white mt-1">
              Already have an account? 
              <Link to={'/Login'} className="text-blue-400 hover:text-blue-500 transition-all duration-300">
                Login
              </Link>
            </p>
          </form>
          {/* Form ends here */}
        </div>
      </div>

      {/* Right Panel - Image Only */}
      <div className="w-1/2 bg-gray-100">
              <div className="flex items-center justify-center h-screen">
                <img 
                  src={logo} 
                  alt="Login"
                  className="object-cover h-130 w-130"
                />
              </div>
            </div>
    </div>
  );
}

export default Signup;
