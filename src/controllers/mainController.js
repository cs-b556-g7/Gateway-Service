import axios from "axios";

export const forwardToMainService = async (req, res) => {
  const MAIN_SERVICE_URL = process.env.MAIN_SERVICE_URL;
  const path = req.originalUrl.replace(/^\/main/, "");

  try {
    const response = await axios({
      method: req.method,
      url: `${MAIN_SERVICE_URL}${path}`,
      data: req.body,
      headers: { ...req.headers },
      timeout: 5000,
    });
    res.status(response.status).json(response.data);
    console.log("Forwarding to:", `${MAIN_SERVICE_URL}${path}`);

  } catch (err) {
    console.log("Forwarding to:", `${MAIN_SERVICE_URL}${path}`);

    console.error("❌ MAIN proxy error:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
