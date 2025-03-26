import React from 'react'

const LeaveRequest = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl transform transition-all duration-300 '>
        <h1 className='text-4xl md:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500'>
          Request For Leave
        </h1>
        <div className='bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 space-y-6 border border-gray-100'>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="name">Name:</label>
            <input 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 placeholder-gray-400' 
              type="text" 
              name='name' 
              placeholder='Enter Your Name' 
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="id">ID:</label>
            <input 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 placeholder-gray-400' 
              type="text" 
              name='id' 
              placeholder='Enter Your ID' 
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="from">From Date:</label>
            <input 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300' 
              type="date" 
              name='from_date' 
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="to">To Date:</label>
            <input 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300' 
              type="date" 
              name='to_date' 
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="type">Leave Type:</label>
            <select 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-100'
              name='leave_type'
            >
              <option value="sick_leave">Sick Leave</option>
              <option value="casual_leave">Casual Leave</option>
              <option value="earned_leave">Earned Leave</option>
              <option value="unpaid_leave">Unpaid Leave</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-start'>
            <label className='font-semibold text-gray-700 w-28 shrink-0' htmlFor="reason">Reason:</label>
            <textarea 
              className='w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 placeholder-gray-400 resize-y min-h-[100px]' 
              name='reason' 
              placeholder='Explain your reason'
            />
          </div>
          <button 
            className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 w-full py-3 mt-6 transform hover:-translate-y-1 active:translate-y-0'
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest