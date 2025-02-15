import { useState } from "react";


const SaryViewBtn = ({expend, ToggleModal}) => {

    const Data = [
        {
            h1:4,
            p:"Employee"
        },
    ]

  return (
    <div>
      <div class="p-4 rounded-lg absolute left-250 top-20 flex flex-row gap-3">
              {Data.map((btn) => 
                <div key={btn.h1} class="flex flex-row justify-between items-center bg-gradient-to-r w-72 from-yellow-500 to-red-500 p-6 rounded-lg">
                <div>
                <h1 class="text-white text-3xl font-semibold">{btn.h1}</h1>
                <p class="text-white text-2xl font-bold">{btn.p}</p>
                </div>
                <div className=''>
                  <button className='bg-gradient-to-r from-red-500 to-yellow-500 px-4 py-2 rounded-full text-white hover:shadow cursor-pointer'
                  onClick={ToggleModal}
                  >Click</button>
                </div>
              </div>
            )}
          </div>
    </div>
  )
}

export default SaryViewBtn
