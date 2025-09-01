import React, { useState } from "react";

type Order = {
  id: string;
  customerName: string;
  firmName: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
  paymentStatus: "Pending" | "Paid" | "Partial" | "Failed";
};

const Orders: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy order data for stationery business
  const orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "Ravi Sharma",
      firmName: "ABC School Supplies",
      orderDate: "2025-01-28",
      deliveryDate: "2025-01-30",
      totalAmount: "₹12,500",
      status: "Confirmed",
      items: 15,
      paymentStatus: "Paid"
    },
    {
      id: "ORD-002",
      customerName: "Neha Verma",
      firmName: "XYZ Office Solutions",
      orderDate: "2025-01-27",
      deliveryDate: "2025-01-29",
      totalAmount: "₹34,200",
      status: "Processing",
      items: 28,
      paymentStatus: "Paid"
    },
    {
      id: "ORD-003",
      customerName: "Amit Joshi",
      firmName: "Modern Stationers",
      orderDate: "2025-01-26",
      deliveryDate: "2025-01-28",
      totalAmount: "₹7,800",
      status: "Shipped",
      items: 8,
      paymentStatus: "Paid"
    },
    {
      id: "ORD-004",
      customerName: "Pooja Singh",
      firmName: "Creative Papers",
      orderDate: "2025-01-25",
      deliveryDate: "2025-01-27",
      totalAmount: "₹21,400",
      status: "Delivered",
      items: 22,
      paymentStatus: "Paid"
    },
    {
      id: "ORD-005",
      customerName: "Rajesh Kumar",
      firmName: "Premium Office",
      orderDate: "2025-01-24",
      deliveryDate: "2025-01-26",
      totalAmount: "₹15,600",
      status: "Pending",
      items: 12,
      paymentStatus: "Pending"
    },
    {
      id: "ORD-006",
      customerName: "Sita Patel",
      firmName: "Global Stationers",
      orderDate: "2025-01-23",
      deliveryDate: "2025-01-25",
      totalAmount: "₹8,900",
      status: "Cancelled",
      items: 6,
      paymentStatus: "Failed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Processing":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Partial":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    cancelled: orders.filter(o => o.status === "Cancelled").length,
  };

  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Order Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage all customer orders
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{orderStats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{orderStats.pending}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{orderStats.processing}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{orderStats.shipped}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Shipped</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{orderStats.delivered}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{orderStats.cancelled}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white w-64"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Firm</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Delivery Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {order.firmName}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {order.deliveryDate}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    {order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        👁️
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                        ✏️
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                        📦
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📋 Create New Order
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📊 Export Orders
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📧 Send Updates
        </button>
      </div>
    </div>
  );
};

export default Orders;
