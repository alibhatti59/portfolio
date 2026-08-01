import { Suspense } from 'react';
import PipelineScene from './PipelineScene';
import './App.css';

const AUTOMATION_WORK = [
  {
    node: 'GHL + Vapi',
    title: 'AI Voice Agents — Real Estate Group',
    desc: 'Built and maintain voice agent systems across three brands, handling inbound lead calls, qualification, and CRM handoff without a human touching the first conversation.',
    stack: ['GoHighLevel', 'Vapi', 'Make'],
  },
  {
    node: 'n8n',
    title: 'Workflow Automation — [add project]',
    desc: 'Describe the trigger, the steps automated, and the outcome (time saved, errors removed, leads processed).',
    stack: ['n8n', 'Python', 'REST APIs'],
  },
  {
    node: 'Scraping',
    title: 'Data Pipeline — [add project]',
    desc: 'Describe what data was collected, how it was processed, and where it ended up.',
    stack: ['Python', 'Selenium', 'APIs'],
  },
];

const FULLSTACK_WORK = [
  {
    title: 'Flutter App — [add project name]',
    desc: 'One or two lines on what it does and who it is for.',
    stack: ['Flutter', 'Dart'],
  },
  {
    title: 'WordPress Build — [add project name]',
    desc: 'One or two lines on the build and any custom work involved.',
    stack: ['WordPress', 'PHP'],
  },
];

const STACK_LAYERS = [
  { layer: 'Automation', items: ['GoHighLevel', 'Vapi', 'Make', 'n8n', 'Webhooks'] },
  { layer: 'Application', items: ['Flutter', 'Dart', 'WordPress', 'React'] },
  { layer: 'Data & APIs', items: ['Python', 'REST APIs', 'Selenium', 'Web Scraping'] },
];

export default function App() {
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
            <a href="#work" className="btn-primary">See the work</a>
            <a href="https://github.com/alibhatti59" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      <section id="work" className="section">
        <p className="section-eyebrow">Automation — the lead</p>
        <h2>Systems that run the pipeline</h2>
        <div className="work-grid">
          {AUTOMATION_WORK.map((w) => (
            <article className="work-card" key={w.title}>
              <span className="work-node">{w.node}</span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="tag-row">
                {w.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="fullstack" className="section">
        <p className="section-eyebrow">Full-stack range</p>
        <h2>Beyond the pipeline</h2>
        <div className="work-grid">
          {FULLSTACK_WORK.map((w) => (
            <article className="work-card" key={w.title}>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="tag-row">
                {w.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="section">
        <p className="section-eyebrow">Stack</p>
        <h2>What runs underneath</h2>
        <div className="layers">
          {STACK_LAYERS.map((l) => (
            <div className="layer-row" key={l.layer}>
              <span className="layer-name">{l.layer}</span>
              <div className="layer-items">
                {l.items.map((i) => <span className="tag" key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <p className="section-eyebrow">Get in touch</p>
        <h2>Let's build something that runs itself</h2>
        <a className="btn-primary" href="mailto:thealibhatti.dev@gmail.com">thealibhatti.dev@gmail.com</a>
        <div className="hero-links" style={{ marginTop: '1.5rem' }}>
          <a href="https://github.com/alibhatti59" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
        </div>
      </section>
    </>
  );
}
