import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

// Remove trailing slash if present
const baseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for Railway
});

// Request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  // Get all tasks
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.done !== undefined) params.append('done', filters.done);
    if (filters.search) params.append('search', filters.search);
    
    const response = await api.get(`/tasks?${params}`);
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Toggle task completion
  toggleTask: async (id) => {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },

  // Get task statistics
  getTaskStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },
};

export default api;