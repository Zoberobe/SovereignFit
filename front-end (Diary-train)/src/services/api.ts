// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7278/api', 
});