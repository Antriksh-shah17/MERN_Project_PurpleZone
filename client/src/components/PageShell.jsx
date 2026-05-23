import Logo from "./Logo";

export default function PageShell({ children, stageClassName = "" }) {
  return (
    <main className="exact-page app-page">
      <header className="top-strip">
        <div className="top-strip-inner">
          <Logo />
        </div>
      </header>
      <section className={`stage-wrap ${stageClassName}`.trim()}>
        {children}
      </section>
    </main>
  );
}
