import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';

export interface Order {
  id: number;
  customer_id: number;
  customer_name?: string;
  total_amount: number;
  currency: string;
  status: string;
  order_date: string;
  delivery_date?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
  total: number;
}

export const useOrders = (page = 1, limit = 20) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ordersAPI.getAll(currentPage, limit);
      setOrders(response.items || []);
      setTotalPages(Math.ceil((response.total || response.items.length) / limit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id'>) => {
    try {
      const response = await ordersAPI.create(orderData);
      await fetchOrders(); // Refresh the list
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    }
  };

  const updateOrder = async (id: number, orderData: Partial<Order>) => {
    try {
      const response = await ordersAPI.update(id, orderData);
      await fetchOrders(); // Refresh the list
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, limit]);

  return {
    orders,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    fetchOrders,
    createOrder,
    updateOrder,
  };
};
