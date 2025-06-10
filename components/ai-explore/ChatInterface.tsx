import React from "react";

interface ChatInterfaceProps {
  title: string;
  message: string;
  setMessage: (message: string) => void;
  onBack: () => void;
  onSend: () => void;
}

export default function ChatInterface({
  title,
  message,
  setMessage,
  onBack,
  onSend,
}: ChatInterfaceProps) {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <button onClick={onBack} className="back-button">
          ←
        </button>
        <h1 className="chat-title">{title}</h1>
      </div>

      <div className="chat-content">
        <p className="chat-placeholder">Start a conversation...</p>
      </div>

      <div className="chat-input-container">
        <button className="chat-icon-button">
          <span role="img" aria-label="camera">
            📷
          </span>
        </button>
        <button className="chat-icon-button">
          <span role="img" aria-label="attachment">
            📎
          </span>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please enter message"
          className="chat-input-field"
        />
        <button onClick={onSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
}
