import express from "express";
import { submitCriterion6Data } from "../controllers/criteria6_controller.js";

const router6 = express.Router();

router6.post("/submit", submitCriterion6Data);

export default router6;
