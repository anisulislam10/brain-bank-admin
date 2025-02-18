import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from 'path';

// Importing Routes
import authRoutes from "./routes/auth.routes.js";
import headerRoutes from "./routes/header.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import teamRoutes from "./routes/team.routes.js";
import whyusRoutes from "./routes/whyus.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files (If Using File Uploads)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/header", headerRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/whyus", whyusRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Export the app for Vercel
export default app;
