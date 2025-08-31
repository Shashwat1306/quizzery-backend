import mongoose, { Schema, SchemaTypes } from "mongoose";

const questionSchema = new Schema({
  question: { type: SchemaTypes.String, required: true },
  optionA: { type: SchemaTypes.String, required: true },
  optionB: { type: SchemaTypes.String, required: true },
  optionC: { type: SchemaTypes.String, required: true },
  optionD: { type: SchemaTypes.String, required: true },
  correct: { type: SchemaTypes.String, required: true }, // Should be one of 'A', 'B', 'C', 'D'
});

const quizSchema = new Schema({
  title: { type: SchemaTypes.String, required: true },
  duration: { type: SchemaTypes.Number, required: true }, // duration in minutes
  questions: [questionSchema],
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  status: { type: SchemaTypes.String, default: "active" },
});

export const QuizModel = mongoose.model("Quiz", quizSchema);

