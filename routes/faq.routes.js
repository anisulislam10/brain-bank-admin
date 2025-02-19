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
router.post("/post", addFaq);
router.get("/get", getFaqs);
router.get("/:id", getFaqById);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);
router.get("/count", getFaqCount);


export default router;
