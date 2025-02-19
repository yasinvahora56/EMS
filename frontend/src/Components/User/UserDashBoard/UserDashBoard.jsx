import { useEffect, useState } from "react";
import { FaUser, FaMoneyCheckAlt } from "react-icons/fa";
import { MdPendingActions, MdWork, MdAddTask } from "react-icons/md";
import { LogIn, Coffee, LogOut, Timer } from "lucide-react";


const UserDashBoard = () => {

  const [dataTime, setDateTime] = useState('');

  useEffect (() => {
    setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${date} - ${time}`)
    }, 1000);
  })

   const Data = [
      { number: "11:20:03", type:"Punch In", icon: <LogIn /> },
      { number: "1:20:40 PM", type:"Break", icon: <Coffee /> },
      { number: "8:02:20", type:"Punch Out", icon: <LogOut /> },
      { number: "7 Hours", type:"Total Working Hours", icon: <Timer /> },
    ];



  return (
    <div className="flex flex-col ml-70 mt-10">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Employee Dashboard <span className="text-2xl font-bold mb-6 text-center text-gray-800">({ dataTime })</span></h1>
      </div>
      <div className=""> 
          <div className="bg-white">
          <div className="grid grid-cols-4 gap-4 mt-6">
        {Data.map((card, index) => (
          <div key={index} className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500 w-70">
            <div>
              <h1 className="text-md font-semibold">{card.type}</h1>
              <p className="text-2xl font-bold">{card.number}</p>
            </div>
            <button className="ml-4 bg-amber-800 p-4 text-white rounded-xl flex gap-2 cursor-pointer text-2xl">{card.icon} </button>
          </div>
        ))}
      </div>
          </div>
      </div>

        <div className="max-w-120 mt-20 flex flex-col gap-5">
          <div className="bg-pink-100 w-full p-4 rounded-lg shadow-lg shadow-pink-200">
              <h1 className="text-pink-900 font-bold">Your Punching Time is</h1>
          </div>
          <div className="bg-green-100 w-full p-4 rounded-lg shadow-lg shadow-green-200">
              <h1 className="text-green-900 font-bold">You Have take a Break from </h1>
          </div>
          <div className="bg-amber-100 w-full p-4 rounded-lg shadow-lg shadow-amber-200">
              <h1 className="text-amber-900 font-bold">You Leaving Office at </h1>
          </div>
        </div>

    </div>
  )
}

export default UserDashBoard