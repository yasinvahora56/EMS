import React, { useState, useEffect } from "react";
import { Search, X, Plus } from "lucide-react";

const Payroll = () => {
  const [search, setSearch] = useState('');
  const [salaryPaid, setSalaryPaid] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newSalary, setNewSalary] = useState({
    name: "",
    salary: "",
    allowance: "",
    deduction: "",
    total: "",
    status: "unpaid",
    date: ""
  });

  // Modal open/close handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Calculate total when salary, allowance, or deduction changes
  const calculateTotal = () => {
    const salary = parseFloat(newSalary.salary) || 0;
    const allowance = parseFloat(newSalary.allowance) || 0;
    const deduction = parseFloat(newSalary.deduction) || 0;
    return salary + allowance - deduction;
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalary(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate total when salary, allowance, or deduction changes
      if (name === 'salary' || name === 'allowance' || name === 'deduction') {
        updated.total = calculateTotal();
      }
      
      return updated;
    });
  };

  // Fetch all payroll data
  const fetchAllPayroll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/payroll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setSalaryPaid(data);
    } catch (error) {
      console.error("Failed to fetch payroll data:", error);
      setError("Failed to load payroll data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Create new payroll entry
  const createPayroll = async (payrollData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/payroll/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payrollData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      // Refresh payroll data after adding new entry
      fetchAllPayroll();
      return data;
    } catch (error) {
      console.error("Failed to create payroll entry:", error);
      setError("Failed to create payroll entry. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payrollData = {
        name: newSalary.name,
        salary: newSalary.salary,
        Allowance: newSalary.allowance,
        Deduction: newSalary.deduction,
        total: newSalary.total,
        status: "unpaid",
        date: newSalary.date,
      };
      
      await createPayroll(payrollData);
      
      // Reset form and close modal
      setNewSalary({
        name: "",
        salary: "",
        allowance: "",
        deduction: "",
        total: "",
        status: "unpaid",
        date: new Date().toISOString().split('T')[0]
      });
      closeModal();
      
    } catch (error) {
      // Error is already handled in createPayroll
      console.log(error);
    }
  };

  // Update payroll status
  const handleApproval = async (employeeId, setStatus) => {
    // First update the UI optimistically
    setSalaryPaid((prevData) =>
      prevData.map((item) =>
        item._id === employeeId ? { ...item, status: setStatus } : item
      )
    );
    
    // TODO: Implement API call to update status in the backend
    // This would require a PUT endpoint in your API
  };

  // Load data on component mount
  useEffect(() => {
    fetchAllPayroll();
  }, []);
  
  return (
    <>
      <div className="max-h-screen">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Salary Table</h1>
            <button 
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md transition-all"
              disabled={loading}
            >
              <Plus size={18} />
              Add New Salary
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Employee..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Salary Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-left text-sm">
                  {['No','Name', 'Salary', 'Allowance', 'Deduction', 'Total','Date', 'Status', 'Action'].map((head) => (
                    <th key={head} className="px-4 py-3 font-semibold uppercase">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!loading && salaryPaid.length === 0 && (
                  <tr>
                    <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                      No salary records found. Add a new salary record to get started.
                    </td>
                  </tr>
                )}
                {salaryPaid.filter((employee) =>
                  search.toLowerCase() === '' || employee.name.toLowerCase().includes(search.toLowerCase())
                ).map((employee, index) => (
                  <tr key={employee._id || index} className="hover:bg-gray-100 transition-all">
                    <td className="px-4 py-3 text-gray-700 font-medium">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{employee.name}</td>
                    <td className="px-4 py-3 text-gray-600">{employee.salary}</td>
                    <td className="px-4 py-3 text-gray-700">{employee.Allowance}</td>
                    <td className="px-4 py-3 text-gray-600">{employee.Deduction}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">₹{employee.total}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(employee.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        employee.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {employee.status === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {employee.status !== 'paid' && (
                        <button 
                          className="bg-gradient-to-r from-green-400 to-green-700 px-6 py-3 cursor-pointer rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl"
                          onClick={() => handleApproval(employee._id, "paid")}
                          disabled={loading}
                        >
                          Pay Now
                        </button>
                      )}
                      {employee.status === 'paid' && (
                        <span className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg inline-block">
                          Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Salary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Salary</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Employee Name</label>
                <input
                  type="text"
                  name="name"
                  value={newSalary.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={newSalary.salary}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Allowance</label>
                  <input
                    type="number"
                    name="allowance"
                    value={newSalary.allowance}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Deduction</label>
                  <input
                    type="number"
                    name="deduction"
                    value={newSalary.deduction}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total</label>
                  <input
                    type="number"
                    name="total"
                    value={newSalary.total}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newSalary.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : 'Add Salary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Payroll;