import { useState, useEffect } from "react";
import { Search, X, Plus } from "lucide-react";

const Payroll = () => {
  const [search, setSearch] = useState('');
  const [salaryPaid, setSalaryPaid] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newSalary, setNewSalary] = useState({
    name: "",
    employeeId: "",
    salary: "",
    allowance: "",
    deduction: "",
    total: "",
    status: "unpaid",
    date: ""
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const calculateTotal = () => {
    const salary = parseFloat(newSalary.salary) || 0;
    const allowance = parseFloat(newSalary.allowance) || 0;
    const deduction = parseFloat(newSalary.deduction) || 0;
    return salary + allowance - deduction;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalary(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'salary' || name === 'allowance' || name === 'deduction') {
        updated.total = calculateTotal();
      }
      return updated;
    });
  };

  const fetchAllPayroll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://ems-pq48.onrender.com/payroll');
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setSalaryPaid(data);
    } catch (error) {
      console.error("Failed to fetch payroll:", error.message);
      setError("Failed to load payroll data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const res = await fetch("https://ems-pq48.onrender.com/employee");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const result = await res.json();
      const data = result.employeeData; // Make sure API sends { employeeData: [...] }
      setEmployees(data);
    } catch (err) {
      console.error("Error loading employees:", err.message);
      setError("Failed to fetch employee list.");
    }
  };

  const createPayroll = async (payrollData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://ems-pq48.onrender.com/payroll/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payrollData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payroll creation failed");
      }

      await response.json();
      fetchAllPayroll();
    } catch (error) {
      console.error("Failed to create payroll:", error.message);
      setError("Failed to create payroll.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payrollData = {
        name: newSalary.name,
        employeeId: newSalary.employeeId,
        salary: newSalary.salary,
        allowance: newSalary.allowance,
        deduction: newSalary.deduction,
        total: newSalary.total,
        status: "unpaid",
        date: newSalary.date,
      };
      await createPayroll(payrollData);
      setNewSalary({
        name: "",
        employeeId: "",
        salary: "",
        allowance: "",
        deduction: "",
        total: "",
        status: "unpaid",
        date: new Date().toISOString().split('T')[0]
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ NEW: Call PATCH /payroll/update/:id to update status
  const handleApproval = async (payrollId, newStatus) => {
    try {
      const response = await fetch(`https://ems-pq48.onrender.com/payroll/update/${payrollId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update payroll status');
      }

      
      // Update state locally
      setSalaryPaid((prev) =>
        prev.map((item) =>
          item._id === payrollId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Status update failed:", error.message);
      setError("Failed to update payroll status.");
    }
  };

  useEffect(() => {
    fetchAllPayroll();
    fetchAllEmployees();
  }, []);

  return (
    <>
      <div className="max-h-screen">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Salary Table</h1>
            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md"
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
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

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
                    <td colSpan="9" className="text-center text-gray-500 px-4 py-6">No salary records found.</td>
                  </tr>
                )}
                {salaryPaid.filter((emp) =>
                  emp.name.toLowerCase().includes(search.toLowerCase())
                ).map((emp, index) => (
                  <tr key={emp._id} className="hover:bg-gray-100">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.salary}</td>
                    <td className="px-4 py-3">{emp.allowance}</td>
                    <td className="px-4 py-3">{emp.deduction}</td>
                    <td className="px-4 py-3 font-semibold text-blue-700">₹{emp.total}</td>
                    <td className="px-4 py-3">{new Date(emp.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        emp.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {emp.status !== 'paid' ? (
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleApproval(emp._id, "paid")}
                        >
                          Pay Now
                        </button>
                      ) : (
                        <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Salary</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Employee Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Select Employee</label>
                <select
                  name="employeeId"
                  value={newSalary.employeeId}
                  onChange={(e) => {
                    const selected = employees.find(emp => emp._id === e.target.value);
                    setNewSalary(prev => ({
                      ...prev,
                      employeeId: selected?._id || "",
                      name: selected?.name || ""
                    }));
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp._id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Fields */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {['salary', 'allowance', 'deduction'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-700 capitalize">{field}</label>
                    <input
                      type="number"
                      name={field}
                      value={newSalary[field]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Total</label>
                  <input
                    type="number"
                    name="total"
                    value={newSalary.total}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
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
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {loading ? "Adding..." : "Add Salary"}
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
