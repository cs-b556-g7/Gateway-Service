import { proxyToAuthService } from '../services/proxyServices.js';

export const register = async (req, res) => {
    try {
      const result = await proxyToAuthService('/register', req);
      return res.status(result.status).json(result.data); // ✅ forward to frontend
    } catch (error) {
      console.error("❌ Error in gateway register:", error?.response?.data || error.message);
      return res
        .status(error?.response?.status || 500)
        .json(error?.response?.data || { error: "Gateway Error" });
    }
  };
    
export const login = async (req, res) => {
  try {
    const result = await proxyToAuthService('/login', req);
    return res.status(result.status).json(result.data); // Forward login result to frontend
  } catch (error) {
    console.error("Gateway Login Error:", error?.response?.data || error.message);
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || { error: "Gateway Error" });
  }
};
