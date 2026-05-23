import Joi from "joi";

const email = Joi.string().trim().lowercase().email().required().messages({
  "string.empty": "Email is required.",
  "string.email": "Enter a valid email address.",
  "any.required": "Email is required."
});

const password = Joi.string().min(6).max(128).required().messages({
  "string.empty": "Password is required.",
  "string.min": "Password must be at least 6 characters.",
  "any.required": "Password is required."
});

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters.",
    "any.required": "Name is required."
  }),
  email,
  password
});

export const loginSchema = Joi.object({
  email,
  password
});
