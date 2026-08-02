import profilePic from '../assets/profile.jpeg';

const CERTIFICATIONS = [
  { name: 'Model Context Protocol (MCP): Hands-On with Agentic AI', issuer: 'LinkedIn Learning' },
  { name: 'Using Python for Automation', issuer: 'LinkedIn Learning' },
  { name: 'Build REST APIs with FastAPI', issuer: 'LinkedIn Learning' },
  { name: 'Database Foundations: Intro to Databases', issuer: 'LinkedIn Learning' },
  { name: 'ServiceNow Automated Test Framework (ATF) with ITSM', issuer: 'Udemy' },
  { name: 'WordPress', issuer: 'DigiSkills.pk' },
  { name: 'SEO (Search Engine Optimization)', issuer: 'DigiSkills.pk' },
];

export default function About() {
  return (
    <section className="section page-section">
      <p className="section-eyebrow">About</p>
      <h2>Practical digital solutions, built end to end</h2>
      <div className="about-layout">
        <img src={profilePic} alt="Ali Bhatti" className="about-photo" />
        <div className="about-body">
        <p>
          I build practical digital solutions that combine creativity, logic, and
          functionality — with a background spanning Flutter and web development
          that shapes how I approach every project: modern, user-focused, and built
          to actually work in production, not just in a demo.
        </p>
        <p>
          My core stack is Python, Flutter (Dart), C++, C#, SQL, HTML, CSS,
          JavaScript, and Assembly. Alongside that, I'm actively building depth in
          AI automation — REST APIs and platforms like Make.com, n8n, GoHighLevel,
          and Vapi — creating intelligent workflows that solve real business
          problems instead of just moving data around.
        </p>
        <p>
          University coursework and real-world projects have sharpened my
          problem-solving and technical confidence, and I care about shipping
          reliable, high-quality work over anything flashy that doesn't hold up.
          I'm open to internships, collaborations, and freelance opportunities
          where I can keep learning while building something that matters.
        </p>
        </div>
      </div>

      <div className="cert-block">
        <p className="section-eyebrow" style={{ marginTop: '3rem' }}>Certifications</p>
        <ul className="cert-list">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              <span className="cert-name">{c.name}</span>
              <span className="cert-issuer">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
