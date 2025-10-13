// components/profile/ProfileHeader.jsx
import React from 'react';
import { FaBuilding, FaUser } from 'react-icons/fa';

const ProfileHeader = ({ userData }) => {
    return (
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 p-6 pt-16 pb-16 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
                {/* Profile Image */}
                <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center z-10">
                    {userData.name ? (
                        <span className="text-5xl font-bold text-blue-600">
                            {userData.name.charAt(0).toUpperCase()}
                        </span>
                    ) : (
                        <FaUser className="text-5xl text-blue-600" />
                    )}
                </div>

                {/* Profile Title */}
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left text-white z-10">
                    <h1 className="text-3xl font-bold">{userData.name || 'Guest User'}</h1>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-2">
                        <div className="flex items-center">
                            <FaBuilding className="mr-2" />
                            <span>{userData.designation || 'Not Available'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="hidden md:inline">•</span>
                            <span className="ml-2">{userData.department || 'Department not set'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;