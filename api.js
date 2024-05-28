/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:6969',
  timeout: 10000, // 10 seconds
});

export default api;
