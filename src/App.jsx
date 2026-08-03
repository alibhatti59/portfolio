import { Suspense, useState, useEffect, lazy } from 'react';
import Spotlight from './components/Spotlight';
import Reveal from './components/Reveal';
import ProjectCard from './components/ProjectCard';
import ContactIcon from './components/ContactIcon';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import profilePic from './assets/profile.jpeg';
import './App.css';

const PipelineScene = lazy(() => import('./PipelineScene'));

const AUTOMATION_WORK = [
  {
    id: 'voice-agent-booking',
    icon: 'phone',
    node: 'Vapi + n8n',
    title: 'AI Voice Agent: Appointment Booking System',
    desc: 'A fully automated AI voice agent that answers real phone calls, holds a natural conversation, and books real appointments directly to Google Calendar — no human involvement.',
    stack: ['Vapi', 'n8n', 'Python', 'FastAPI', 'Google Calendar API'],
    github: 'https://github.com/alibhatti59/voice-agent-booking-api',
    flow: ['Inbound Call', 'Vapi Voice AI', 'n8n Workflow', 'FastAPI Backend', 'Google Calendar'],
    tradeoff: 'Handled date validation and error cases in the backend instead of trusting the voice layer to confirm bookings — the system fails gracefully on missing or unclear details rather than falsely confirming an appointment that was never actually booked.',
  },
  {
    id: 'lead-qualification',
    icon: 'spark',
    node: 'n8n + Gemini',
    title: 'AI Lead Qualification & Auto-Booking Agent',
    desc: 'Instantly qualifies incoming leads and responds before they lose interest. Google Gemini reads each submission and scores it Hot, Warm, or Cold — hot leads get auto-booked against real calendar availability, warm and cold leads get a personalized follow-up email instead of silence.',
    stack: ['n8n', 'Google Gemini', 'GoHighLevel'],
    github: 'https://github.com/alibhatti59/ai-lead-qualification-agent',
    flow: ['Form Submission', 'Gemini Scoring', 'Hot / Warm / Cold', 'Auto-Book or Follow-up', 'GHL CRM'],
    tradeoff: 'Built in duplicate-booking prevention and automatic retries on failure with alerts on breakage — a lead-scoring system is only useful if it fails loudly instead of silently losing a lead.',
  },
];

