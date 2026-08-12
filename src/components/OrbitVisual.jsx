const RINGS = [
  { size: 220, duration: 22, items: ['Python', 'FastAPI', 'REST APIs'] },
  { size: 320, duration: 32, reverse: true, items: ['n8n', 'Vapi', 'GoHighLevel', 'Make'] },
  { size: 420, duration: 42, items: ['WordPress', 'Flutter', 'C#', 'SQL'] },
];

export default function OrbitVisual() {
  return (
    <div className="orbit-visual" aria-hidden="true">
      <div className="orbit-center" />
      {RINGS.map((ring) => (
        <div
          key={ring.size}
          className={`orbit-ring${ring.reverse ? ' orbit-reverse' : ''}`}
          style={{
            width: ring.size,
            height: ring.size,
            marginLeft: -ring.size / 2,
            marginTop: -ring.size / 2,
            animationDuration: `${ring.duration}s`,
          }}
        >
          {ring.items.map((item, i) => {
            const angle = (360 / ring.items.length) * i;
            return (
              <span
                key={item}
                className="orbit-chip"
                style={{ transform: `rotate(${angle}deg) translateX(${ring.size / 2}px) rotate(-${angle}deg)` }}
              >
                <span
                  className="orbit-chip-inner"
                  style={{ animationDuration: `${ring.duration}s`, animationDirection: ring.reverse ? 'normal' : 'reverse' }}
                >
                  {item}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
