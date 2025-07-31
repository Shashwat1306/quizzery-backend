import express from 'express';
import userRoutes from './user-routes.js';
import quizRoutes from './quiz-routes.js';  
export const indexRoute=express.Router();
indexRoute.use('/user', userRoutes);
indexRoute.use('/quiz', quizRoutes); // Use quiz routes under /api/quiz

