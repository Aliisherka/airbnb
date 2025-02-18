import { API_URL } from "./config";
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      logout();
    }
    return Promise.reject(error);
  }
);

export const postRequest = (url: string, body: any = {}, options: object = {}) => {
  return apiClient.post(url, body, options);
};
