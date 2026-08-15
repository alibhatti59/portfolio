import { useEffect, useRef } from 'react';

export default function ScrollRail() {
  const fillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-track">
        <div ref={fillRef} className="scroll-rail-fill" />
      </div>
    </div>
  );
}
