import { Router } from "express";
import { getQuestions, submitAnswers } from "../controllers/submissionController.js";

const router = Router();

router.get("/questions", getQuestions);
router.post("/", submitAnswers);

export default router;
