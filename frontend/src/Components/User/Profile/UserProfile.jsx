import { useEffect, useState } from 'react';
import logo from '../Images/logo.jpg';
import asad_master from '../Images/asad_master.jpg';
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserEdit, FaTimes, FaSave, FaBuilding, FaGenderless } from 'react-icons/fa';
import { use } from 'react';

const UserProfile = () => {
    const [modal, setModal] = useState(false);
    const [userName, setUserName] = useState(false);
    const [userDesignation, setUserDesignation] = useState(false);
    const [userJoinDate, setUserJoinDate] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [userGender, setUserGender] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("name") || "Guest"
        const storedDesignation = localStorage.getItem("designation") || "Guest"
        const storedJoinDate = localStorage.getItem("joindate") || "Not Available"
        const storedEmail = localStorage.getItem("email") || "Not Available"
        const storedGender = localStorage.getItem("gender") || "Not Available"

        setUserName(storedName)
        setUserDesignation(storedDesignation)
        setUserJoinDate(storedJoinDate)
        setUserEmail(storedEmail)
        setUserGender(storedGender)
    }, [])

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        
        const {name , value} = e.target
        if(name === "name") setUserName(value)
        if(name === "email") setUserEmail(value)
        if(name === "designation") setUserDesignation(value)
        if(name === "joindate") setUserJoinDate(value)
        if(name === "gender") setUserGender(value)
        
    }
    const token = localStorage.getItem("jwtToken")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData = {
            name: userName,
            email: userEmail,
            designation: userDesignation,
            gender: userGender,
            joindate: userJoinDate
        }
        try {
            const response = await fetch("http://localhost:8080/update/profile", {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            })

            const data = await response.json()
            if(response.ok){
                alert("Data Updated Successfully")
                localStorage.setItem("name" , userName)
                localStorage.setItem("email" , userEmail)
                localStorage.setItem("gender" , userGender)
                localStorage.setItem("joindate" , userJoinDate)
                localStorage.setItem("designation" , userDesignation)
            }else{
                alert(data.alert || "Error on Updating Data")
            }
            
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile:", error.message)
        }

        // Handle form submission
        toggleModal();
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-6">
                <div className="">
                    <div className="flex flex-row items-center mb-4 text-white">
                        <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                            {/* If you have an image, uncomment this: */}
                            {/* <img src={asad_master} alt="Profile" className="w-full h-full object-cover" /> */}
                            {/* Placeholder if no image: */}
                            <span className="text-4xl font-bold text-blue-600">
                                {userName ? userName.charAt(0).toUpperCase() : "?"}
                            </span>
                        </div>
                            <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800">{userName}</h1>
                            <p className="text-blue-500 font-medium">{userDesignation}</p>
                        </div>
                    </div>

                    <div className="">
                        {/* Row 1: Name and Designation */}
                        
                        
                        {/* Row 2: Join Date and Email */}
                        <div className="flex space-x-4 mb-6">
                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaCalendarAlt className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Join Date</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userJoinDate}</p>
                            </div>
                            
                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-1">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaEnvelope className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Email</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userEmail}</p>
                            </div>
                        </div>
                        
                        {/* Row 3: Phone Number */}
                        <div className="bg-blue-50 p-4 rounded-xl mb-4">
                            <div className="flex items-center mb-1">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <FaGenderless className="text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-500">Gender</p>
                            </div>
                            <p className="font-medium text-gray-800 ml-11">{userGender}</p>
                        </div>

                        <button 
                            onClick={toggleModal}
                            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-700 transition-all duration-300"
                        >
                            <FaUserEdit />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
            
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
                        <div className="bg-blue-600 p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                            <button 
                                onClick={toggleModal}
                                className="text-white hover:text-blue-200 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={userDesignation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Join Date</label>
                                <input
                                    type="text"
                                    name="join_date"
                                    value={userJoinDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userEmail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Gender</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userGender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
{/*                             
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Profile Image</label>
                                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl border-dashed flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="opacity-0 absolute"
                                        accept="image/*"
                                    />
                                </div>
                            </div> */}
                            
                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors flex items-center space-x-2"
                                >
                                    <FaTimes size={16} />
                                    <span>Cancel</span>
                                </button>
                                
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2"
                                >
                                    <FaSave size={16} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;