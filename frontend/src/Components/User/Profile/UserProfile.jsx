// import { useEffect, useState } from 'react';
// import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserEdit, FaTimes, FaSave, FaGenderless } from 'react-icons/fa';
// import { BACKEND_URL, token } from "../../../config/config";

// const UserProfile = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [userData, setUserData] = useState({
//             name : "",
//             email: "",
//             phone: "",
//             gender : ["male", "female", "other"],
//             pincode: "",
//             department: ["Select", "Designing", "Social Media", "Development"],
//             designation: ["Select", "Developer", "Designer", "Social Media Manager"],
//             manager: "",
//             joinDate: "",
//             degreeName : "",
//             graduationYear : "",
//             collageName: "",
//             skills : "",     
//     });
//     const [editData, setEditData] = useState({})
    

//     // Fetch user profile data from the backend
//     const fetchUserProfile = async () => {
//         try {
//             const response = await fetch(`${BACKEND_URL}/profile/myProfile`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setUserData({
//                     name: data.employeeData.name || 'Guest',
//                     email: data.employeeData.email || 'Not Available',
//                     phone: data.employeeData.phone || 'Not Available',
//                     gender: data.employeeData.gender || 'Not Available',
//                     pincode: data.employeeData.pincode || 'Not Available',
//                     department: data.employeeData.department || 'Not Available',
//                     designation: data.employeeData.designation || 'Not Available',
//                     manager: data.employeeData.manager || 'Not Available',
//                     joinDate: data.employeeData.joindate || 'Not Available',
//                     degreeName: data.employeeData.degreeName || 'Not Available',
//                     graduationYear: data.employeeData.graduationYear || 'Not Available',
//                     collageName: data.employeeData.collageName || 'Not Available',
//                     skills: data.employeeData.skills || 'Not Available',
//                     role:data.employeeData.role || 'Not Available',
//                 });
//             } else {
//                 console.error("Error fetching profile:", data.message);
//                 alert("Error fetching profile data");
//             }
//         } catch (error) {
//             console.error("Error fetching profile:", error);
//             alert("Error fetching profile data");
//         }
//     };

//     // Fetch profile on mount
//     useEffect(() => {
//         fetchUserProfile();
//     }, []);

//     // Toggle modal visibility
//     const toggleModal = () => {
//         if(!isModalOpen){
//             setEditData({ ...userData })
//         }
//         setIsModalOpen(!isModalOpen)
//     };

//     // Handle form field changes
//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setUserData((prevData) => ({
//     //         ...prevData,
//     //         [name]: value,
//     //     }));
//     // };

//     // Submit updated profile data to the backend
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`${BACKEND_URL}/profile/update`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(editData),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 // Refetch data after successful update
//                 fetchUserProfile();
//                 toggleModal();
//             } else {
//                 alert(data.message || "Error on updating profile");
//             }
//         } catch (error) {
//             // console.error("Error in updating profile:", error);
//             alert("Error in updating profile");
//         }
//     };

//     return (
//         <>
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-6">
//                 <div>
//                     <div className="flex flex-row items-center mb-4 text-white">
//                         <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
//                             <span className="text-4xl font-bold text-blue-600">
//                                 {userData.name ? userData.name.charAt(0).toUpperCase() : "?"}
//                             </span>
//                         </div>
//                         <div className="text-center">
//                             <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
//                             <p className="text-blue-500 font-medium">{userData.designation}</p>
//                         </div>
//                     </div>

//                     <div>
//                         {/* Row 1: Name and Designation */}
//                         <div className="flex space-x-4 mb-6">
//                             <div className="flex-1 bg-blue-50 p-4 rounded-xl">
//                                 <div className="flex items-center mb-2">
//                                     <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                         <FaCalendarAlt className="text-blue-600" />
//                                     </div>
//                                     <p className="text-sm text-gray-500">Join Date</p>
//                                 </div>
//                                 <p className="font-medium text-gray-800 ml-11">{userData.joinDate}</p>
//                             </div>

