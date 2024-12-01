import axios from 'axios';
//import { setupInterceptors } from '../utils/interceptors';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000, 
});

// Configurar os interceptors
//setupInterceptors(api);

//export default api;