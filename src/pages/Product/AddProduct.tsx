import { useState } from "react";
import axios from "axios";

type ProductForm = {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
  category: string;
  sku: string;
  brand: string;
  weight: string;
  dimensions: string;
};

const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
    sku: "",
    brand: "",
    weight: "",
    dimensions: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Writing Instruments",
    "Paper Products", 
    "Office Supplies",
    "School Supplies",
    "Art & Craft",
    "Desk Accessories",
    "Storage Solutions",
    "Presentation Materials"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // For now, just show success message
      // In real app, you'd call your API
      alert("Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
        sku: "",
        brand: "",
        weight: "",
        dimensions: "",
      });
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Product Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add and manage your stationery products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              Add New Product
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., A4 Paper 500 sheets"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="e.g., A4-500-001"
                    value={form.sku}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g., Shreeram"
                    value={form.brand}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (g)
                  </label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="e.g., 250"
                    value={form.weight}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  placeholder="e.g., 21cm x 29.7cm"
                  value={form.dimensions}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed product description..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Adding Product..." : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    image: "",
                    category: "",
                    sku: "",
                    brand: "",
                    weight: "",
                    dimensions: "",
                  })}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Product Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Product Stats */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Product Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Total Products</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,258</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">1,156</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <span className="text-orange-600 dark:text-orange-400 font-medium">Low Stock</span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">89</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">13</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors text-left">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">View All Products</span>
                </div>
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800 transition-colors text-left">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📦</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Manage Inventory</span>
                </div>
              </button>
              <button className="w-full p-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-800 transition-colors text-left">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏷️</span>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">Bulk Import</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
