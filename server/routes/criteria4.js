import express from "express";
import { submitCriterion4Data } from "../controllers/criteria4_controller.js";

const router = express.Router();

router.post("/submit", submitCriterion4Data);

export default router;
