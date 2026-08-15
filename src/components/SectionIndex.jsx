export default function SectionIndex({ number }) {
  return (
    <div className="section-index" aria-hidden="true">
      <span className="section-index-num">{number}</span>
      <span className="section-index-line" />
    </div>
  );
}
