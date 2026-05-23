import { Router } from "express";
import { getQuestions, submitAnswers } from "../controllers/submissionController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { submitAnswersSchema } from "../validation/submissionValidation.js";

const router = Router();

router.get("/questions", requireAuth, getQuestions);
router.post("/", requireAuth, validateRequest(submitAnswersSchema), submitAnswers);

export default router;
