import { Link, useNavigate } from "react-router-dom";
import logo from "./Images/Login.png";
import { Lock, Tag } from 'lucide-react';
import { useState } from "react";
import { handleError, handleSuccess } from "../../../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({
      ...prev,
      [name]: value
    }));
  }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = loginInfo;
      
      if ( !email ||!password ) {
        return handleError("Please fill all fields");
      }
      
        try {
          const url = "http://localhost:8080/auth/login"
          const response = await fetch (url, {
            method : "POST",
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(loginInfo)
          })
          const result = await response.json()
          const { success, message, error } = result
          if (success) {
            handleSuccess(message);
            localStorage.setItem("jwtToken", result.jwtToken);
            localStorage.setItem("name", result.name);
            localStorage.setItem("designation", result.designation);
            localStorage.setItem("role", result.role);
            setTimeout(() => {
              if(result.role === "employee"){
              navigate('/employee');
              }
              if(result.role === "admin"){
              navigate('/admin');
              }
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
          {/* Left Panel - Login Form */}
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-800">Welcome Back</h2>
                <p className="text-gray-500 mt-2">Login to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Employee ID Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition duration-300"
                  />
                </div>

                {/* Forgot Password Link */}
                {/* <div className="text-right">
                  <a 
                    href="#" 
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
                  >
                    Forgot Password?
                  </a>
                </div> *}

                {/* Login Button */}
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Login
                </button>

                {/* Signup Link */}
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Don't have an account? 
                    <Link 
                      to="/Signup" 
                      className="text-indigo-600 hover:text-indigo-800 ml-2 font-semibold"
                    >
                      Sign Up
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
              alt="Login Illustration"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;