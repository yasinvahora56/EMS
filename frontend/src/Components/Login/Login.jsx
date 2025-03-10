import { Link } from "react-router-dom";
import logo from "./Images/Login.png"
import { User, Lock, Building } from 'lucide-react';

const Login = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="w-1/2 bg-gradient-to-br from-gray-900 to-black ">
        <div className="mt-4 ml-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-xl font-bold text-white transition-all duration-300 transform px-3 py-2 rounded-lg">Made By Yasin</button>
        </div>

        <div className="mb-12 text-center">
          <p className="text-gray-400">Welcome back! Please login to your account.</p>
        </div>
      <div className="space-y-6">

        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-white text-center">Login</h2>
            
              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Employee ID</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    placeholder="Enter your ID"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-gray-300 text-sm font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full bg-gray-700/50 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer">
                Login
              </button>
              <p className="text-white">Don't Have an Account <Link to={'/Signup'}>Signup</Link></p>
            </div>
          </div>
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
};

export default Login;