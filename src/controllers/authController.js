import axios from "axios";

export const forwardToAuthService = async (req, res) => {
  const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
  const path = req.originalUrl.replace(/^\/auth/, "");
  const targetUrl = `${AUTH_SERVICE_URL}${path}`;

  console.log("🔁 Forwarding to AUTH →", targetUrl);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        host: new URL(AUTH_SERVICE_URL).host,
      },
      timeout: 5000,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("❌ AUTH proxy error:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
