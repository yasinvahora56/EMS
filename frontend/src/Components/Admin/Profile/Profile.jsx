import { useEffect, useState } from 'react';
import { BACKEND_URL, token } from '../../../config/config';

const Profile = () => {

    const [isModalOpen, setIsModalOpen] = useState();
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        designation: "",
        joindate: "",
    });
    const [editData, setEditData] = useState({});

    const toggleModal = () => {
        if(!isModalOpen){
            setEditData({ ...adminData })
        }
        setIsModalOpen(!isModalOpen);
    }

    const fetchAdminProfile = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/profile/myProfile`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${ token }`
                }
            })
            const data = await response.json()
            if(response.ok){
                setAdminData({
                    name: data.employeeData.name || "Not Available",
                    email: data.employeeData.email || "Not Available",
                    designation: data.employeeData.designation || "Not Available",
                    gender: data.employeeData.gender || "Not Available",
                    course: data.employeeData.course || "Not Available",
                    role: data.employeeData.role || "Not Available",
                    joindate: data.employeeData.joindate || "Not Available",
                })
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchAdminProfile()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${BACKEND_URL}/profile/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            })
    
            const data = await response.json()
            if(response.ok){
                fetchAdminProfile()
                toggleModal()
            }else{
                alert(data.alert || "Error on Updating Data")
            }
        }
        catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile:", error.message)
    }

    // Handle form submission
    toggleModal();
}

    return (
        <>
        <div className='flex flex-col absolute top-30 left-180  max-h-screen'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4 '>Admin Profile</h1>
            <div className='bg-white shadow-lg rounded-2xl p-6 max-w-sm text-center'>
             
                    <div className='space-y-4'>
                        <h2 className='text-xl font-semibold text-gray-900'>{adminData.name}</h2>
                        <p className='text-gray-600 '>{adminData.designation}</p>
                        <div className='text-left space-y-2 mt-4'>
                            <div className='flex justify-between text-gray-700'>
                                <span className='font-semibold'>Join Date:</span>
                                <span>{adminData.joindate}</span>
                            </div>
                            <div className='flex gap-10 justify-between text-gray-700'>
                                <span className='font-semibold'>Email:</span>
                                <span className=''>{adminData.email}</span>
                            </div>
                        </div>
                        <button 
                        className='bg-blue-400 w-full px-4 py-2 rounded-full text-white cursor-pointer'
                        onClick={toggleModal}
                        >Edit Profile</button>
                    </div>
    
            </div>
        </div>
        
        <div className=''>
        {isModalOpen && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
                    <form onSubmit={handleSubmit} action="">
                    <div className='bg-white p-6 rounded-lg shadow-xl w-96'>
                 
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="designation">Designation:</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={editData.designation}
                                        onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="joindate">Join Date:</label>
                                    <input
                                        type="text"
                                        name="joindate"
                                        value={editData.joindate}
                                        onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        disabled
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-full cursor-pointer"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className='bg-blue-400 px-4 py-2 rounded-full text-white cursor-pointer'>
                                        Save
                                    </button>
                                </div>
                            </div>
                    </div>
                    </form>
                </div>
            )}
        </div>

        </>
    );
};

export default Profile;
