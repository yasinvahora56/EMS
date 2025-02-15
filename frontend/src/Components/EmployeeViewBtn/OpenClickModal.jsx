
import { useState } from 'react';
import AttendenceManage from '../Attendence_and_leave/AttendenceManage'
import Table from '../DashBoard/Table'
import TopThreeBtn from './TopThreeBtn'

const OpenClickModal = () => {

    const [expend, setExpend] = useState(false);

  const ToggleModal = () => {
    setExpend(!expend);
  }


  return (
    <div>
      <TopThreeBtn expend={expend} ToggleModal={ToggleModal}/>
      <Table expend={expend} ToggleModal={ToggleModal}/>
    </div>
  )
}

export default OpenClickModal
