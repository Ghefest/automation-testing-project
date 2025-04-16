import dotenv from 'dotenv';
dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL || 'https://demoqa.com',
  apiKey: process.env.TRELLO_API_KEY || '',
  token: process.env.TRELLO_TOKEN || '',
};
