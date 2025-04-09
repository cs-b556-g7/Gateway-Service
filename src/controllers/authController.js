import axios from "axios";

export const forwardToAuthService = async (req, res) => {
  const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

  if (!AUTH_SERVICE_URL) {
    return res.status(500).json({ error: "AUTH_SERVICE_URL not configured" });
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${AUTH_SERVICE_URL}${req.originalUrl}`,
      data: req.body,
      headers: { ...req.headers },
      timeout: 5000,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
