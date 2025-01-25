import express from "express";
import { downloadCriteriaSection } from "../controllers/adminController.js";
import { addDept } from "../controllers/addDept.js";

const router = express.Router();

router.get("/download/:criteria/:section/:academicYear", downloadCriteriaSection);

router.post('/add-dept',addDept);

export { router as adminRoute};