//                             <div className="flex-1 bg-blue-50 p-4 rounded-xl">
//                                 <div className="flex items-center mb-1">
//                                     <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                         <FaEnvelope className="text-blue-600" />
//                                     </div>
//                                     <p className="text-sm text-gray-500">Email</p>
//                                 </div>
//                                 <p className="font-medium text-gray-800 ml-11">{userData.email}</p>
//                             </div>
//                         </div>

//                         {/* Row 2: Gender and Role */}
//                         <div className="flex space-x-4 mb-6">
//                             <div className="flex-1 bg-blue-50 p-4 rounded-xl">
//                                 <div className="flex items-center mb-2">
//                                     <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                         <FaGenderless className="text-blue-600" />
//                                     </div>
//                                     <p className="text-sm text-gray-500">Gender</p>
//                                 </div>
//                                 <p className="font-medium text-gray-800 ml-11">{userData.gender}</p>
//                             </div>

//                             <div className="flex-1 bg-blue-50 p-4 rounded-xl">
//                                 <div className="flex items-center mb-1">
//                                     <div className="bg-blue-100 p-2 rounded-full mr-3">
//                                         <FaPhone className="text-blue-600" />
//                                     </div>
//                                     <p className="text-sm text-gray-500">Role</p>
//                                 </div>
//                                 <p className="font-medium text-gray-800 ml-11">{userData.role}</p>
//                             </div>
//                         </div>

//                         {/* Edit Profile Button */}
//                         <button
//                             onClick={toggleModal}
//                             className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-700 transition-all duration-300"
//                         >
//                             <FaUserEdit />
//                             <span>Edit Profile</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal for Editing Profile */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
//                     <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
//                         <div className="bg-blue-600 p-4 flex justify-between items-center">
//                             <h2 className="text-xl font-bold text-white">Edit Profile</h2>
//                             <button
//                                 onClick={toggleModal}
//                                 className="text-white hover:text-blue-200 transition-colors"
//                             >
//                                 <FaTimes size={20} />
//                             </button>
//                         </div>

//                         <form className="p-6" onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Personal Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                       <input
//                         type="text"  
//                         id="name"
//                         name="name"
//                         value={editData.name}
//                                     onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="John Doe"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address<span className='text-red-500'>*</span></label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={editData.email}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="john@example.com"
//                         required
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500'>*</span></label>
//                       <input 
//                         type="tel" 
//                         id="phone" 
//                         name="phone" 
//                         value={editData.phone}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="123-456-7890"
//                         required
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
//                       <select 
//                         name="gender" 
//                         id="gender"
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       >
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
                    
//                     <div className="space-y-2 md:col-span-2">
//                       <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                       <input 
//                         type="text" 
//                         id="address" 
//                         name="address"
//                         value={editData.address}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="123 Main St"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                       <input 
//                         type="text" 
//                         id="city" 
//                         name="city"
//                         value={editData.city}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="New York"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
//                       <input 
//                         type="text"
//                         id="pincode"
//                         name="pincode"
//                         maxLength="6"
//                         value={editData.pincode}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                         placeholder="123456"
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Professional Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department<span className='bg-red-500'>*</span></label>
//                       <select 
//                         name="department" 
//                         id="department" 
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       >
//                         <option value={"Select"} readOnly>Select</option>
//                         <option value={"Designing"}>Designing</option>
//                         <option value={"Social Media"}>Social Media</option>
//                         <option value={"Development"}>Development</option>
//                       </select>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
//                       <select 
//                         name="designation" 
//                         id="designation"
//                         value={editData.designation}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       >
//                         <option value={"Select"} readOnly>Select</option>
//                         <option value={"Developer"}>Developer</option>
//                         <option value={"Designer"}>Designer</option>
//                         <option value={"Social Media Manager"}>Social Media Manager</option>
//                       </select>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager</label>
//                       <input 
//                         type="text" 
//                         name="manager" 
//                         id="manager"
//                         value={editData.manager}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
//                       <input 
//                         type="date" 
//                         name="joinDate" 
//                         id="joinDate"
//                         value={editData.joinDate}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Education & Qualifications */}
//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Education & Qualifications</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <div className="space-y-2">
//                         <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree Name</label>
//                         <input 
//                           type="text" 
//                           id="degree" 
//                           name="degree"
//                           value={editData.degreeName}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           placeholder="Bachelor of Science"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <label htmlFor="college" className="block text-sm font-medium text-gray-700">College Name</label>
//                         <input 
//                           type="text" 
//                           id="college" 
//                           name="college"
//                           value={editData.degreeName}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           placeholder="University of Example"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <label htmlFor="gradYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
//                         <input 
//                           type="text" 
//                           id="gradYear" 
//                           name="gradYear"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           placeholder="2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label htmlFor="gradYear" className="block text-sm font-medium text-gray-700">Collage Name</label>
//                         <input 
//                           type="text" 
//                           id="gradYear" 
//                           name="gradYear"
//                           value={editData.collageName}
//                         onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           placeholder="2020"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
//                         <input 
//                           type="text" 
//                           id="skills" 
//                           name="skills"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                           placeholder="React, HTML, CSS"
//                         />
//                         <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Form Actions */}
//               <div className="mt-8 flex justify-end space-x-4">
//                 <button 
//                   type="button"
//                   onClick={toggleModal} 
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
//                 >
//                   Save Employee
//                 </button>
//               </div>
//             </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default UserProfile;


