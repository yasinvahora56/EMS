import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserEdit, FaTimes, FaSave, FaGenderless } from 'react-icons/fa';
import { BACKEND_URL, token } from "../../../config/config";

const UserProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: '',
        role: '',
        course: '',
        joinDate: '',
        designation: '',
    });
    const [editData, setEditData] = useState({})
    

    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/profile/myProfile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUserData({
                    name: data.employeeData.name || 'Guest',
                    email: data.employeeData.email || 'Not Available',
                    gender: data.employeeData.gender || 'Not Available',
                    course: data.employeeData.course || 'Not Available',
                    joinDate: data.employeeData.joindate || 'Not Available',
                    role:data.employeeData.role || 'Not Available',
                    designation: data.employeeData.designation || 'Not Available',
                });
            } else {
                console.error("Error fetching profile:", data.message);
                alert("Error fetching profile data");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            alert("Error fetching profile data");
        }
    };

    // Fetch profile on mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Toggle modal visibility
    const toggleModal = () => {
        if(!isModalOpen){
            setEditData({ ...userData })
        }
        setIsModalOpen(!isModalOpen)
    };

    // Handle form field changes
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

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
            } else {
                alert(data.message || "Error on updating profile");
            }
        } catch (error) {
            // console.error("Error in updating profile:", error);
            alert("Error in updating profile");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-6">
                <div>
                    <div className="flex flex-row items-center mb-4 text-white">
                        <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                            <span className="text-4xl font-bold text-blue-600">
                                {userData.name ? userData.name.charAt(0).toUpperCase() : "?"}
                            </span>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                            <p className="text-blue-500 font-medium">{userData.designation}</p>
                        </div>
                    </div>

                    <div>
                        {/* Row 1: Name and Designation */}
                        <div className="flex space-x-4 mb-6">
                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaCalendarAlt className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Join Date</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userData.joinDate}</p>
                            </div>

                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-1">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaEnvelope className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Email</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userData.email}</p>
                            </div>
                        </div>

                        {/* Row 2: Gender and Role */}
                        <div className="flex space-x-4 mb-6">
                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaGenderless className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Gender</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userData.gender}</p>
                            </div>

                            <div className="flex-1 bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center mb-1">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <FaPhone className="text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">Role</p>
                                </div>
                                <p className="font-medium text-gray-800 ml-11">{userData.role}</p>
                            </div>
                        </div>

                        {/* Edit Profile Button */}
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

            {/* Modal for Editing Profile */}
            {isModalOpen && (
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
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={editData.designation}
                                    onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Join Date</label>
                                <input
                                    type="text"
                                    name="joinDate"
                                    value={editData.joinDate}
                                    onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={editData.gender}
                                    onChange={(e) => setEditData({ ...editData, [e.target.name]:e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={userData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div> */}

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={userData.course}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
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
