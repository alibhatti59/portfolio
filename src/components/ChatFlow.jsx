export default function ChatFlow() {
  return (
    <div className="chat-flow" aria-hidden="true">
      <div className="chat-bubble chat-stage-1">
        <span className="chat-bubble-label">New lead</span>
        "Hi, interested in pricing for..."
      </div>
      <div className="chat-badge chat-stage-2">Scoring with Gemini...</div>
      <div className="chat-badge chat-badge-hot chat-stage-3">HOT LEAD</div>
      <div className="chat-bubble chat-bubble-out chat-stage-4">
        <span className="chat-bubble-label">Auto-booked</span>
        Calendar slot confirmed
      </div>
    </div>
  );
}
