export default function ResultSummary({ result }) {
  return (
    <div className="result-panel">
      <div className="score-ring">
        <strong>
          {result.score}/{result.total}
        </strong>
        <span>Correct</span>
      </div>

      <div className="result-copy">
        <h2>{result.score === result.total ? "Excellent work" : "Keep refining"}</h2>
        <p>{result.message}</p>
        <p>
          Incorrect answers: <strong>{result.incorrectCount}</strong>
        </p>
      </div>
    </div>
  );
}
