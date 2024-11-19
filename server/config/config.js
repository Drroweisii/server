import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://api.folioar.com/'
      : 'http://localhost:3000',
  },
};