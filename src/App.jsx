import { Suspense, lazy, useState, useEffect } from 'react';
import Spotlight from './components/Spotlight';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import ContactIcon from './components/ContactIcon';
import Preloader from './components/Preloader';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/CustomCursor';
import IntroLoader from './components/IntroLoader';
import FloatingElements from './components/FloatingElements';
import Magnetic from './components/Magnetic';
import FlipCard from './components/FlipCard';
import { fireBurst } from './utils/burst';
import ParticleField from './components/ParticleField';
import OrbitVisual from './components/OrbitVisual';
import ScrollRail from './components/ScrollRail';
import SectionIndex from './components/SectionIndex';
import BackToTop from './components/BackToTop';
import profilePic from './assets/profile.jpeg';
import './App.css';

const PipelineScene = lazy(() => import('./PipelineScene'));

const AUTOMATION_WORK = [
  {
    id: 'voice-agent-booking',
    icon: 'phone',
    node: 'Vapi + n8n',
    title: 'AI Voice Agent: Appointment Booking System',
    desc: 'A fully automated AI voice agent that answers real phone calls, holds a natural conversation, and books real appointments directly to Google Calendar, no human involvement.',
    stack: ['Vapi', 'n8n', 'Python', 'FastAPI', 'Google Calendar API'],
    github: 'https://github.com/alibhatti59/voice-agent-booking-api',
    flow: ['Inbound Call', 'Vapi Voice AI', 'n8n Workflow', 'FastAPI Backend', 'Google Calendar'],
    tradeoff: 'Handled date validation and error cases in the backend instead of trusting the voice layer to confirm bookings. The system fails gracefully on missing or unclear details rather than falsely confirming an appointment that was never actually booked.',
  },
  {
    id: 'lead-qualification',
    icon: 'spark',
    node: 'n8n + Gemini',
    title: 'AI Lead Qualification & Auto-Booking Agent',
    desc: 'Instantly qualifies incoming leads and responds before they lose interest. Google Gemini reads each submission and scores it Hot, Warm, or Cold, hot leads get auto-booked against real calendar availability, warm and cold leads get a personalized follow-up email instead of silence.',
    stack: ['n8n', 'Google Gemini', 'GoHighLevel'],
    github: 'https://github.com/alibhatti59/ai-lead-qualification-agent',
    flow: ['Form Submission', 'Gemini Scoring', 'Hot / Warm / Cold', 'Auto-Book or Follow-up', 'GHL CRM'],
    tradeoff: 'Built in duplicate-booking prevention and automatic retries on failure with alerts on breakage. A lead-scoring system is only useful if it fails loudly instead of silently losing a lead.',
  },
];

const FULLSTACK_WORK = [
  {
    id: 'titanic-ml',
    icon: 'chart',
    title: 'Titanic Survival Prediction: Python & Machine Learning',
    desc: 'End-to-end ML app predicting Titanic passenger survival: data preprocessing, feature engineering, and three trained classification models (Logistic Regression, Decision Tree, KNN), evaluated on Accuracy, Precision, Recall, F1, and ROC-AUC. Logistic Regression performed best and was deployed in an interactive Streamlit app for real-time predictions.',
    stack: ['Python', 'Scikit-learn', 'Streamlit', 'NumPy'],
    github: 'https://github.com/alibhatti59/Titanic-Survival-Prediction-AI-Python',
  },
  {
    id: 'flywise',
    icon: 'plane',
    title: 'FlyWise: Airline Management System',
    desc: 'A C# WinForms desktop app managing core airline operations: role-based access control for Admin and Passenger workflows, dynamic flight and passenger management, ticket booking with seat-availability validation, and SQL Server LocalDB integration. Built on a 3-tier architecture separating presentation, business logic, and data access.',
    stack: ['C#', 'WinForms', 'SQL Server', '.NET'],
    github: 'https://github.com/alibhatti59/Airline-Management-System-CSharp',
  },
];

