// File: Dashboard.tsx
import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useOrders } from "../hooks/useOrders";

type DashboardCardProps = {
  title: string;
  count: number;
  description: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  loading?: boolean;
};

// Card Component with color support
const DashboardCard = ({
  title,
  count,
  description,
  bgColor = "bg-white",
  textColor = "text-black",
  icon,
  loading = false,
}: DashboardCardProps) => (
  <div
    className={`${bgColor} ${textColor} p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm opacity-80 mb-2">{title}</p>
        {loading ? (
          <div className="h-8 bg-white/20 rounded animate-pulse mb-2"></div>
        ) : (
          <p className="text-2xl sm:text-3xl font-bold">{count.toLocaleString()}</p>
        )}
        <p className="text-xs opacity-70 mt-2">{description}</p>
      </div>
      {icon && (
        <div className="text-2xl sm:text-4xl opacity-20">
          {icon}
        </div>
      )}
    </div>
  </div>
);

// Dummy recent customer data for stationery business
const recentCustomers = [
  { name: "Ravi Sharma", firm_name: "ABC School Supplies", contact: "9876543210", amount: "₹12,500", date: "2025-01-28", status: "Active" },
  { name: "Neha Verma", firm_name: "XYZ Office Solutions", contact: "9123456780", amount: "₹34,200", date: "2025-01-27", status: "Active" },
  { name: "Amit Joshi", firm_name: "Modern Stationers", contact: "9988776655", amount: "₹7,800", date: "2025-01-26", status: "Pending" },
  { name: "Pooja Singh", firm_name: "Creative Papers", contact: "7890123456", amount: "₹21,400", date: "2025-01-25", status: "Active" },
  { name: "Rajesh Kumar", firm_name: "Premium Office", contact: "8765432109", amount: "₹15,600", date: "2025-01-24", status: "Active" },
];

// Top selling products
const topProducts = [
  { name: "A4 Paper (500 sheets)", category: "Paper Products", sales: 1250, revenue: "₹62,500" },
  { name: "Blue Ballpoint Pens", category: "Writing Instruments", sales: 890, revenue: "₹8,900" },
  { name: "Sticky Notes", category: "Office Supplies", sales: 650, revenue: "₹13,000" },
  { name: "Notebooks (Classic)", category: "School Supplies", sales: 420, revenue: "₹25,200" },
  { name: "File Folders", category: "Office Supplies", sales: 380, revenue: "₹7,600" },
];

const Dashboard = () => {
  const { products, loading: productsLoading } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();

  // Calculate real-time data
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalCustomers = orders.reduce((sum, order) => {
    if (!orders.slice(0, orders.indexOf(order)).some(o => o.customer_id === order.customer_id)) {
      return sum + 1;
    }
    return sum;
  }, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Welcome to Shreeram Stationery Admin
        </h1>
        <p className="text-gray-600">
          Manage your stationery business efficiently
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Orders"
          count={totalOrders}
          description="Last 30 days"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          textColor="text-white"
          loading={ordersLoading}
        />
        <DashboardCard
          title="Total Customers"
          count={totalCustomers}
          description="Active customers"
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
          textColor="text-white"
          loading={ordersLoading}
        />
        <DashboardCard
          title="Revenue"
          count={totalRevenue}
          description="This month (₹)"
          bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          textColor="text-white"
          loading={ordersLoading}
        />
        <DashboardCard
          title="Products Listed"
          count={totalProducts}
          description="Active inventory"
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          textColor="text-white"
          loading={productsLoading}
        />
      </div>

      {/* Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Recent Customers Table */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
            Recent Customers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-3 py-2">Name</th>
                  <th className="px-2 sm:px-3 py-2">Firm</th>
                  <th className="px-2 sm:px-3 py-2">Amount</th>
                  <th className="px-2 sm:px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.slice(0, 4).map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-2 sm:px-3 py-2 font-medium text-gray-800">
                      {customer.name}
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-gray-600">
                      {customer.firm_name}
                    </td>
                    <td className="px-2 sm:px-3 py-2 font-semibold text-green-600">
                      {customer.amount}
                    </td>
                    <td className="px-2 sm:px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
            Top Selling Products
          </h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 text-sm">
                    {product.revenue}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.sales} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button className="p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
            <div className="text-blue-600 text-center">
              <div className="text-xl sm:text-2xl mb-2">📦</div>
              <p className="text-xs sm:text-sm font-medium">Add Product</p>
            </div>
          </button>
          <button className="p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
            <div className="text-green-600 text-center">
              <div className="text-xl sm:text-2xl mb-2">📋</div>
              <p className="text-xs sm:text-sm font-medium">New Order</p>
            </div>
          </button>
          <button className="p-3 sm:p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
            <div className="text-orange-600 text-center">
              <div className="text-xl sm:text-2xl mb-2">👥</div>
              <p className="text-xs sm:text-sm font-medium">Add Customer</p>
            </div>
          </button>
          <button className="p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
            <div className="text-purple-600 text-center">
              <div className="text-xl sm:text-2xl mb-2">📊</div>
              <p className="text-sm font-medium">View Reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
