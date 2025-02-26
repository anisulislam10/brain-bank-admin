import express from "express";
import { verifyCaptcha } from "../controllers/captcha.controller.js";

const router = express.Router();

router.post("/verify-captcha", verifyCaptcha);

export default router;