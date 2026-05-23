import Submission from "../models/Submission.js";
import User from "../models/User.js";
import { getRandomQuestions, sentenceBank } from "../data/sentenceBank.js";

function normalizeAnswer(answer) {
  return answer.trim().replace(/\s+/g, " ");
}

export function getQuestions(_request, response) {
  return response.json({
    questions: getRandomQuestions(3)
  });
}

export async function submitAnswers(request, response, next) {
  try {
    const { questionIds, answers } = request.body;
    const userId = request.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    const selectedQuestions = questionIds.map((id) => sentenceBank.find((item) => item.id === id));
    if (selectedQuestions.some((question) => !question)) {
      return response.status(400).json({ message: "One or more question IDs are invalid." });
    }

    const results = answers.map((answer, index) => {
      const submittedAnswer = normalizeAnswer(answer);
      const question = selectedQuestions[index];
      const correctAnswer = question.answer;
      const isCorrect = submittedAnswer === correctAnswer;

      return {
        questionId: question.id,
        statementNumber: index + 1,
        prompt: question.prompt,
        submittedAnswer,
        correctAnswer,
        isCorrect
      };
    });

    const score = results.filter((result) => result.isCorrect).length;

    const submission = await Submission.create({
      user: userId,
      answers: answers.map(normalizeAnswer),
      results,
      score
    });

    return response.status(201).json({
      _id: submission._id,
      score,
      total: selectedQuestions.length,
      incorrectCount: selectedQuestions.length - score,
      message:
        score === selectedQuestions.length
          ? "3/3 Correct. Excellent attention to detail."
          : "Some statements still contain errors.",
      results
    });
  } catch (error) {
    return next(error);
  }
}
