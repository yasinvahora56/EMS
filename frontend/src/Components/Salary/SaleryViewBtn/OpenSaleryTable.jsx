import { useState } from 'react';
import TopThreeBtn from './SaryViewBtn'
import SalaryTable from '../SalaryTable';
import SaryViewBtn from './SaryViewBtn';

const OpenSaleryTable = () => {

    const [expend, setExpend] = useState(false);

  const ToggleModal = () => {
    setExpend(!expend);
  }


  return (
    <div>
      <SaryViewBtn expend={expend} ToggleModal={ToggleModal}/>
      <SalaryTable expend={expend} ToggleModal={ToggleModal}/>
    </div>
  )
}

export default OpenSaleryTable
