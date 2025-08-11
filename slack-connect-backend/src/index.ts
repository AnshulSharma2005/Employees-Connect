import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import slackRoutes from './routes/slackRoutes.js';
import slackEvents from './routes/slackEvents.js';
import { AppDataSource } from './utils/dataSource.js';
import authRoutes from "./routes/authRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/slack', slackRoutes);
app.use('/slack', slackEvents);
app.use("/auth", authRoutes);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log("Server running on port ${PORT}"));
});