const BAR_COUNT = 28;

export default function Waveform() {
  return (
    <div className="waveform" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{ animationDelay: `${(i % 7) * 0.09}s` }}
        />
      ))}
    </div>
  );
}
