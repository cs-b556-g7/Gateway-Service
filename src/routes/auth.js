import express from "express";
import { forwardToAuthService } from "../controllers/authController.js";
import requestLogger from "../middlewares/requestlogger.js";

const router = express.Router();

router.use(requestLogger);
router.all("/*", forwardToAuthService);

export default router;
