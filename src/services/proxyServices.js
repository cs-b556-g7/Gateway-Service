// src/services/proxyServices.js
import axios from 'axios';

const AUTH_SERVICE_BASE_URL = 'http://localhost:5000'; // 🔁 Updated from 8000 to 5000

export const proxyToAuthService = async (path, req) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${AUTH_SERVICE_BASE_URL}${path}`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response; // ✅ Gateway will forward this to frontend
  } catch (err) {
    console.error("❌ Error proxying to Auth Service:", err?.response?.data || err.message);
    throw err;
  }
};
