import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }
    if (error.response?.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

const taskApi = {
  // Get all tasks with filters
  getAllTasks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    
    return api.get(`/tasks?${params.toString()}`);
  },

  // Get single task
  getTask: (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Create new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Delete task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  }
};

export default taskApi;
