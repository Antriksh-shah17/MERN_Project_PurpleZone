import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
const QUESTIONS_KEY = "purplezoneCurrentQuestions";
const DRAFT_KEY = "purplezoneDraftAnswers";
const RESULT_KEY = "purplezoneLatestResult";

export function getStoredQuestions() {
  return JSON.parse(sessionStorage.getItem(QUESTIONS_KEY) || "[]");
}

export function clearTestSession() {
  sessionStorage.removeItem(QUESTIONS_KEY);
  sessionStorage.removeItem(DRAFT_KEY);
  sessionStorage.removeItem(RESULT_KEY);
}

export async function refreshQuestions() {
  const { data } = await axios.get(`${API_BASE_URL}/submissions/questions`);
  sessionStorage.setItem(QUESTIONS_KEY, JSON.stringify(data.questions));
  sessionStorage.removeItem(DRAFT_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  return data.questions;
}
