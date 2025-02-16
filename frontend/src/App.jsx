
import AttendenceManage from "./Components/Attendence_and_leave/AttendenceManage"
import DashBoard from "./Components/DashBoard/DashBoard"
import SideNav from "./Components/DashBoard/SideNav"
import Profile from "./Components/Profile/Profile"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <Router>
      <div className="flex">
      <SideNav/>
      <div className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
