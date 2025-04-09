import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mainRoutes from "./routes/main.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/email.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/main", mainRoutes);
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);

app.get("/", (req, res) => res.send("✅ Gateway is live"));

app.listen(PORT, () => console.log(`🚀 Gateway running on port ${PORT}`));
