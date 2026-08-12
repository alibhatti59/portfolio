import { useEffect, useState } from 'react';

export default function IntroLoader() {
  const alreadyShown = typeof window !== 'undefined' && sessionStorage.getItem('introShown');
  const [phase, setPhase] = useState(alreadyShown ? 'gone' : 'in');

  useEffect(() => {
    if (alreadyShown) return;
    sessionStorage.setItem('introShown', '1');
    const t1 = setTimeout(() => setPhase('out'), 1400);
    const t2 = setTimeout(() => setPhase('gone'), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [alreadyShown]);

  if (phase === 'gone') return null;

  return (
    <div className={`intro-loader${phase === 'out' ? ' intro-out' : ''}`}>
      <svg viewBox="0 0 120 120" width="88" height="88" className="intro-mark">
        <circle cx="30" cy="86" r="7" className="intro-dot intro-dot-1" />
        <circle cx="60" cy="34" r="7" className="intro-dot intro-dot-2" />
        <circle cx="90" cy="86" r="7" className="intro-dot intro-dot-3" />
        <path d="M35 80 L55 42" className="intro-line intro-line-1" />
        <path d="M65 42 L85 80" className="intro-line intro-line-2" />
      </svg>
      <p className="intro-text">Ali Bhatti</p>
    </div>
  );
}
