export function fireBurst(x, y) {
  const colors = ['#32e8d1', '#f0a05a', '#9d7cf0'];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'burst-particle';
    p.style.background = colors[i % colors.length];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    const angle = (i / count) * Math.PI * 2;
    const dist = 60 + Math.random() * 40;
    p.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--by', `${Math.sin(angle) * dist}px`);

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}
