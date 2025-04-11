import React, { useEffect, useState } from "react";
import { FaUser, FaMoneyCheckAlt } from "react-icons/fa";
import { MdPendingActions, MdWork, MdAddTask, MdTask, MdDeleteForever } from "react-icons/md";
import { BACKEND_URL, token } from "../../../config/config";

const DashBoard = () => {
  const [newTask, setNewTask] = useState("");
  const [adminTask, setAdminTask] = useState([]);
  const [newTaskPriority, setNewTaskPriority] = useState("Select");
  const [tasks, setTasks] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingLeavesCount, setPendingLeavesCount] = useState(0);
  const [leaveData, setLeaveData] = useState([]);

  // Dynamic dashboard data using state variables
  const dashboardData = [
    { 
      type: "Employees", 
      number: employeeCount, 
      icon: <FaUser size={20} />, 
      color: "indigo",
    },
    { 
      type: "Pending Leaves", 
      number: pendingLeavesCount, 
      icon: <MdPendingActions size={20} />, 
      color: "teal",
    },
    { 
      type: "Total Salary", 
      number: "$20,000", 
      icon: <FaMoneyCheckAlt size={20} />, 
      color: "amber" 
    },
  ];

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/task/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          description: newTask,
          priority: newTaskPriority,
        })
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const saveTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, saveTask]);
      setNewTask("");
      setNewTaskPriority("Select");
      // Refresh the task list
      getAdminTasks();

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getAdminTasks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/task/adminTask`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setAdminTask(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getAdminTasks();
  }, []);

  const fetchAllEmployee = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/employee/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.employeeData) {
        // Set the employee count based on the actual data
        setEmployeeCount(data.employeeData.length);
        console.log("All employee data:", data);
      }
    } catch (error) {
      console.log("Error During Fetch Employee Data", error);
    }
  }

  useEffect(() => {
    fetchAllEmployee();
  }, []);

  const fetchAllLeaveData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/leave/get`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.leaves) {
        setLeaveData(data.leaves);
        
        // Count pending leaves
        const pendingCount = data.leaves.filter(leave => 
          leave.status === "Pending"
        ).length;
        
        setPendingLeavesCount(pendingCount);
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  }

  useEffect(() => {
    fetchAllLeaveData();
  }, []);
 
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/task/delete/${taskId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      const data = await response.json();
      setAdminTask((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      console.log(data.message);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return "ring-4 ring-red-100";
      case "Medium":
        return "ring-4 ring-amber-100";
      case "Low":
        return "ring-4 ring-emerald-100";
      default:
        return "";
    }
  };

  const getCardColors = (color) => {
    switch (color) {
      case "indigo":
        return "bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-indigo-500";
      case "teal":
        return "bg-gradient-to-br from-teal-50 to-teal-100 border-l-teal-500";
      case "rose":
        return "bg-gradient-to-br from-rose-50 to-rose-100 border-l-rose-500";
      case "amber":
        return "bg-gradient-to-br from-amber-50 to-amber-100 border-l-amber-500";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-l-gray-500";
    }
  };

  const getIconBg = (color) => {
    switch (color) {
      case "indigo":
        return "bg-indigo-500 text-white";
      case "teal":
        return "bg-teal-500 text-white";
      case "rose":
        return "bg-rose-500 text-white";
      case "amber":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleCardClick = (type) => {
    switch (type) {
      case "Employees":
        window.location.href = "/admin/employee";
        break;
      case "Pending Leaves":
        window.location.href = "/admin/leave";
        break;
      default:
        break;
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.map((card, index) => (
          <button onClick={() => handleCardClick(card.type)} key={index}>
            <div 
            key={index} 
            className={`flex items-center justify-between p-6 rounded-lg shadow-lg border-l-8 transition-all duration-300  ${getCardColors(card.color)}`}
          >
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{card.type}</h2>
              <p className="text-2xl font-bold text-gray-800 mt-1">{card.number}</p>
            </div>
            <div className={`ml-4 p-4 rounded-full ${getIconBg(card.color)} shadow-md`}>
              {card.icon}
            </div>
          </div>
          </button>
        ))}
      </div>
      
      {/* Task Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Task */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center border-b pb-4 border-gray-100">
            <MdAddTask className="mr-2 text-indigo-500" size={22} />
            Add New Task
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Description</label>
              <input
                type="text"
                name="description"
                autoComplete="off"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Type task description here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Priority</label>
              <select
                name="priority"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 shadow-sm appearance-none"
                defaultValue="low"
              >
                <option value="Select" disabled>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button
              onClick={handleAddTask}
              name="addTask"
              type="button"
              disabled={!newTask}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Add Task
            </button>
          </div>
        </div>
        
        {/* Task List */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center border-b pb-4 border-gray-100">
            <MdTask className="mr-2 text-indigo-500" size={22} />
            Today's Tasks
          </h2>
          
          <div className="space-y-4">
            {adminTask.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <MdTask className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500 text-center">No tasks for today. Add a new task to get started.</p>
              </div>
            ) : (
              adminTask.map((task) => (
                <div
                  key={task._id}
                  className={`border px-6 py-4 rounded-lg flex justify-between items-center hover:shadow-md transition-all duration-200 bg-white ${getPriorityIcon(task.priority)}`}
                >
                  <span className="font-medium text-gray-800">{task.description}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(task.priority)} font-medium`}>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors duration-300"
                      title="Delete task"
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;