const STACK_LAYERS = [
  { layer: 'AI & Automation', icon: 'gear', items: ['Automation Engineering', 'Workflow Automation', 'Process Automation', 'AI Agents', 'Model Context Protocol (MCP)', 'Anthropic Claude', 'n8n', 'GoHighLevel', 'Vapi', 'Selenium', 'Test Automation'] },
  { layer: 'Backend & APIs', icon: 'server', items: ['Python', 'FastAPI', 'REST APIs', 'PHP', 'C#', '.NET Framework', 'OOP'] },
  { layer: 'Data & ML', icon: 'chart2', items: ['Machine Learning', 'Artificial Intelligence (AI)', 'NumPy', 'Data Analysis', 'Databases', 'SQL', 'Azure Data Studio'] },
  { layer: 'Web Development', icon: 'globe', items: ['WordPress', 'WordPress Design', 'WooCommerce', 'Web Design', 'Web Development', 'Web Services', 'SEO', 'Web Scraping'] },
  { layer: 'Mobile & Systems', icon: 'device', items: ['Flutter', 'Dart', 'Mobile App Development', 'C++', 'Assembly Language'] },
];

const STACK_INTRO = "I work across the stack, from AI agents and automation to backend APIs, data, and full web and mobile builds. The full breakdown is below.";

const CERTIFICATIONS = [
  { name: 'Model Context Protocol (MCP): Hands-On with Agentic AI', issuer: 'LinkedIn Learning' },
  { name: 'Using Python for Automation', issuer: 'LinkedIn Learning' },
  { name: 'Build REST APIs with FastAPI', issuer: 'LinkedIn Learning' },
  { name: 'Database Foundations: Intro to Databases', issuer: 'LinkedIn Learning' },
  { name: 'ServiceNow Automated Test Framework (ATF) with ITSM', issuer: 'Udemy' },
  { name: 'WordPress', issuer: 'DigiSkills.pk' },
  { name: 'SEO (Search Engine Optimization)', issuer: 'DigiSkills.pk' },
];

const JOURNEY = [
  { label: 'Flutter' },
  { label: 'Web Dev' },
  { label: 'Python' },
  { label: 'REST APIs' },
  { label: 'AI Automation' },
  { label: 'Full Stack', state: 'progress' },
];

const WHY_ME = [
  {
    title: 'You talk to me, not an account manager',
    desc: "No middlemen, no handoffs. I scope the project, build it, and I'm the one you message when something needs a change.",
    proof: 'Every project on this site, I built and maintain personally, start to finish.',
  },
  {
    title: 'Honest scoping',
    desc: "If automation isn't actually the right fix for your problem, I'll tell you before you pay for it. Not every process needs a workflow built around it.",
    proof: "I'd rather lose a project than build you something you don't actually need.",
  },
  {
    title: 'Fast turnaround',
    desc: 'Most automations go from first conversation to a live, working system in days, not months. You see progress early, not at the end.',
    proof: 'You get a working version to react to early, not a big reveal at the end.',
  },
  {
    title: 'You own everything',
    desc: 'Every workflow, integration, and system I build is yours. No lock-in, no dependency on me to keep it running.',
    proof: 'Full access, full documentation. If you want to move on, everything moves with you.',
  },
];

