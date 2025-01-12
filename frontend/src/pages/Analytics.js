import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function AnalyticsDashboard() {
  // Example Data for Charts
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Path Efficiency (%)",
        data: [85, 88, 90, 87, 91, 93],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Analytics Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700">Total Flights</h2>
            <p className="text-4xl font-semibold text-blue-600 mt-2">45</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700">Avg Path Efficiency</h2>
            <p className="text-4xl font-semibold text-green-600 mt-2">89%</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700">Alerts Triggered</h2>
            <p className="text-4xl font-semibold text-red-600 mt-2">5</p>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Path Efficiency Over Time</h2>
          <Line data={lineChartData} />
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Flights</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-gray-700 font-bold">Flight ID</th>
                <th className="p-3 text-gray-700 font-bold">Date</th>
                <th className="p-3 text-gray-700 font-bold">Efficiency (%)</th>
                <th className="p-3 text-gray-700 font-bold">Duration (mins)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="p-3">F123</td>
                <td className="p-3">2025-01-06</td>
                <td className="p-3 text-green-600">91%</td>
                <td className="p-3">12</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-3">F124</td>
                <td className="p-3">2025-01-05</td>
                <td className="p-3 text-yellow-600">87%</td>
                <td className="p-3">15</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-3">F125</td>
                <td className="p-3">2025-01-04</td>
                <td className="p-3 text-green-600">93%</td>
                <td className="p-3">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
