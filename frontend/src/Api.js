import axios from 'axios';

const BASE = 'http://127.0.0.1:8000';

export const askGeneral     = (query, language = 'en') =>
  axios.post(`${BASE}/general/ask`, { query, language });

export const askAgriculture = (query, region = 'Odisha', language = 'en') =>
  axios.post(`${BASE}/agriculture/ask`, { query, region, language });

export const askEducation   = (query, language = 'en') =>
  axios.post(`${BASE}/education/ask`, { query, language });

export const askMedical     = (query, region = 'Odisha', language = 'en') =>
  axios.post(`${BASE}/medical/ask`, { query, region, language });