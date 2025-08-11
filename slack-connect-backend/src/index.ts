import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import slackRoutes from './routes/slackRoutes';
import slackEvents from './routes/slackEvents';
import { AppDataSource } from './utils/dataSource';
import authRoutes from "./routes/authRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: '*', // or 'http://localhost:5173' for stricter
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/slack', slackRoutes);
app.use('/slack/events', slackEvents);
app.use("/auth", authRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

});