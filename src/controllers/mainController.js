import axios from "axios";

export const forwardToMainService = async (req, res) => {
  const MAIN_SERVICE_URL = process.env.MAIN_SERVICE_URL;

  if (!MAIN_SERVICE_URL) {
    return res.status(500).json({ error: "MAIN_SERVICE_URL not configured" });
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${MAIN_SERVICE_URL}${req.originalUrl}`,
      data: req.body,
      headers: { ...req.headers },
      timeout: 5000,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
