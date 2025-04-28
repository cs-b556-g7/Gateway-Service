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
        'Content-Type': 'application/json',
        host: new URL(EMAIL_SERVICE_URL).host,
      },
    });

   
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
        error: err.response?.data?.error || err.message || "Unknown error"
      });
      
  }
};
