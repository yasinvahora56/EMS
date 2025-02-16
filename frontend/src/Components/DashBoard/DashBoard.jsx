import React from 'react'
import SideNav from './SideNav'
import Table from './Table'

import OpenAttendanceModal from '../AttendenceViewBtn/OpenClickModal'
import OpenClickModal from '../EmployeeViewBtn/OpenClickModal'
import OpenSaleryTable from '../Salary/SaleryViewBtn/OpenSaleryTable'


const DashBoard = () => {
  return (
    <>
    {/* <AttendenceManage/> */}
    {/* <Table/> */}
    <OpenSaleryTable/>
    <OpenAttendanceModal/>
    <OpenClickModal/>
    {/* <SideNav/> */}
    </>
  )
}

export default DashBoard