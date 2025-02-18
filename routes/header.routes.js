import express from "express";
import {
  addHeader,
  getHeaders,
  getHeaderById,
  updateHeader,
  deleteHeader,
} from "../controllers/header.controller.js";

const router = express.Router();

// Routes
router.post("/post", addHeader);
router.get("/get", getHeaders);
router.get("/:id", getHeaderById);
router.put("/:id", updateHeader);
router.delete("/:id", deleteHeader);

export default router;
