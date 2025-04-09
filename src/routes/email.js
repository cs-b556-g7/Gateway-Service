import express from "express";
import { forwardToEmailService } from "../controllers/emailController.js";
import logger from "../middlewares/logger.js";

const router = express.Router();

router.use(logger);
router.all("/*", forwardToEmailService);

export default router;
