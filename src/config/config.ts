export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:5000',
  frontendUrl: process.env.NODE_ENV === 'production' 
    ? 'https://folioar.com'
    : 'http://localhost:3000'
};