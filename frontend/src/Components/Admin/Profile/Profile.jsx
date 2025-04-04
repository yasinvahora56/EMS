import { useEffect, useState } from 'react';
import logo from '../Images/logo.jpg';

const Profile = () => {

    const [modal, setModal] = useState();
    const [adminName, setAdminName] = useState();
    const [adminEmail, setAdminEmail] = useState();
    const [adminDesignation, setAdminDesignation] = useState();
    const [adminPassword, setAdminPassword] = useState();
    const [adminJoinDate, setAdminJoinDate] = useState();

    useEffect(() => {
        const storedName = localStorage.getItem("name") || "Guest"
        const storedEmail = localStorage.getItem("email") || "Guest"
        const storedPassword = localStorage.getItem("password") || ""
        const storedDesignation = localStorage.getItem("designation") || "Guest"
        const storedJoinDate = localStorage.getItem("joindate") || "Guest"

        setAdminName(storedName)
        setAdminEmail(storedEmail)
        setAdminPassword(storedPassword)
        setAdminDesignation(storedDesignation)
        setAdminJoinDate(storedJoinDate)

    }, [])

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "name") setAdminName(value)
        if(name === "email") setAdminEmail(value)
        if(name === "designation") setAdminDesignation(value)
        if(name === "joindate") setAdminJoinDate(value)
        if(name === "password") setAdminPassword(value)
    }

    const token = localStorage.getItem("jwtToken")
    const handleSubmit = async () => {
        e.preventDefault()

        const updatedData = {
            name: adminName,
            email: adminEmail,
            designation: adminDesignation,
            joindate: adminJoinDate,
            password: adminPassword
        }

        try{
            const response = await fetch("http://localhost:8080/update/profile", {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
    
            const data = await response.json()
            if(response.ok){
                localStorage.setItem("name", adminName)
                localStorage.setItem("email", adminEmail)
                localStorage.setItem("designation", adminDesignation)
                localStorage.setItem("joindate", adminJoinDate)
                localStorage.setItem("password", adminPassword )
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
                        {/* <img src={logo} alt="Profile" className='w-24 h-24 mx-auto rounded-full border-4 border-gray-300' /> */}
                        <h2 className='text-xl font-semibold text-gray-900'>{adminName}</h2>
                        <p className='text-gray-600 '>{adminDesignation}</p>
                        <div className='text-left space-y-2 mt-4'>
                            <div className='flex justify-between text-gray-700'>
                                <span className='font-semibold'>Join Date:</span>
                                <span>{adminJoinDate}</span>
                            </div>
                            <div className='flex gap-10 justify-between text-gray-700'>
                                <span className='font-semibold'>Email:</span>
                                <span className=''>{adminEmail}</span>
                            </div>
                            <div className='flex justify-between text-gray-700'>
                                <span className='font-semibold'>password:</span>
                                <span>{adminPassword}</span>
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
        {modal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
                    <form onSubmit={handleSubmit} action="">
                    <div className='bg-white p-6 rounded-lg shadow-xl w-96'>
                 
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={adminName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="designation">Designation:</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={adminDesignation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={adminEmail}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="joindate">Join Date:</label>
                                    <input
                                        type="text"
                                        name="joindate"
                                        value={adminJoinDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={adminPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                {/* <div>
                                    <label htmlFor="phone">Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editEmployee.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div> */}
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
