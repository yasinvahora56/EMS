import { useEffect, useState } from 'react';
import { Search } from "lucide-react";

const Salary = () => {
  const [search, setSearch] = useState('');
  const [salaryPaid, setSalaryPaid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch salary data from backend
  const fetchSalaryData = async () => {
    try {
      const response = await fetch("http://localhost:8080/payroll", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error("Failed to fetch salary data");
      const data = await response.json();

      // Filter only paid salaries
      const paidSalaries = data.filter(salary => salary.status === "paid");

      setSalaryPaid(paidSalaries);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch salary data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center max-h-screen z-0 mt-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Paid Salaries</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by Name or Email..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading salaries...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-blue-600 text-white text-center text-sm">
                    {['#', 'Employee Name', 'Email', 'Salary', 'Allowance', 'Deduction', 'Total', 'Date', 'Status'].map((head) => (
                      <th key={head} className="px-4 py-3 font-semibold uppercase">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salaryPaid.filter(emp =>
                    search === '' ||
                    emp.name.toLowerCase().includes(search.toLowerCase()) ||
                    emp.email?.toLowerCase().includes(search.toLowerCase())
                  ).map((emp, index) => (
                    <tr key={emp._id || index} className="hover:bg-gray-100 text-center">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{emp.name}</td>
                      <td className="px-4 py-3">{emp.email || "—"}</td>
                      <td className="px-4 py-3">₹{emp.salary}</td>
                      <td className="px-4 py-3">₹{emp.allowance}</td>
                      <td className="px-4 py-3">₹{emp.deduction}</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">₹{emp.total}</td>
                      <td className="px-4 py-3">{new Date(emp.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                  {salaryPaid.length === 0 && (
                    <tr>
                      <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                        No paid salary records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Salary;
