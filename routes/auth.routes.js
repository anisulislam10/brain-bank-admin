import express from "express";
import { registerSuperAdmin, loginSuperAdmin } from "../controllers/auth.controller.js";
import { protectSuperAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerSuperAdmin);

router.post("/login", loginSuperAdmin);

router.get("/protected", protectSuperAdmin, (req, res) => {
  res.json({ message: "You have access to this protected route" });
});

export default router;
