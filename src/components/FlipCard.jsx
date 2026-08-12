import { useState } from 'react';

export default function FlipCard({ front, desc, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card" onClick={() => setFlipped((f) => !f)} data-cursor="FLIP">
      <div className={`flip-card-inner${flipped ? ' is-flipped' : ''}`}>
        <article className="work-card flip-face flip-front">
          <div className="card-body">
            <h3>{front}</h3>
            <p>{desc}</p>
          </div>
        </article>
        <article className="work-card flip-face flip-back">
          <div className="card-body">
            <span className="flip-back-label">In practice</span>
            <p className="flip-back-text">{back}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
