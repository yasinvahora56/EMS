
import { useState } from 'react';
import AttendenceManage from '../Attendence_and_leave/AttendenceManage'
import TopThreeBtn from './TopThreeBtn'

const OpenAttendanceModal = () => {

    const [expend, setExpend] = useState(false);

  const ToggleModal = () => {
    setExpend(!expend);
  }


  return (
    <div>
      <div>
      <TopThreeBtn expend={expend} ToggleModal={ToggleModal}/>
      </div>
      <AttendenceManage expend={expend} ToggleModal={ToggleModal}/>
    </div>
  )
}

export default OpenAttendanceModal
