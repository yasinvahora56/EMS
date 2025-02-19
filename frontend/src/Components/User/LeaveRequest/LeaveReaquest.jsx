import React from 'react'

const LeaveRequest = () => {
  return (
    <div className='flex flex-col items-center mt-10 ml-100'>
      <div className='w-full max-w-3xl '>
        <h1 className='text-4xl font-bold mb-6 text-center text-gray-800'>Request For Leave</h1>
        <div className='bg-white shadow-2xl rounded-2xl p-8 space-y-6'>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32' htmlFor="name">Name:</label>
            <input className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300' type="text" name='name' placeholder='Enter Your Name' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32' htmlFor="id">ID:</label>
            <input className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300' type="text" name='id' placeholder='Enter Your ID' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32' htmlFor="from">From Date:</label>
            <input className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300' type="date" name='from_date' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32' htmlFor="to">To Date:</label>
            <input className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300' type="date" name='to_date' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32 whitespace-nowrap' htmlFor="type">Leave Type:</label>
            <select className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300' name='leave_type'>
              <option value="sick_leave">Sick Leave</option>
              <option value="casual_leave">Casual Leave</option>
              <option value="earned_leave">Earned Leave</option>
              <option value="unpaid_leave">Unpaid Leave</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className='font-semibold text-gray-700 w-32' htmlFor="reason">Reason:</label>
            <textarea className='w-full border-b-2 border-gray-300 focus:border-yellow-400 outline-none transition-all duration-300 resize-none' name='reason' placeholder='Explain your reason' rows="3"></textarea>
          </div>
          <button className='bg-yellow-400 text-white font-bold rounded-xl shadow-md hover:bg-yellow-500 transition-all duration-300 w-full py-3 mt-4'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest
