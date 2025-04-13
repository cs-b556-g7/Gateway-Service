import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);       // ✅ working route
router.post('/register', register); // ✅ working route

export default router;
