import express from "express";
import { getAll, getById, create, update, deleteEntry, upload } from "../controllers/whyus.controller.js";

const router = express.Router();

router.get("/get", getAll);
router.get("/:id", getById);
router.post("/post", upload.single("image"), create);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", deleteEntry);

export default router;
