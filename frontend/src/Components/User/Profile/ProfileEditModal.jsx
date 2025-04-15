// components/profile/ProfileEditModal.jsx
import React from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const ProfileEditModal = ({ editData, handleChange, handleSubmit, toggleModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-fadeIn">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                    <button
                        onClick={toggleModal}
                        className="text-white hover:text-blue-200 transition-colors focus:outline-none bg-blue-700 hover:bg-blue-800 rounded-full p-2"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Form */}
                <form className="p-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"  
                                        id="employeeName"
                                        name="employeeName"
                                        value={editData.employeeName || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address<span className='text-red-500'>*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editData.email || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className='text-red-500'>*</span></label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        value={editData.phone || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="123-456-7890"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select 
                                        name="gender" 
                                        id="gender"
                                        value={editData.gender || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input 
                                        type="text" 
                                        id="address" 
                                        name="address"
                                        value={editData.address || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="123 Main St"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        name="city"
                                        value={editData.city || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="New York"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input 
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        maxLength="6"
                                        value={editData.pincode || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="123456"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Professional Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department<span className='text-red-500'>*</span></label>
                                    <select 
                                        name="department" 
                                        id="department" 
                                        value={editData.department || 'Select'}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        required
                                    >
                                        <option value="Select" disabled>Select</option>
                                        <option value="Designing">Designing</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Development">Development</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                                    <select 
                                        name="designation" 
                                        id="designation"
                                        value={editData.designation || 'Select'}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    >
                                        <option value="Select" disabled>Select</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Social Media Manager">Social Media Manager</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager</label>
                                    <input 
                                        type="text" 
                                        name="manager" 
                                        id="manager"
                                        value={editData.manager || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                                    <input 
                                        type="date" 
                                        name="joinDate" 
                                        id="joinDate"
                                        value={editData.joinDate || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                            
                            {/* Education & Qualifications */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Education & Qualifications</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <label htmlFor="degreeName" className="block text-sm font-medium text-gray-700">Degree Name</label>
                                        <input 
                                            type="text" 
                                            id="degreeName" 
                                            name="degreeName"
                                            value={editData.degreeName || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Bachelor of Science"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="collageName" className="block text-sm font-medium text-gray-700">College Name</label>
                                        <input 
                                            type="text" 
                                            id="collageName" 
                                            name="collageName"
                                            value={editData.collageName || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="University of Example"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
                                        <input 
                                            type="text" 
                                            id="graduationYear" 
                                            name="graduationYear"
                                            value={editData.graduationYear || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="2020"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                                        <input 
                                            type="text" 
                                            id="skills" 
                                            name="skills"
                                            value={editData.skills || ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="React, HTML, CSS"
                                        />
                                        <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form Actions */}
                    <div className="mt-8 flex justify-end space-x-4">
                        <button 
                            type="button"
                            onClick={toggleModal} 
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center"
                        >
                            <FaTimes className="mr-2" />
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center"
                        >
                            <FaSave className="mr-2" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditModal;