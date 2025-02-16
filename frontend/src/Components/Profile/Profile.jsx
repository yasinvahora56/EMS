import { useState } from 'react';
import logo from '../Images/logo.jpg';

const Profile = () => {

    const [modal, setModal] = useState();

    const ToggleModal = () => {
        setModal(!modal);
    }

    const Data = [
        {
            name: "Yasin",
            designation: "Owner",
            join_date: "01/02/2025",
            email: "iamyasin@gmail.com",
            phone: "7990980675",
        },
    ];
    return (
        <>
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-white shadow-lg rounded-2xl p-6 max-w-sm text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4 '>Admin Profile</h1>
                {Data.map((admin, index) => (
                    <div key={index} className='space-y-4'>
                        <img src={logo} alt="Profile" className='w-24 h-24 mx-auto rounded-full border-4 border-gray-300' />
                        <h2 className='text-xl font-semibold text-gray-900'>{admin.name}</h2>
                        <p className='text-gray-600 '>{admin.designation}</p>
                        <div className='text-left space-y-2 mt-4'>
                            <div className='flex justify-between text-gray-700'>
                                <span className='font-semibold'>Join Date:</span>
                                <span>{admin.join_date}</span>
                            </div>
                            <div className='flex gap-10 justify-between text-gray-700'>
                                <span className='font-semibold'>Email:</span>
                                <span className=''>{admin.email}</span>
                            </div>
                            <div className='flex justify-between text-gray-700'>
                                <span className='font-semibold'>Phone:</span>
                                <span>{admin.phone}</span>
                            </div>
                        </div>
                        <button 
                        className='bg-blue-400 w-full px-4 py-2 rounded-full text-white'
                        onClick={ToggleModal}
                        >Edit Profile</button>
                    </div>
                ))}
            </div>
        </div>
        
        <div className=''>
        {modal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-6 rounded-lg shadow-xl w-96'>
                        {Data.map((editEmployee) => (
                            <div key={editEmployee.email} className='space-y-4'>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editEmployee.name}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="designation">Designation:</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={editEmployee.designation}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editEmployee.email}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editEmployee.phone}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-full"
                                        onClick={ToggleModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className='bg-blue-400 px-4 py-2 rounded-full text-white'>
                                        Save
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        </>
    );
};

export default Profile;
