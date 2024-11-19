import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', testRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});