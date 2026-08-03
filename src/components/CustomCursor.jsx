import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

    const dot = dotRef.current;
    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e) => {
      if (e.target.closest('a, button, .work-card, .tag')) {
        dot.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .work-card, .tag')) {
        dot.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor" />;
}
