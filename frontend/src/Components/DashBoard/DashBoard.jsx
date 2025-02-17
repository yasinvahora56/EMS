import React from 'react'
import Employee from '../Employee/Employee';

import OpenAttendanceModal from '../AttendenceViewBtn/OpenClickModal'
import OpenClickModal from '../EmployeeViewBtn/OpenClickModal'
import OpenSaleryTable from '../Salary/SaleryViewBtn/OpenSaleryTable'


const DashBoard = () => {
  return (
    <>
    {/* <AttendenceManage/> */}
    {/* <Employee/> */}
    <OpenSaleryTable/>
    <OpenAttendanceModal/>
    {/* <SideNav/> */}
    </>
  )
}

export default DashBoard