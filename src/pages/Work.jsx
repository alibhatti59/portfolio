import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const AUTOMATION_WORK = [
  {
    id: 'voice-agent-booking',
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
    title: 'Titanic Survival Prediction — Python & Machine Learning',
    desc: 'End-to-end ML app predicting Titanic passenger survival: data preprocessing, feature engineering, and three trained classification models (Logistic Regression, Decision Tree, KNN), evaluated on Accuracy, Precision, Recall, F1, and ROC-AUC. Logistic Regression performed best and was deployed in an interactive Streamlit app for real-time predictions.',
    stack: ['Python', 'Scikit-learn', 'Streamlit', 'NumPy'],
    github: 'https://github.com/alibhatti59/Titanic-Survival-Prediction-AI-Python',
  },
  {
    id: 'flywise',
    title: 'FlyWise — Airline Management System',
    desc: 'A C# WinForms desktop app managing core airline operations: role-based access control for Admin and Passenger workflows, dynamic flight and passenger management, ticket booking with seat-availability validation, and SQL Server LocalDB integration — built on a 3-tier architecture separating presentation, business logic, and data access.',
    stack: ['C#', 'WinForms', 'SQL Server', '.NET'],
    github: 'https://github.com/alibhatti59/Airline-Management-System-CSharp',
  },
];

const STACK_LAYERS = [
  { layer: 'Automation', items: ['GoHighLevel', 'Vapi', 'Make.com', 'n8n', 'Google Gemini'] },
  { layer: 'Application', items: ['Flutter', 'Dart', 'WordPress', 'React'] },
  { layer: 'Languages', items: ['Python', 'C++', 'C#', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { layer: 'Data & APIs', items: ['REST APIs', 'FastAPI', 'Selenium', 'Web Scraping'] },
];

export default function Work() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <>
      <section className="section page-section">
        <p className="section-eyebrow">Automation — the lead</p>
        <h2>Systems that run the pipeline</h2>
        <div className="work-grid">
          {AUTOMATION_WORK.map((w) => (
            <ProjectCard key={w.id} w={w} isOpen={expanded === w.id} onToggle={() => toggle(w.id)} />
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-eyebrow">Full-stack range</p>
        <h2>Beyond the pipeline</h2>
        <div className="work-grid">
          {FULLSTACK_WORK.map((w) => (
            <ProjectCard key={w.id} w={w} isOpen={expanded === w.id} onToggle={() => toggle(w.id)} />
          ))}
        </div>
      </section>

      <section className="section">
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
    </>
  );
}
