import axios from 'axios';
import { API_BASE_URL, API_VERSION } from '../utils/constants';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_VERSION}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
