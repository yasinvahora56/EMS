import { FaUser, FaMoneyCheckAlt } from "react-icons/fa";
import { MdPendingActions, MdWork, MdAddTask } from "react-icons/md";
import { Bar } from "recharts";

const DashBoard = () => {
  const Data = [
    { type: "Employees", number: "7", icon: <FaUser /> },
    { type: "Pending Leaves", number: "4", icon: <MdPendingActions /> },
    { type: "Departments", number: "3", icon: <MdWork /> },
    { type: "Total Salary", number: "$20,000", icon: <FaMoneyCheckAlt /> },
  ];

  return (
    <div className="ml-60 mt-7 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {Data.map((card, index) => (
          <div key={index} className="flex items-center justify-between bg-amber-300 p-4 rounded-lg shadow-md border-l-8 border-amber-500">
            <div>
              <h1 className="text-md font-semibold">{card.type}</h1>
              <p className="text-2xl font-bold">{card.number}</p>
            </div>
            <div className="ml-4 bg-amber-800 p-4 text-white rounded-xl">{card.icon}</div>
          </div>
        ))}
      </div>
      </div>
  );
};

export default DashBoard;
