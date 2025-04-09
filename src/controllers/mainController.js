import axios from "axios";

export const forwardToMainService = async (req, res) => {
  const MAIN_SERVICE_URL = process.env.MAIN_SERVICE_URL;
  const path = req.originalUrl.replace(/^\/main/, "");
  const targetUrl = `${MAIN_SERVICE_URL}${path}`;

  console.log("🔁 Forwarding to MAIN →", targetUrl);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(MAIN_SERVICE_URL).host, // 🛠️ explicitly set downstream Host
      },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("❌ MAIN proxy error:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
