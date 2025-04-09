import express from "express";
import { forwardToAuthService } from "../controllers/authController.js";
import logger from "../middlewares/logger.js";

const router = express.Router();

router.use(logger);
router.all("/*", forwardToAuthService);

export default router;
