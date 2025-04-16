import axios from 'axios';

export const demoqaApi = axios.create({
  baseURL: 'https://demoqa.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
