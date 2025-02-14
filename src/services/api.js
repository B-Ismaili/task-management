import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Project API
export const fetchProjects = () => axios.get(`${API_URL}/projects`);
export const createProject = (data) => axios.post(`${API_URL}/projects`, data);

// Category API
export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) =>
  axios.post(`${API_URL}/categories`, data);

// Task API
export const fetchTasks = (filters = {}) =>
  axios.get(`${API_URL}/tasks`, { params: filters });
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data);
export const markTaskComplete = (id) =>
  axios.put(`${API_URL}/tasks/${id}/complete`);
