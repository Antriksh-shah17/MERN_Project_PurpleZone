export default function StatementCard({ index, text, onEdit }) {
  return (
    <article className="statement-card">
      <div>
        <p className="statement-index">Statement {index + 1}</p>
        <p className="statement-text">{text}</p>
      </div>
      <button className="secondary-button" type="button" onClick={() => onEdit(index)}>
        Edit
      </button>
    </article>
  );
}
