import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import { getStoredQuestions, refreshQuestions } from "../utils/testSession";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export default function EditPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("purplezoneUser") || "null");
  const [questions, setQuestions] = useState(getStoredQuestions());
  const [answers, setAnswers] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(!getStoredQuestions().length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!questions.length) {
      setLoadingQuestions(true);
      refreshQuestions()
        .then(setQuestions)
        .catch(() => {})
        .finally(() => setLoadingQuestions(false));
      return;
    }

    setLoadingQuestions(false);
  }, [questions]);

  useEffect(() => {
    const storedDraft = sessionStorage.getItem("purplezoneDraftAnswers");
    if (storedDraft && questions.length) {
      setAnswers(JSON.parse(storedDraft));
      return;
    }

    setAnswers(questions.map((question) => question.prompt));
  }, [questions]);

  const handleChange = (index, value) => {
    const updatedAnswers = answers.map((answer, currentIndex) =>
      currentIndex === index ? value : answer
    );
    setAnswers(updatedAnswers);
    sessionStorage.setItem("purplezoneDraftAnswers", JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`${API_BASE_URL}/submissions`, {
        userId: user?._id,
        questionIds: questions.map((question) => question.id),
        answers
      });

      sessionStorage.setItem("purplezoneLatestResult", JSON.stringify(data));
      sessionStorage.removeItem("purplezoneDraftAnswers");
      navigate("/result");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit answers.");
    } finally {
      setLoading(false);
    }
  };

  if (!loadingQuestions && !questions.length) {
    return <Navigate to="/test" replace />;
  }

  return (
    <PageShell>
      <form className="center-panel" onSubmit={handleSubmit}>
        <h1 className="panel-title">Test 1</h1>
        <div className="panel-lines panel-lines-edit">
        {answers.map((answer, index) => (
            <label className="panel-line panel-line-input" key={`editor-${index + 1}`}>
              <input
                type="text"
                value={answer}
                onChange={(event) => handleChange(index, event.target.value)}
                required
              />
              <span className="panel-underline" />
            </label>
        ))}
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="center-panel-actions">
          <button className="exact-button" type="submit" disabled={loading || loadingQuestions || answers.length !== 3}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </PageShell>
  );
}
