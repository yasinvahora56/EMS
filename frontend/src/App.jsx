
import AttendenceManage from "./Components/Attendence_and_leave/AttendenceManage"
import DashBoard from "./Components/DashBoard/DashBoard"
import Employee from "./Components/Employee/Employee"
import Profile from "./Components/Profile/Profile"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Attandance from "./Components/Attandance/Attandance"
import SideNav from "./Components/Sidebar/SideNav"
import Leave from "./Components/Leave/Leave"
import Payroll from "./Components/Salary/Payroll"


function App() {

  return (
    <Router>
      <div className="flex">
      <SideNav/>
      <div className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/employee" element={<Employee/>}/>
            <Route path="/attandance" element={<Attandance/>}/>
            <Route path="/leave" element={<Leave/>}/>
            <Route path="/payroll" element={<Payroll/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
