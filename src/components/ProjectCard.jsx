import Waveform from './Waveform';
import ChatFlow from './ChatFlow';

const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.99.36 1.97.68 2.9a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.18-1.25a2 2 0 012.11-.45c.93.32 1.91.55 2.9.68A2 2 0 0122 16.92z" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-6 3 4 5-8" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </svg>
  ),
};

function CircuitPattern({ id }) {
  return (
    <svg className="circuit-bg" viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`grid-${id}`} width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.4" fill="rgba(255,255,255,0.35)" />
          <path d="M0 0 L30 0 M0 0 L0 30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="300" height="160" fill={`url(#grid-${id})`} />
      <path d="M0 40 H90 L110 60 H300" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" className="circuit-line" />
      <path d="M0 120 H60 L80 100 H220 L240 120 H300" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" className="circuit-line circuit-line-2" />
    </svg>
  );
}

export default function ProjectCard({ w, isOpen, onToggle }) {
  return (
    <article className={`work-card${isOpen ? ' is-open' : ''}`} data-cursor="VIEW">
      <div className={`card-cover cover-${w.icon}`}>
        <CircuitPattern id={w.id} />
        {w.icon === 'plane' && (
          <svg className="plane-fly" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4z" />
          </svg>
        )}
        <span className="card-cover-icon">{ICONS[w.icon]}</span>
      </div>
      <div className="card-body">
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
            <a className="github-link" href={w.github} target="_blank" rel="noreferrer" data-cursor="CODE">
              View on GitHub ↗
            </a>
          )}
        </div>
        {w.flow && (
          <div className={`case-panel${isOpen ? ' open' : ''}`}>
            <div className="case-panel-inner">
              {w.icon === 'phone' && <Waveform />}
              {w.icon === 'spark' && <ChatFlow />}
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
      </div>
    </article>
  );
}
