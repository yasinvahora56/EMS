
import DashBoard from "./Components/Admin/DashBoard/DashBoard"
import Employee from "./Components/Admin/Employee/Employee"
import Profile from "./Components/Admin/Profile/Profile"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Attandance from "./Components/Admin/Attandance/Attandance"
import SideNav from "./Components/Admin/Sidebar/SideNav"
import SideBar from "./Components/User/Sidebar/SideBar"
import Leave from "./Components/Admin/Leave/Leave"
import Payroll from "./Components/Admin/Salary/Payroll"
import UserProfile from "./Components/User/Profile/UserProfile"
import UserDashBoard from "./Components/User/UserDashBoard/UserDashBoard"
import LeaveReaquest from "./Components/User/LeaveRequest/LeaveReaquest"


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
      {/* <div className="flex"> 
      <SideBar/>
        <div>
          <Routes>
            <Route path="/UserDashBoard" element={<UserDashBoard/>}></Route>
            <Route path="/LeaveRequest" element={<LeaveReaquest/>}></Route>
            <Route path="/UserProfile" element={<UserProfile/>}></Route>
          </Routes>
        </div>
      </div> */}
    </Router>
  )
}

export default App
