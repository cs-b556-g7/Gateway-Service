import { proxyToAuthService } from '../services/proxyServices.js';

export const register = async (req, res) => {
  try {
    const result = await proxyToAuthService('/register', req);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("❌ Gateway Register Error:", error?.response?.data || error.message);
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || { error: "Gateway Error" });
  }
};

export const login = async (req, res) => {
  try {
    const result = await proxyToAuthService('/login', req);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("❌ Gateway Login Error:", error?.response?.data || error.message);
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || { error: "Gateway Error" });
  }
};

export const verifyDuo = async (req, res) => {
  try {
    const result = await proxyToAuthService('/duo/callback', req);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error("❌ Gateway Duo Verify Error:", error?.response?.data || error.message);
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || { error: "Gateway Error" });
  }
};

export const duoRedirect = async (req, res) => {
  try {
    const duoRedirectUrl = `http://localhost:5173/duo/callback${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`;
    return res.redirect(duoRedirectUrl);
  } catch (error) {
    console.error("❌ Gateway Duo Redirect Error:", error?.response?.data || error.message);
    return res
      .status(error?.response?.status || 500)
      .send(error?.response?.data || "Gateway Error");
  }
};