const CONTACT_LINKS = [
  { label: 'Email', value: 'thealibhatti.dev@gmail.com', href: 'mailto:thealibhatti.dev@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ali-hassnain-bhatti-1a0506312', href: 'https://www.linkedin.com/in/ali-hassnain-bhatti-1a0506312/' },
  { label: 'GitHub', value: 'github.com/alibhatti59', href: 'https://github.com/alibhatti59' },
  { label: 'YouTube', value: '@SmartUse_Tech_byAli', href: 'https://www.youtube.com/@SmartUse_Tech_byAli' },
  { label: 'Facebook', value: 'facebook.com/alibhatti59dev', href: 'https://www.facebook.com/alibhatti59dev/' },
  { label: 'WhatsApp', value: '+92 317 7336159', href: 'https://wa.me/923177336159' },
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#top" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <img src={profilePic} alt="Ali Hassnain Bhatti" className="nav-avatar" />
        <span className="nav-brand-text">Ali Bhatti</span>
      </a>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a
          href="https://www.linkedin.com/in/ali-hassnain-bhatti-1a0506312/"
          target="_blank"
          rel="noreferrer"
          className="nav-linkedin"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.64h.05c.53-.99 1.82-2.03 3.75-2.03 4.01 0 4.75 2.64 4.75 6.07v6.32h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-4v-12z" />
          </svg>
          <span>LinkedIn</span>
        </a>
        <button className="theme-toggle" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} aria-label="Toggle theme">
          <span className={`toggle-track${theme === 'light' ? ' is-light' : ''}`}>
            <span className="toggle-thumb">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <line x1="12" y1="1.5" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22.5" />
                    <line x1="1.5" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22.5" y2="12" />
                    <line x1="4.2" y1="4.2" x2="6" y2="6" /><line x1="18" y1="18" x2="19.8" y2="19.8" />
                    <line x1="4.2" y1="19.8" x2="6" y2="18" /><line x1="18" y1="6" x2="19.8" y2="4.2" />
                  </g>
                </svg>
              )}
            </span>
          </span>
        </button>
        <button className={`menu-btn${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <>
      <IntroLoader />
      <FloatingElements />
      <ParticleField />
      <Spotlight />
      <ScrollRail />
      <BackToTop />
      <CustomCursor />
      <NavBar />

      <section id="top" className="hero">
        <div className="hero-canvas">
          <Suspense fallback={<Preloader />}>
            <ErrorBoundary>
              <PipelineScene />
            </ErrorBoundary>
          </Suspense>
        </div>
        <div className="hero-content hero-split">
          <div className="hero-photo-wrap">
            <img src={profilePic} alt="Ali Hassnain Bhatti" className="hero-photo" />
            <div className="hero-photo-glow" />
          </div>
          <div>
            <p className="eyebrow">AI Automation for Growing Businesses</p>
            <h1>Ali Hassnain Bhatti</h1>
            <p className="hero-hook">
              I help businesses stop losing leads to slow follow-up and missed calls.
            </p>
            <p className="hero-sub">
              I build AI voice agents and automations, GoHighLevel, Vapi, Make, n8n,
              that answer every call and follow up with every lead, day or night.
              Explore the work below or tell me what's eating your time.
            </p>
            <div className="hero-links">
              <Magnetic><a href="#work" className="btn-primary" data-cursor="OPEN">See the work</a></Magnetic>
              <Magnetic><a href="#contact" className="btn-ghost" data-cursor="OPEN" onClick={(e) => fireBurst(e.clientX, e.clientY)}>Start a project</a></Magnetic>
            </div>
            <div className="hero-core-caption">
              <span className="tag">Python</span>
              <span className="tag">API</span>
              <span className="tag">LLM</span>
              <span className="tag">CRM</span>
              <span className="tag">n8n</span>
              <span className="tag">Make</span>
              <span className="tag">Zapier</span>
              <span className="tag">GoHighLevel</span>
              <span className="tag">WordPress</span>
            </div>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      <section id="work" className="section">
        <SectionIndex number="01" />
        <Reveal><p className="section-eyebrow">Automation, the lead</p></Reveal>
        <Reveal delay={80}><h2>Systems that run the pipeline</h2></Reveal>
        <div className="work-grid">
          {AUTOMATION_WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 100}>
              <ProjectCard w={w} isOpen={expanded === w.id} onToggle={() => toggle(w.id)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIndex number="02" />
        <Reveal><p className="section-eyebrow">Full-stack range</p></Reveal>
        <Reveal delay={80}><h2>Beyond the pipeline</h2></Reveal>
        <div className="work-grid">
          {FULLSTACK_WORK.map((w, i) => (
            <Reveal key={w.id} delay={i * 100}>
              <ProjectCard w={w} isOpen={expanded === w.id} onToggle={() => toggle(w.id)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIndex number="03" />
        <Reveal><p className="section-eyebrow">Stack</p></Reveal>
        <Reveal delay={80}><h2>What runs underneath</h2></Reveal>
        <Reveal delay={100}>
          <p className="hero-sub stack-intro">{STACK_INTRO}</p>
        </Reveal>
        <Reveal delay={140}>
          <OrbitVisual />
        </Reveal>
        <div className="layers">
          {STACK_LAYERS.map((l, i) => (
            <Reveal key={l.layer} delay={i * 80}>
              <div className="layer-row">
                <span className="layer-name">
                  <span className={`layer-icon icon-${l.icon}`} />
                  {l.layer}
                </span>
                <div className="layer-items">
                  {l.items.map((it) => <span className="tag" key={it}>{it}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIndex number="04" />
        <Reveal><p className="section-eyebrow">Journey</p></Reveal>
        <Reveal delay={80}><h2>How I got to automation</h2></Reveal>
        <div className="journey-path">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.label} delay={i * 90} className="journey-step">
              <span className={`journey-node${step.state === 'progress' ? ' journey-node-progress' : ''}`} />
              <span className="journey-label">{step.label}</span>
              {i < JOURNEY.length - 1 && <span className="journey-connector" />}
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="section about">
        <SectionIndex number="05" />
        <Reveal><p className="section-eyebrow">About</p></Reveal>
        <Reveal delay={80}><h2>Practical digital solutions, built end to end</h2></Reveal>
        <div className="about-layout">
          <Reveal className="about-photo-reveal">
            <img src={profilePic} alt="Ali Hassnain Bhatti" className="about-photo" />
          </Reveal>
          <Reveal delay={100} className="about-body">
            <p>
              I’m Ali Hassnain Bhatti, a Python Developer and AI Automation Specialist
              focused on building practical digital solutions that automate processes,
              connect systems, and improve business efficiency.
            </p>
            <p>
              I work with tools and technologies including Python, FastAPI, REST APIs, n8n,
              Make, Zapier, webhooks, Vapi, CRM integrations, and AI agents to design reliable
              automation workflows and backend systems. I also build responsive websites and
              business solutions using WordPress, WooCommerce, HTML, CSS, and JavaScript.
            </p>
            <p>
              My stack includes Python, Flutter (Dart), C++, C#, SQL, HTML, CSS,
              JavaScript, and Assembly Language. I'm completing my BSCS now, and
              long-term I'm working toward full-stack development, pairing
              automation and backend work with stronger front-end range.
            </p>
            <p>
              I'm open to internships, collaborations, and freelance work where I can
              learn, contribute, and build something that matters.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="cert-block">
          <p className="section-eyebrow" style={{ marginTop: '3rem' }}>Certifications</p>
          <ul className="cert-list">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section">
        <SectionIndex number="06" />
        <Reveal><p className="section-eyebrow">Why work with me</p></Reveal>
        <Reveal delay={80}><h2>What you get when you hire me</h2></Reveal>
        <Reveal delay={110}>
          <p className="hero-hook why-hook">
            Your competitors respond to leads in minutes. If you're still doing it
            manually, you're already behind.
          </p>
        </Reveal>
        <div className="work-grid">
          {WHY_ME.map((w, i) => (
            <Reveal key={w.title} delay={i * 90 + 140}>
              <FlipCard front={w.title} desc={w.desc} back={w.proof} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-page">
        <SectionIndex number="07" />
        <Reveal><p className="section-eyebrow">Get in touch</p></Reveal>
        <Reveal delay={80}><h2>Let's build something that runs itself</h2></Reveal>
        <Reveal delay={120}>
          <p className="hero-sub" style={{ marginBottom: '1rem' }}>
            Open to internships, freelance work, and collaborations. Not sure what to
            ask for? Start with: what's the one task you wish ran itself?
          </p>
          <p className="hero-sub" style={{ marginBottom: '3rem', opacity: 0.8 }}>
            Typically replies within 24 hours.
          </p>
        </Reveal>
        <div className="contact-grid">
          {CONTACT_LINKS.map((l, i) => (
            <Reveal key={l.label} delay={i * 60}>
              <ContactIcon label={l.label} value={l.value} href={l.href} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
