import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import headerRoutes from "./routes/header.routes.js";
import faqRoutes from './routes/faq.routes.js'
import teamRoutes from './routes/team.routes.js'
import whyusRoutes from './routes/whyus.routes.js'
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from 'path';


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//end points
app.use("/api/auth", authRoutes);
app.use("/api/header", headerRoutes);
app.use("/api/faq",faqRoutes)
app.use("/api/team",teamRoutes)
app.use("/api/whyus",whyusRoutes)



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
