const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    const data = await apiRequest('/v2/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    
    if (data.status === 'success' && data.data.token) {
      setToken(data.data.token);
      setUser(data.data.user);
    }
    
    return data;
  },

  register: async (name, email, password, password_confirmation, role = 'user') => {
    const data = await apiRequest('/v2/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation, role }),
      skipAuth: true,
    });
    
    if (data.status === 'success' && data.data.token) {
      setToken(data.data.token);
      setUser(data.data.user);
    }
    
    return data;
  },

  logout: async () => {
    try {
      await apiRequest('/v2/auth/logout', { method: 'POST' });
    } finally {
      removeToken();
    }
  },

  refresh: async (refreshToken) => {
    return await apiRequest('/v2/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
      skipAuth: true,
    });
  },
};

// Users API
export const usersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/v2/users${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return await apiRequest(`/v2/users/${id}`);
  },

  create: async (userData) => {
    return await apiRequest('/v2/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  update: async (id, userData) => {
    return await apiRequest(`/v2/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  partialUpdate: async (id, userData) => {
    return await apiRequest(`/v2/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/v2/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Data API
export const dataAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/v2/data${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return await apiRequest(`/v2/data/${id}`);
  },

  create: async (dataItem) => {
    return await apiRequest('/v2/data', {
      method: 'POST',
      body: JSON.stringify(dataItem),
    });
  },

  update: async (id, dataItem) => {
    return await apiRequest(`/v2/data/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dataItem),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/v2/data/${id}`, {
      method: 'DELETE',
    });
  },
};

// Debug API
export const debugAPI = {
  getTables: async () => {
    return await apiRequest('/v2/debug/tables', { skipAuth: true });
  },

  getSchema: async (tableName) => {
    return await apiRequest(`/v2/debug/schema/${tableName}`, { skipAuth: true });
  },

  getJwtInfo: async () => {
    return await apiRequest('/v2/debug/jwt-info', { skipAuth: true });
  },
};

// Root API
export const rootAPI = {
  getInfo: async () => {
    return await apiRequest('/', { skipAuth: true });
  },
};

export const calculatorAPI = {
  evaluate: async (formula) => {
    return await apiRequest(`/v2/calculator?formula=${encodeURIComponent(formula)}`, {
      method: 'POST',
    });
  },
};

export default {
  auth: authAPI,
  users: usersAPI,
  data: dataAPI,
  debug: debugAPI,
  root: rootAPI,
  calculator: calculatorAPI,
};
