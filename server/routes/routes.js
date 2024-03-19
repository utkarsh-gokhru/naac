import express from "express";
import MCQController from "../controllers/MCQController.js";

const router = express.Router();

router.post("/mcq/submit", MCQController.submitMCQForm);
router.get("/mcq/progress", MCQController.getMCQProgress);

export default router;
