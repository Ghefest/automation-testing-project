import axios from 'axios';
import 'dotenv/config';

export const trello = axios.create({
  baseURL: 'https://api.trello.com/1',
  headers: { Accept: 'application/json' },
  params: {
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_TOKEN,
  },
});
