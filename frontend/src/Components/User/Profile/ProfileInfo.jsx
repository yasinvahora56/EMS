// components/profile/ProfileInfo.jsx
import React from 'react';
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserEdit, FaGenderless, FaUserGraduate, FaUniversity, FaCalendarCheck, FaIdBadge } from 'react-icons/fa';

const ProfileInfo = ({ userData, toggleModal }) => {
    // Helper function to create info cards
    const InfoCard = ({ icon: Icon, label, value }) => (
        <div className="flex-1 bg-blue-50 p-4 rounded-xl transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Icon className="text-blue-600" />
                </div>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
            <p className="font-medium text-gray-800 ml-11 break-words">{value}</p>
        </div>
    );

    return (
        <div className="p-6">
            {/* Personal Information Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FaUserEdit className="mr-2 text-blue-600" />
                    Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={FaEnvelope} label="Email" value={userData.email} />
                    <InfoCard icon={FaPhone} label="Phone" value={userData.phone} />
                    <InfoCard icon={FaGenderless} label="Gender" value={userData.gender} />
                    <InfoCard icon={FaIdBadge} label="Role" value={userData.role} />
                </div>
            </div>

            {/* Professional Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FaCalendarCheck className="mr-2 text-blue-600" />
                    Professional Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={FaCalendarAlt} label="Join Date" value={userData.joinDate} />
                    <InfoCard icon={FaUserEdit} label="Manager" value={userData.manager} />
                </div>
            </div>

            {/* Education Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <FaUserGraduate className="mr-2 text-blue-600" />
                    Education
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={FaUserGraduate} label="Degree" value={userData.degreeName} />
                    <InfoCard icon={FaUniversity} label="College" value={userData.collageName} />
                    <InfoCard icon={FaCalendarAlt} label="Graduation Year" value={userData.graduationYear} />
                    <InfoCard icon={FaUserEdit} label="Skills" value={userData.skills} />
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
    );
};

export default ProfileInfo;