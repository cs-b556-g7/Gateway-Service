import express from 'express';
import { login, register, verifyDuo, duoRedirect } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login); 
router.post('/register', register); 

router.post('/duo/callback', verifyDuo); 
router.get('/duo/callback', duoRedirect);

export default router;
