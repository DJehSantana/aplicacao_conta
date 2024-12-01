import axios from 'axios';
import { setupInterceptors } from '../config/interceptors';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 10000, 
});

// Configurar os interceptors
setupInterceptors(api);

export default api;