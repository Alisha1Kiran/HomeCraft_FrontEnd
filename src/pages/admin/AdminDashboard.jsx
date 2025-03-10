// src/components/Dashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTotalUsers,
  fetchTotalProducts,
  fetchTotalOrders,
  fetchUserGrowth,
  fetchSalesTrend,
} from "../../redux/slices/adminDashboardSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Accessing the state from Redux store
  const {
    totalUsers,
    totalProducts,
    totalOrders,
    userGrowth,
    salesTrend,
    loading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    // Dispatch actions to fetch data on component mount
    dispatch(fetchTotalUsers());
    dispatch(fetchTotalProducts());
    dispatch(fetchTotalOrders());
    dispatch(fetchUserGrowth());
    dispatch(fetchSalesTrend());
  }, [dispatch]);

  // Sort User Growth by Month (Optional)
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const sortedUserGrowth = [...userGrowth].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-cyan-50 font-semibold text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          {error.users ? (
            <p className="text-red-500">{error.users}</p>
          ) : (
            <p className="text-4xl font-bold">{totalUsers}</p>
          )}
        </div>

        {/* Total Products */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          {error.products ? (
            <p className="text-red-500">{error.products}</p>
          ) : (
            <p className="text-4xl font-bold">{totalProducts}</p>
          )}
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          {error.orders ? (
            <p className="text-red-500">{error.orders}</p>
          ) : (
            <p className="text-4xl font-bold">{totalOrders}</p>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* User Growth Chart */}
        <div className="bg-cyan-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-500 text-xl font-semibold mb-4">
            User Growth Over Time
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading Chart...</p>
          ) : error.userGrowth ? (
            <p className="text-red-500">{error.userGrowth}</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={userGrowth}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#4A5568", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#4A5568", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#F8FAFC",
                    borderRadius: "5px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#F8FAFC" }}
                />
                <Legend wrapperStyle={{ paddingTop: 10, fontSize: "14px" }} />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ fill: "#4F46E5", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-cyan-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-500 text-xl font-semibold mb-4">
            Sales Trend Over Time
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading Chart...</p>
          ) : error.salesTrend ? (
            <p className="text-red-500">{error.salesTrend}</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={salesTrend}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#4A5568", fontSize: 12 }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis tick={{ fill: "#4A5568", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    color: "#F8FAFC",
                    borderRadius: "5px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#F8FAFC" }}
                />
                <Legend wrapperStyle={{ paddingTop: 10, fontSize: "14px" }} />
                <Bar
                  dataKey="sales"
                  fill="#16A34A"
                  barSize={40}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
