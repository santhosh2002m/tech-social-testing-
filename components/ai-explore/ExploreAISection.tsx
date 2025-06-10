import React from "react";

interface ExploreAISectionProps {
  onAdAIClick: () => void;
  onWorkAIClick: () => void;
}

export default function ExploreAISection({
  onAdAIClick,
  onWorkAIClick,
}: ExploreAISectionProps) {
  return (
    <div className="explore-ai-container">
      <div className="text-center bg-orange">
        <h1 className="h3">Explore AI</h1>
      </div>

      <div className="ai-section">
        <img
          src="/images/ad-ad.jpg"
          alt="Ad.AI Banner"
          className="banner ad-ai border-area"
          onClick={onAdAIClick}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/1206x608?text=Ad.AI+Banner";
          }}
        />
        <p className="mt-3">
          Ad.AI is a multimodal AI model; now search with Text, Image, Video &
          PDF/Doc.
        </p>
      </div>

      <div className="ai-section">
        <img
          src="/images/work-work.jpg"
          alt="Work.AI Banner"
          className="banner work-ai border-area"
          onClick={onWorkAIClick}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/1126x610?text=Work.AI+Banner";
          }}
        />
        <p className="mt-3 Ts_explore_ai_p">
          Work.AI is a collection of professional AI models for routine
          workflow, research, complex tasks, etc.
        </p>
      </div>
    </div>
  );
}
