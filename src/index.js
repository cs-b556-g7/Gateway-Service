import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import mainRoutes from "./routes/main.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/email.js";

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Secure HTTP headers
app.use(helmet());

// CORS with frontend access and credentials
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// JSON body parsing
app.use(express.json());

// Route mounting
app.use("/main", mainRoutes);
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

// Health check
app.get("/", (req, res) => res.send("✅ Gateway is live"));

app.listen(PORT, () => {
  console.log(`🚀 Gateway running at http://localhost:${PORT}`);
});
