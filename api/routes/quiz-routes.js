// /api/routes/quizRoutes.js
import express from "express";
import { QuizAdd, getQuizById,getAllQuizzes} from "../../controllers/quiz-controller.js";
import { submitQuiz } from "../../controllers/quiz-controller.js";
const router = express.Router();

router.post("/add", QuizAdd); // POST /api/quiz/add
router.get("/all", getAllQuizzes); // GET /api/quiz/all
router.get("/:id", getQuizById);
router.post("/submit", submitQuiz);
export default router;
