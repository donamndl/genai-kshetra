import axios from 'axios';

export const BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: BASE,
});

const authHeaders = () => {
  const token = localStorage.getItem('kshetra-token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const askGeneral = (query, language = 'en') =>
  apiClient.post('/general/ask', { query, language });

export const askAgriculture = (query, region = 'Odisha', language = 'en') =>
  apiClient.post('/agriculture/ask', { query, region, language });

export const askEducation = (query, language = 'en') =>
  apiClient.post('/education/ask', { query, language });

export const askMedical = (query, region = 'Odisha', language = 'en') =>
  apiClient.post('/medical/ask', { query, region, language });

export const authSignup = (name, email, password, mobile) =>
  apiClient.post('/auth/signup', { name, email, mobile, password });

export const authLogin = (identifier, password) =>
  apiClient.post('/auth/login', { identifier, password });

export const authForgotPassword = (email) =>
  apiClient.post('/auth/forgot-password', { email });

export const authResetPassword = (email, code, newPassword) =>
  apiClient.post('/auth/reset-password', { email, code, new_password: newPassword });

export const authGetMe = () =>
  apiClient.get('/auth/me', { headers: authHeaders() });

export const authUpdateProfile = (updates) =>
  apiClient.patch('/auth/profile', updates, { headers: authHeaders() });

export const loadHistory = (moduleKey) =>
  apiClient.get(`/history/${moduleKey}`, { headers: authHeaders() });

export const saveHistory = (moduleKey, messages) =>
  apiClient.post(`/history/${moduleKey}`, { messages }, { headers: authHeaders() });

export const clearHistory = (moduleKey) =>
  apiClient.delete(`/history/${moduleKey}`, { headers: authHeaders() });