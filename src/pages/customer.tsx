import React, { useState } from "react";

type Customer = {
  id: string;
  name: string;
  firmName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: string;
  lastOrder: string;
  status: "Active" | "Inactive" | "VIP";
};

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Dummy customer data for stationery business
  const customers: Customer[] = [
    {
      id: "CUST-001",
      name: "Ravi Sharma",
      firmName: "ABC School Supplies",
      email: "ravi@abcschool.com",
      phone: "9876543210",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      totalOrders: 15,
      totalSpent: "₹1,25,000",
      lastOrder: "2025-01-28",
      status: "Active"
    },
    {
      id: "CUST-002",
      name: "Neha Verma",
      firmName: "XYZ Office Solutions",
      email: "neha@xyzoffice.com",
      phone: "9123456780",
      address: "456 Business Park",
      city: "Delhi",
      state: "Delhi",
      totalOrders: 28,
      totalSpent: "₹3,42,000",
      lastOrder: "2025-01-27",
      status: "VIP"
    },
    {
      id: "CUST-003",
      name: "Amit Joshi",
      firmName: "Modern Stationers",
      email: "amit@modern.com",
      phone: "9988776655",
      address: "789 Industrial Area",
      city: "Bangalore",
      state: "Karnataka",
      totalOrders: 8,
      totalSpent: "₹78,000",
      lastOrder: "2025-01-26",
      status: "Active"
    },
    {
      id: "CUST-004",
      name: "Pooja Singh",
      firmName: "Creative Papers",
      email: "pooja@creative.com",
      phone: "7890123456",
      address: "321 Creative Hub",
      city: "Chennai",
      state: "Tamil Nadu",
      totalOrders: 22,
      totalSpent: "₹2,14,000",
      lastOrder: "2025-01-25",
      status: "Active"
    },
    {
      id: "CUST-005",
      name: "Rajesh Kumar",
      firmName: "Premium Office",
      email: "rajesh@premium.com",
      phone: "8765432109",
      address: "654 Premium Plaza",
      city: "Hyderabad",
      state: "Telangana",
      totalOrders: 12,
      totalSpent: "₹1,56,000",
      lastOrder: "2025-01-24",
      status: "Inactive"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "VIP":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "Active").length,
    vip: customers.filter(c => c.status === "VIP").length,
    inactive: customers.filter(c => c.status === "Inactive").length,
  };

  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Customer Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your stationery business customers
        </p>
      </div>

      {/* Customer Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{customerStats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{customerStats.active}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{customerStats.vip}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">VIP</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{customerStats.inactive}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
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
              <option value="Active">Active</option>
              <option value="VIP">VIP</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white w-64"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Firm</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {customer.id}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {customer.firmName}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-800 dark:text-white">{customer.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    <div>
                      <p className="text-gray-800 dark:text-white">{customer.city}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.state}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    {customer.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
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
                        📧
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
          👥 Add New Customer
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📊 Export Customers
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          📧 Send Newsletter
        </button>
      </div>
    </div>
  );
};

export default Customers;
