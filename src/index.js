import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import requestLogger from "./middlewares/requestLogger.js";

import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/email.js";
import mainRoutes from "./routes/main.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Security & middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging
app.use(requestLogger);
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP. Please try again later."
});
app.use(limiter);

// Routes
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);
app.use("/main", mainRoutes);

// Health check
app.get("/", (req, res) => res.send("✅ Gateway Service is Live"));

// Server
app.listen(PORT, () => {
  console.log(`🚀 Gateway running on port ${PORT}`);
});
