import axios from "axios";

export const forwardToEmailService = async (req, res) => {
  const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;

  if (!EMAIL_SERVICE_URL) {
    return res.status(500).json({ error: "EMAIL_SERVICE_URL not configured" });
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${EMAIL_SERVICE_URL}${req.originalUrl}`,
      data: req.body,
      headers: { ...req.headers },
      timeout: 5000,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
