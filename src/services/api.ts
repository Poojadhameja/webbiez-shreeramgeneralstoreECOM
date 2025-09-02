// API Service for PHP Backend Integration
const API_BASE_URL = 'http://localhost/api-folder/endpoints';

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'replace-with-strong-random-api-key', // From your config.php
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Products API
export const productsAPI = {
  // Get all products with pagination and search
  getAll: (page = 1, limit = 20, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { q: search }),
    });
    return apiCall(`products.php?${params}`);
  },

  // Get single product by ID
  getById: (id: number) => apiCall(`products.php?id=${id}`),

  // Create new product
  create: (data: any) => apiCall('products.php', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update product
  update: (id: number, data: any) => apiCall(`products.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Delete product
  delete: (id: number) => apiCall(`products.php?id=${id}`, {
    method: 'DELETE',
  }),
};

// Orders API
export const ordersAPI = {
  // Get all orders
  getAll: (page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return apiCall(`orders.php?${params}`);
  },

  // Get single order by ID
  getById: (id: number) => apiCall(`orders.php?id=${id}`),

  // Create new order
  create: (data: any) => apiCall('orders.php', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update order
  update: (id: number, data: any) => apiCall(`orders.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: () => apiCall('categories.php'),

  // Get single category by ID
  getById: (id: number) => apiCall(`categories.php?id=${id}`),

  // Create new category
  create: (data: any) => apiCall('categories.php', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update category
  update: (id: number, data: any) => apiCall(`categories.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Upload API
export const uploadAPI = {
  // Upload file
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },
};

export default {
  products: productsAPI,
  orders: ordersAPI,
  categories: categoriesAPI,
  upload: uploadAPI,
};
