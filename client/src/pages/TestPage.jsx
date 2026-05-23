import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import { getStoredQuestions, refreshQuestions } from "../utils/testSession";

export default function TestPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(getStoredQuestions());

  useEffect(() => {
    if (questions.length) {
      return;
    }

    refreshQuestions()
      .then(setQuestions)
      .catch(() => {});
  }, [questions]);

  return (
    <PageShell>
      <section className="center-panel">
        <h1 className="panel-title">Test 1</h1>
        <div className="panel-lines">
        {questions.map((question) => (
            <div className="panel-line" key={question.id}>
              <p>{question.prompt}</p>
              <span className="panel-underline" />
            </div>
        ))}
        </div>

        <button
          className="exact-button"
          type="button"
          onClick={() => navigate("/edit")}
          disabled={questions.length !== 3}
        >
          Edit
        </button>
      </section>
    </PageShell>
  );
}
