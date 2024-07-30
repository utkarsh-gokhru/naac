import express from "express";
import { downloadCriteriaSection } from "../controllers/adminController.js";

const router = express.Router();

router.get("/download/:criteria/:section", downloadCriteriaSection);

export { router as adminRoute};