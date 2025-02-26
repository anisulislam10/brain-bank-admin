import express from "express";
const { verifyCaptcha } = require("../controllers/captcha.controller.js");
const router = express.Router();

router.post("/verify-captcha", verifyCaptcha);

module.exports = router;
