import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers
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
