import React from 'react'

const ThreeBlockes = () => {

    const Data = [
        {
            h1: 7,
            p: "Employee",
        },
        {
            h1: 6,
            p: "Present",
        },
        {
            h1: 1,
            p: "Absent",
        },
    ]

  return (
    <>
    
    {Data.map((dataTable) => 
        <div class="w-4xl p-4 rounded-lg shadow-lg absolute left-80 top-20">
        <div class="bg-gradient-to-r w-48 from-yellow-500 to-red-500 p-6 rounded-t-lg">
          <h1 class="text-white text-3xl font-semibold">{dataTable.h1}</h1>
          <p class="text-white text-sm font-bold">{dataTable.p}</p>
        </div>
      </div>
    )}
    
    </>
  )
}

export default ThreeBlockes