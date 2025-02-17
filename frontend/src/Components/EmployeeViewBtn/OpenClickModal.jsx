
import { useState } from 'react';
import AttendenceManage from '../Attendence_and_leave/AttendenceManage'

import TopThreeBtn from './TopThreeBtn'
import Employee from '../Employee/Employee';

const OpenClickModal = () => {

    const [expend, setExpend] = useState(false);

  const ToggleModal = () => {
    setExpend(!expend);
  }


  return (
    <div>
      <TopThreeBtn expend={expend} ToggleModal={ToggleModal}/>
      <Employee expend={expend} ToggleModal={ToggleModal}/>
    </div>
  )
}

export default OpenClickModal
