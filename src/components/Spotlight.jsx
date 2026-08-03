import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const onMove = (e) => {
      el.style.setProperty('--sx', `${e.clientX}px`);
      el.style.setProperty('--sy', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return <div ref={ref} className="spotlight" />;
}