const FULLSTACK_WORK = [
  {
    id: 'titanic-ml',
    icon: 'chart',
    title: 'Titanic Survival Prediction — Python & Machine Learning',
    desc: 'End-to-end ML app predicting Titanic passenger survival: data preprocessing, feature engineering, and three trained classification models (Logistic Regression, Decision Tree, KNN), evaluated on Accuracy, Precision, Recall, F1, and ROC-AUC. Logistic Regression performed best and was deployed in an interactive Streamlit app for real-time predictions.',
    stack: ['Python', 'Scikit-learn', 'Streamlit', 'NumPy'],
    github: 'https://github.com/alibhatti59/Titanic-Survival-Prediction-AI-Python',
  },
  {
    id: 'flywise',
    icon: 'plane',
    title: 'FlyWise — Airline Management System',
    desc: 'A C# WinForms desktop app managing core airline operations: role-based access control for Admin and Passenger workflows, dynamic flight and passenger management, ticket booking with seat-availability validation, and SQL Server LocalDB integration — built on a 3-tier architecture separating presentation, business logic, and data access.',
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

const STACK_INTRO = "I work across the stack — from automation and backend APIs to data-driven applications and web development. On the automation side, I build AI agents and intelligent workflows using n8n, GoHighLevel, and Vapi, backed by Python and REST APIs (including FastAPI) — I've also worked with Model Context Protocol (MCP) to connect AI systems like Claude to real tools and data. For backend and systems work, I use Python, C#, PHP, and the .NET Framework with object-oriented design to keep things maintainable. On the data side, Machine Learning, NumPy, and SQL/Azure Data Studio handle analysis and database-driven projects. On the web side, I build and customize WordPress and WooCommerce sites with a focus on clean design and SEO, plus Python-based web scraping — and I build mobile apps with Flutter and Dart, with a systems-level foundation in C++ and Assembly.";

const CERTIFICATIONS = [
  { name: 'Model Context Protocol (MCP): Hands-On with Agentic AI', issuer: 'LinkedIn Learning' },
  { name: 'Using Python for Automation', issuer: 'LinkedIn Learning' },
  { name: 'Build REST APIs with FastAPI', issuer: 'LinkedIn Learning' },
  { name: 'Database Foundations: Intro to Databases', issuer: 'LinkedIn Learning' },
  { name: 'ServiceNow Automated Test Framework (ATF) with ITSM', issuer: 'Udemy' },
  { name: 'WordPress', issuer: 'DigiSkills.pk' },
  { name: 'SEO (Search Engine Optimization)', issuer: 'DigiSkills.pk' },
];

const CONTACT_LINKS = [
  { label: 'Email', value: 'thealibhatti.dev@gmail.com', href: 'mailto:thealibhatti.dev@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ali-hassnain-bhatti-1a0506312', href: 'https://www.linkedin.com/in/ali-hassnain-bhatti-1a0506312/' },
  { label: 'GitHub', value: 'github.com/alibhatti59', href: 'https://github.com/alibhatti59' },
  { label: 'YouTube', value: '@SmartUse_Tech_byAli', href: 'https://www.youtube.com/@SmartUse_Tech_byAli' },
  { label: 'Facebook', value: 'facebook.com/alibhatti59dev', href: 'https://www.facebook.com/alibhatti59dev/' },
  { label: 'WhatsApp', value: '03177336159', href: 'https://wa.me/03177336159' },
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
        <img src={profilePic} alt="Ali Bhatti" className="nav-avatar" />
        <span className="nav-brand-text">Ali Bhatti</span>
      </a>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
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
      <Spotlight />
      <CustomCursor />
      <NavBar />

      <section id="top" className="hero">
        <div className="hero-canvas">
          <Suspense fallback={<Preloader />}>
            <PipelineScene />
          </Suspense>
        </div>
        <div className="hero-content hero-split">
          <div className="hero-photo-wrap">
            <img src={profilePic} alt="Ali Bhatti" className="hero-photo" />
            <div className="hero-photo-glow" />
          </div>
          <div>
            <p className="eyebrow">Python Developer · AI Automation</p>
            <h1>Ali Bhatti</h1>
            <p className="hero-sub">
              Specializing in AI automation — n8n, Make, Vapi, GoHighLevel — plus
              REST APIs and WordPress. Explore the projects below or reach out to
              start one of your own.
            </p>
            <div className="hero-links">
              <a href="#work" className="btn-primary">See the work</a>
              <a href="#contact" className="btn-ghost">Start a project</a>
              <a href="/resume.pdf" download className="btn-ghost">Download Résumé</a>
            </div>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      <section id="work" className="section">
        <Reveal><p className="section-eyebrow">Automation — the lead</p></Reveal>
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
        <Reveal><p className="section-eyebrow">Stack</p></Reveal>
        <Reveal delay={80}><h2>What runs underneath</h2></Reveal>
        <Reveal delay={100}>
          <p className="hero-sub stack-intro">{STACK_INTRO}</p>
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

      <section id="about" className="section about">
        <Reveal><p className="section-eyebrow">About</p></Reveal>
        <Reveal delay={80}><h2>Practical digital solutions, built end to end</h2></Reveal>
        <div className="about-layout">
          <Reveal className="about-photo-reveal">
            <img src={profilePic} alt="Ali Bhatti" className="about-photo" />
          </Reveal>
          <Reveal delay={100} className="about-body">
            <p>
              I build practical digital solutions that combine creativity, logic, and
              functionality. My background spans Flutter and web development, where
              I've shipped modern, user-focused apps and websites — and more recently,
              I've been going deep on AI automation.
            </p>
            <p>
              Right now, most of my work centers on connecting Python, REST APIs, and
              platforms like Make.com, n8n, GoHighLevel, and Vapi into intelligent
              workflows — systems that qualify leads, book appointments, and take
              repetitive work off people's plates. I like the problem that automation
              solves: turning a process that used to need a person watching it into
              one that just runs.
            </p>
            <p>
              On the technical side, I work across Python, Flutter (Dart), C++, C#,
              SQL, HTML, CSS, JavaScript, and even Assembly Language — a mix that's
              given me a solid foundation for whatever a project needs, from a CRM
              integration to a full website build.
            </p>
            <p>
              I'm currently completing my BSCS, and alongside my coursework and
              real-world projects, I've built up problem-solving skills, technical
              confidence, and an eye for delivering things that actually work
              reliably, not just in a demo. Long-term, I'm working toward full-stack
              development — pairing the automation and backend work I do now with
              stronger front-end range.
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

      <section id="contact" className="section contact-page">
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
