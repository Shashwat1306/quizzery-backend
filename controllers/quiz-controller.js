import { QuizModel } from '../models/quiz-model.js';
export const QuizAdd = async (req, res) => {
  console.log("Request received at /api/quiz/add");

  try {
    const quizObject = req.body;
    console.log("Quiz Data:", quizObject); // log request body

    const doc = await QuizModel.create(quizObject);
    if (doc && doc._id) {
      return res.status(201).json({ message: "Quiz added successfully" });
    } else {
      return res.status(500).json({ message: "Quiz not added" });
    }
  } catch (err) {
    console.error("Error in QuizAdd:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};
export const getQuizById = async (req, res) => {
  try{
    const { id } = req.params;
    const quiz= await QuizModel.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const sanitizedQuestions=quiz.questions.map((question) => {
      const obj=question.toObject();
      delete obj.correct;
      return obj;
    })
    const sanitizedQuiz = {
      _id: quiz._id,
      title: quiz.title,
      questions: sanitizedQuestions,
      createdAt: quiz.createdAt,
      status: quiz.status,
    };

    res.json(sanitizedQuiz);
  }catch (error) {
    console.error("Error in getQuizById:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
export const getAllQuizzes = async (req, res) => {
  try {
    console.log("Inside getAllQuizzes"); 
    const quizzes = await QuizModel.find({}, 'title'); 
    console.log("Fetched quizzes:", quizzes);     
    res.json(quizzes);
  } catch (error) {
    console.error("getAllQuizzes error:", error); 
    res.status(500).json({ message: "Server error" });
  }
};
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // 1. Find the quiz by ID
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    // 2. Compare submitted answers to correct ones
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      if (userAnswer && userAnswer === question.correct) {
        score += 1;
      }
    });

    // 3. Send back the score
    res.json({ score, total: quiz.questions.length });

  } catch (err) {
    console.error("Submit quiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
