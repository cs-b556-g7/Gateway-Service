import axios from "axios";

export const forwardToEmailService = async (req, res) => {
  const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;
  const path = req.originalUrl.replace(/^\/email/, "");
  const targetUrl = `${EMAIL_SERVICE_URL}${path}`;

  console.log("🔁 Forwarding to EMAIL →", targetUrl);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: new URL(EMAIL_SERVICE_URL).host,
      },
      timeout: 5000,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("❌ EMAIL proxy error:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};
