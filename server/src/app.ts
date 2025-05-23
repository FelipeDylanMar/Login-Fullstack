import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import userRoutes from './routes/user.routes';
import { Request, Response } from 'express';

dotenv.config();

export const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.use('/users', userRoutes);
