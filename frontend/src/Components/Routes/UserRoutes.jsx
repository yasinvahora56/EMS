import React, { useState } from 'react'
import SideBar from '../User/Sidebar/SideBar'
import { Outlet } from 'react-router'

const UserRoutes = () => {
    // Initialize with a default value (likely false)
    const [sidebarExpended, setSidebarExpended] = useState(false)
    
    const toggleSidebar = () => {
        setSidebarExpended(!sidebarExpended)
    }
    
    return (
        <div className="flex min-h-screen">
            <SideBar toggleSidebar={toggleSidebar} /> {/* Pass the function properly */}
            <main className={`flex-1 transition-all ${sidebarExpended ? 'ml-20' : 'ml-65'}`}>
                <Outlet />
            </main>
        </div>
    )
}

export default UserRoutes