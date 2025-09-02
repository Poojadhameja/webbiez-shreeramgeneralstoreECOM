import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  currency: string;
  description?: string;
  stock: number;
  status: string;
  category_id?: number;
  images?: Array<{ id: number; filename: string }>;
}

export const useProducts = (page = 1, limit = 20, search = '') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productsAPI.getAll(currentPage, limit, search);
      setProducts(response.items || []);
      setTotalPages(Math.ceil((response.total || response.items.length) / limit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const response = await productsAPI.create(productData);
      await fetchProducts(); // Refresh the list
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      throw err;
    }
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      const response = await productsAPI.update(id, productData);
      await fetchProducts(); // Refresh the list
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await productsAPI.delete(id);
      await fetchProducts(); // Refresh the list
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, search]);

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
