import Joi from "joi";

export const submitAnswersSchema = Joi.object({
  questionIds: Joi.array().items(Joi.number().integer().positive().required()).length(3).required().messages({
    "array.base": "Question IDs must be an array.",
    "array.length": "Exactly three question IDs are required.",
    "any.required": "Question IDs are required."
  }),
  answers: Joi.array().items(Joi.string().trim().min(1).max(300).required()).length(3).required().messages({
    "array.base": "Answers must be an array.",
    "array.length": "Exactly three answers are required.",
    "any.required": "Answers are required."
  })
});
