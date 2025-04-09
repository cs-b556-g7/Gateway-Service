import axios from "axios";
import { EMAIL_SERVICE_URL } from "../config/index.js";

export const forwardToEmailService = async (req, res) => {
  try {
    const url = `${EMAIL_SERVICE_URL}${req.originalUrl}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { ...req.headers },
      timeout: 5000,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      res.status(504).json({ error: "Request timed out. Please try again later." });
    } else if (err.response) {
      res.status(err.response.status).json({ error: err.response.data || "Service error" });
    } else {
      res.status(503).json({ error: "Service unreachable. Please try again later." });
    }
  }
};
