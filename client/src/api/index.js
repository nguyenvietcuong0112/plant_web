import axios from 'axios';

// Cấu hình URL API linh hoạt cho cả môi trường local và production
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';

const api = axios.create({
  baseURL: API_URL,
});

// Thêm token vào headers cho các request cần xác thực
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supabase.auth.token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPlants = () => api.get('/plants');
export const getPlantById = (id) => api.get(`/plants/${id}`);
export const createPlant = (formData) => api.post('/plants', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updatePlant = (id, formData) => api.put(`/plants/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deletePlant = (id) => api.delete(`/plants/${id}`);

export default api;
