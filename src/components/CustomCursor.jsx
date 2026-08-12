import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const onMove = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setLabel(el.dataset.cursor);
        dot.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setLabel('');
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

  return (
    <div ref={dotRef} className="custom-cursor">
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}
