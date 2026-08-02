import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import PipelineScene from '../PipelineScene';

const SERVICES = [
  {
    title: 'AI Voice Agents',
    desc: 'Inbound call handling that qualifies, books, and hands off — without a human on the first call.',
    tags: ['Vapi', 'GoHighLevel'],
  },
  {
    title: 'Workflow Automation',
    desc: 'Lead scoring, follow-ups, and CRM syncing that run themselves, with alerts when something breaks.',
    tags: ['n8n', 'Make.com'],
  },
  {
    title: 'Full-Stack Builds',
    desc: 'Apps and dashboards from Flutter to Python, when the project needs more than automation alone.',
    tags: ['Python', 'Flutter'],
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-canvas">
          <Suspense fallback={null}>
            <PipelineScene />
          </Suspense>
        </div>
        <div className="hero-content">
          <p className="eyebrow">AI Automation Engineer</p>
          <h1>Ali Bhatti</h1>
          <p className="hero-sub">
            I build voice agents and automation pipelines that pick up the calls,
            move the leads, and skip the busywork — GoHighLevel, Vapi, Make, n8n,
            with a full-stack range behind them.
          </p>
          <div className="hero-links">
            <Link to="/work" className="btn-primary">See the work</Link>
            <Link to="/contact" className="btn-ghost">Start a project</Link>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      <section className="section">
        <p className="section-eyebrow">What I build</p>
        <h2>Systems that run without you in the room</h2>
        <div className="work-grid">
          {SERVICES.map((s) => (
            <article className="work-card service-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="tag-row">
                {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <p className="section-eyebrow">Ready when you are</p>
        <h2>Have a process that's still manual? Let's automate it.</h2>
        <p className="hero-sub" style={{ marginBottom: '2.25rem' }}>
          Whether it's a voice agent, a lead pipeline, or a full-stack build —
          tell me what's eating your time and I'll tell you honestly whether
          automation is the right fix.
        </p>
        <div className="hero-links">
          <Link to="/contact" className="btn-primary">Get in touch</Link>
          <Link to="/work" className="btn-ghost">View full portfolio</Link>
        </div>
      </section>
    </>
  );
}
