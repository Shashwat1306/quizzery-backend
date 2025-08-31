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
  try {
    const { id } = req.params;
    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // remove the correct answers before sending to frontend
    const sanitizedQuestions = quiz.questions.map((question) => {
      const obj = question.toObject();
      delete obj.correct;
      return obj;
    });

    const sanitizedQuiz = {
      _id: quiz._id,
      title: quiz.title,
      duration: quiz.duration,   // ✅ include duration here
      questions: sanitizedQuestions,
      createdAt: quiz.createdAt,
      status: quiz.status,
    };

    res.json(sanitizedQuiz);
  } catch (error) {
    console.error("Error in getQuizById:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

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

    // 1. Fetch the quiz
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const review = [];

    // 2. Evaluate each question
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      const correctAnswer = question.correct;

      if (userAnswer && userAnswer === correctAnswer) {
        score += 1;
      }

      review.push({
        question: question.question,
        correctAnswer,
        userAnswer: userAnswer || null,
        options: {
          A: question.optionA,
          B: question.optionB,
          C: question.optionC,
          D: question.optionD,
        },
      });
    });

    // 3. Return score and review
    res.json({
      score,
      total: quiz.questions.length,
      review,
    });

  } catch (err) {
    console.error("Submit quiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