// components/profile/UserProfile.jsx
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserEdit, FaTimes, FaGenderless, FaBuilding, FaUser } from 'react-icons/fa';
import { BACKEND_URL, token } from "../../../config/config";
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileEditModal from './ProfileEditModal';

const UserProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        city: "",
        pincode: "",
        department: "",
        designation: "",
        manager: "",
        joinDate: "",
        degreeName: "",
        graduationYear: "",
        collageName: "",
        skills: "",
        role: "",
    });
    const [editData, setEditData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BACKEND_URL}/profile/myProfile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log("Fetch tokem:", token);

            // In UserProfile.jsx, update the fetchUserProfile function:
const data = await response.json();
if (response.ok) {
    const employeeData = data.employeeData || {};
    setUserData({
        name: employeeData.name || 'Guest',
        email: employeeData.email || 'Not Available',
        phone: employeeData.phone || 'Not Available',
        gender: employeeData.gender || 'Not Available',
        address: employeeData.address || 'Not Available',
        city: employeeData.city || 'Not Available',
        pincode: employeeData.pincode || 'Not Available',
        department: employeeData.department || 'Not Available',
        designation: employeeData.designation || 'Not Available',
        manager: employeeData.manager || 'Not Available',
        joinDate: employeeData.joinDate || 'Not Available', // Changed from joindate
        degreeName: employeeData.degreeName || 'Not Available',
        graduationYear: employeeData.graduationYear || 'Not Available',
        collageName: employeeData.collageName || 'Not Available',
        skills: employeeData.skills || 'Not Available',
        role: employeeData.employee?.role || employeeData.role || 'Not Available', // Handle populated data
    });
}
 else {
                setError(data.message || "Error fetching profile data");
                console.error("Error fetching profile:", data.message);
            }
        } catch (error) {
            setError("Error connecting to server");
            console.error("Error fetching profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch profile on mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Toggle modal visibility
    const toggleModal = () => {
        if (!isModalOpen) {
            setEditData({ ...userData });
        }
        setIsModalOpen(!isModalOpen);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submit updated profile data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BACKEND_URL}/profile/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(editData),
            });

            const data = await response.json();
            if (response.ok) {
                // Refetch data after successful update
                fetchUserProfile();
                toggleModal();
                // Show success message
                alert("Profile updated successfully!");
            } else {
                alert(data.message || "Error on updating profile");
            }
        } catch (error) {
            console.error("Error in updating profile:", error);
            alert("Error in updating profile");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl text-red-700 font-bold mb-2">Error</h2>
                    <p className="text-red-600">{error}</p>
                    <button 
                        onClick={fetchUserProfile}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
                    <ProfileHeader 
                        userData={userData} 
                    />

                    <ProfileInfo 
                        userData={userData} 
                        toggleModal={toggleModal}
                    />
                </div>
            </div>

            {/* Modal for Editing Profile */}
            {isModalOpen && (
                <ProfileEditModal 
                    editData={editData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    toggleModal={toggleModal}
                />
            )}
        </>
    );
};

export default UserProfile;
