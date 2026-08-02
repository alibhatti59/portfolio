const LINKS = [
  {
    label: 'Email',
    value: 'thealibhatti.dev@gmail.com',
    href: 'mailto:thealibhatti.dev@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ali-hassnain-bhatti-1a0506312',
    href: 'https://www.linkedin.com/in/ali-hassnain-bhatti-1a0506312/',
  },
  {
    label: 'GitHub',
    value: 'github.com/alibhatti59',
    href: 'https://github.com/alibhatti59',
  },
  {
    label: 'YouTube',
    value: '@SmartUse_Tech_byAli',
    href: 'https://www.youtube.com/@SmartUse_Tech_byAli',
  },
  {
    label: 'Facebook',
    value: 'facebook.com/alibhatti59dev',
    href: 'https://www.facebook.com/alibhatti59dev/',
  },
  {
    label: 'WhatsApp',
    value: null, // TODO: add WhatsApp Business number
    href: null,
  },
];

export default function Contact() {
  return (
    <section className="section page-section contact-page">
      <p className="section-eyebrow">Get in touch</p>
      <h2>Let's build something that runs itself</h2>
      <p className="hero-sub" style={{ marginBottom: '3rem' }}>
        Open to internships, freelance work, and collaborations — reach out
        through whichever channel is easiest.
      </p>
      <div className="contact-list">
        {LINKS.map((l) => (
          <div className="contact-row" key={l.label}>
            <span className="layer-name">{l.label}</span>
            {l.value ? (
              <a href={l.href} target="_blank" rel="noreferrer" className="contact-value">
                {l.value}
              </a>
            ) : (
              <span className="contact-value empty">add your WhatsApp Business number here</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
