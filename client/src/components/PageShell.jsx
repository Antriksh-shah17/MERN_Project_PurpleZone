import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { clearAuthSession } from "../utils/authSession";
import { clearTestSession } from "../utils/testSession";

export default function PageShell({ children, stageClassName = "" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    clearTestSession();
    navigate("/", { replace: true });
  };

  return (
    <main className="exact-page app-page">
      <header className="top-strip">
        <div className="top-strip-inner">
          <Logo />
          <button className="logout-button" type="button" onClick={handleLogout} aria-label="Log out">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
              <path d="M14 8l4 4-4 4" />
              <path d="M8 12h10" />
            </svg>
          </button>
        </div>
      </header>
      <section className={`stage-wrap ${stageClassName}`.trim()}>
        {children}
      </section>
    </main>
  );
}
