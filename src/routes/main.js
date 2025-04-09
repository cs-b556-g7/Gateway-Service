import express from "express";
import { forwardToMainService } from "../controllers/mainController.js";
import logger from "../middlewares/logger.js";

const router = express.Router();

router.use(logger);
router.all("/*", forwardToMainService);

export default router;
