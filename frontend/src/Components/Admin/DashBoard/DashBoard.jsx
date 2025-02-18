import { FaUser } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";



const DashBoard = () => {

  const Data = [
    {
        type:"Employee",
        Number: "7",
        icon: <FaUser/>,
    },
    {
        type:"Pending Leaves",
        Number: "4",
        icon: <MdPendingActions/>,
    },
    {
        type:"Employee",
        Number: "7",
        icon: <FaUser/>,
    },
    {
        type:"Employee",
        Number: "7",
        icon: <FaUser/>,
    },
  ]


  return (
    <>
      <div className="ml-60 mt-7">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <div className="mt-4">
        {Data.map((card) => {
          <div className="flex items-center justify-between w-2xs bg-amber-300 p-4 rounded-lg border-l-7 text-amber-900">
          <div className="font-bold">
              <h1 className="text-md">{card.type}</h1>
              <p className="text-2xl">{card.Number}</p>
            </div>
            <div className="ml-4 bg-amber-800 p-4 text-white rounded-xl">
              {card.icon}
            </div>          
          </div>
        })}
        </div>
      </div>
    </>
  )
}

export default DashBoard