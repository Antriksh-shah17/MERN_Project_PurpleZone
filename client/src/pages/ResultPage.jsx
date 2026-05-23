import { Navigate, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import successIcon from "../assets/icons/Group 3.png";
import failIcon from "../assets/icons/Group 5.png";

export default function ResultPage() {
  const navigate = useNavigate();
  const storedResult = sessionStorage.getItem("purplezoneLatestResult");
  const user = JSON.parse(localStorage.getItem("purplezoneUser") || "null");

  if (!storedResult) {
    return <Navigate to="/test" replace />;
  }

  const result = JSON.parse(storedResult);

  return (
    <PageShell>
      <section className="center-panel result-panel-exact">
        <h1 className="result-heading">
          <span>Congratulations:</span> {user?.name || "User"}
        </h1>
        <div className="panel-lines">
        {result.results.map((item, index) => (
            <div className="panel-line result-line" key={`${item.statementNumber}-${index}`}>
              <div className="result-line-row">
                <p>Corrected statement {index + 1}</p>
                <span
                  className={`result-icon ${item.isCorrect ? "result-icon-success" : "result-icon-fail"}`}
                >
                  <img
                    src={item.isCorrect ? successIcon : failIcon}
                    alt={item.isCorrect ? "Correct" : "Incorrect"}
                  />
                </span>
              </div>
              <span className="panel-underline" />
            </div>
        ))}
        </div>

        <p className="result-score-copy">
          You successfully corrected <span>{result.score}/{result.total}</span> errors.
        </p>
        {result.score !== result.total && (
          <p className="result-subcopy">{result.message}</p>
        )}
        <button className="exact-button result-retry" type="button" onClick={() => navigate("/test")}>
          Retake Test
        </button>
      </section>
    </PageShell>
  );
}
