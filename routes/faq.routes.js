import express from "express";
import {
  addFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  getFaqCount
} from "../controllers/faq.controller.js";

const router = express.Router();

// Routes
router.get("/count", getFaqCount);
router.post("/post", addFaq);
router.get("/get", getFaqs);
router.get("/:id", getFaqById);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);


export default router;
