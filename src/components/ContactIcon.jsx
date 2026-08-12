import { useRef } from 'react';

const GLYPHS = {
  Email: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 8.98h4v12H3v-12zM9.5 8.98h3.8v1.64h.05c.53-.99 1.82-2.03 3.75-2.03 4.01 0 4.75 2.64 4.75 6.07v6.32h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-4v-12z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.19-3.37-1.19-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 015.01 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0022 12.19C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M21.6 7.2s-.21-1.49-.86-2.14c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.59 0-6.58.15c-.42.05-1.34.05-2.16.91-.65.65-.86 2.14-.86 2.14S2.18 8.94 2.18 10.68v1.63c0 1.74.21 3.48.21 3.48s.21 1.49.86 2.14c.82.86 1.9.83 2.38.92 1.73.17 7.36.22 7.36.22s3.6-.01 6.59-.16c.42-.05 1.34-.05 2.16-.91.65-.65.86-2.14.86-2.14s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48zM9.98 14.5v-5.4l5.19 2.71-5.19 2.69z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M13.5 22v-8.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.32 15.36 4.24 14.32 4.24c-2.16 0-3.64 1.32-3.64 3.74V10.5H8.24v3H10.68V22h2.82z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.15-.66-1.58-.9-2.16-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.19 3.01.15.19 2.06 3.14 4.98 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
      <path d="M12.02 2C6.5 2 2.04 6.46 2.04 12c0 1.87.5 3.62 1.4 5.13L2 22l4.99-1.4a9.96 9.96 0 005.03 1.35c5.52 0 10-4.46 10-9.99C22.02 6.46 17.55 2 12.02 2zm0 18.19c-1.63 0-3.15-.47-4.44-1.28l-.32-.19-3.06.86.86-3.04-.2-.32a8.14 8.14 0 01-1.28-4.42c0-4.52 3.68-8.19 8.44-8.19 4.5 0 8.16 3.67 8.16 8.19 0 4.53-3.66 8.19-8.16 8.19z" />
    </svg>
  ),
};

const BRAND_COLORS = {
  Email: '#2fd9c4',
  LinkedIn: '#0a66c2',
  GitHub: '#e6e8eb',
  YouTube: '#ff3b3b',
  Facebook: '#1877f2',
  WhatsApp: '#25d366',
};

export default function ContactIcon({ label, value, href }) {
  const ref = useRef(null);
  const brand = BRAND_COLORS[label];

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--ry', `${x * 14}deg`);
    el.style.setProperty('--rx', `${-y * 14}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  const content = (
    <>
      <span className="contact-icon-glow" style={{ background: `radial-gradient(circle, ${brand}33, transparent 70%)` }} />
      <span className="contact-icon-glyph" style={{ color: brand }}>{GLYPHS[label]}</span>
      <span className="contact-icon-label">{label}</span>
      {value ? <span className="contact-icon-value">{value}</span> : <span className="contact-icon-value empty">add your number</span>}
    </>
  );

  if (!href) {
    return (
      <div ref={ref} className="contact-tilt contact-tilt-empty" style={{ '--brand': brand }}>
        {content}
      </div>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="contact-tilt"
      style={{ '--brand': brand }}
      data-cursor="OPEN"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {content}
    </a>
  );
}
