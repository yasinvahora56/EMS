// AdminRoutes.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Admin/Sidebar/SideNav"


const AdminRoutes = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav  />
      <main className={`flex-1 transition-all ${sidebarExpanded ? 'ml-55' : 'ml-20'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoutes;