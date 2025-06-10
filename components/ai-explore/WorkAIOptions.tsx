import React from "react";

interface WorkAIOptionsProps {
  models: string[];
  onModelSelect: (model: string) => void;
  onBack: () => void;
}

export default function WorkAIOptions({
  models,
  onModelSelect,
  onBack,
}: WorkAIOptionsProps) {
  return (
    <div className="work-ai-options">
      <div className="chat-header">
        <button onClick={onBack} className="back-button">
          ←
        </button>
        <h1 className="chat-title">Work.AI</h1>
      </div>
      <div className="work-ai-options-list">
        {models.map((model) => (
          <button
            key={model}
            className={`model-option ${
              model === "deepseek-rl" ? "deepseek" : ""
            }`}
            onClick={() => onModelSelect(model)}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  );
}
