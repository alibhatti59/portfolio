export default function ProjectCard({ w, isOpen, onToggle }) {
  return (
    <article className={`work-card${isOpen ? ' is-open' : ''}`}>
      {w.node && <span className="work-node">{w.node}</span>}
      <h3>{w.title}</h3>
      <p>{w.desc}</p>
      <div className="tag-row">
        {w.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
      </div>
      <div className="card-actions">
        {w.flow && (
          <button className="case-toggle" onClick={onToggle} aria-expanded={isOpen}>
            {isOpen ? 'Close case study' : 'View case study'}
            <span className={`chevron${isOpen ? ' up' : ''}`}>›</span>
          </button>
        )}
        {w.github && (
          <a className="github-link" href={w.github} target="_blank" rel="noreferrer">
            View on GitHub ↗
          </a>
        )}
      </div>
      {w.flow && (
        <div className={`case-panel${isOpen ? ' open' : ''}`}>
          <div className="case-panel-inner">
            <div className="flow-diagram">
              {w.flow.map((step, i) => (
                <span className="flow-step" key={step}>
                  <span className="flow-node">{step}</span>
                  {i < w.flow.length - 1 && <span className="flow-line" />}
                </span>
              ))}
            </div>
            <p className="case-tradeoff">
              <span className="case-label">Trade-off</span>
              {w.tradeoff}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
