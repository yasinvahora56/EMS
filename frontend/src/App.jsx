import Login from "./Components/Login/Login"
import Software from "./Software/Software"



function App() {

  return (
    <Router>
      {/* <div className="flex">
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
      </div> */}
      <div className="flex"> 
      <SideBar/>
        <div>
          <Routes>
            <Route path="/UserDashBoard" element={<UserDashBoard/>}></Route>
            <Route path="/LeaveRequest" element={<LeaveReaquest/>}></Route>
            <Route path="/Salary" element={<Salary/>}></Route>
            <Route path="/UserProfile" element={<UserProfile/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
