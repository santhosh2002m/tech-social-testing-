"use client";
import React, { useState } from "react";
import HomeLeft from "@/components/menu/HomeLeft";
import RightSide from "@/components/home/RightSide";
import ExploreAISection from "../../components/ai-explore/ExploreAISection";
import WorkAIOptions from "../../components/ai-explore/WorkAIOptions";
import ChatInterface from "../../components/ai-explore/ChatInterface";

export default function ExploreAIPage() {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showWorkAIOptions, setShowWorkAIOptions] = useState<boolean>(false);
  const [selectedWorkAIModel, setSelectedWorkAIModel] = useState<string | null>(
    null
  );

  const workAIModels: string[] = [
    "GPT-5",
    "Cloude 3",
    "Gemini 1.5",
    "Mistral 7B",
    "LLama 3",
    "xAI Grok",
  ];

  const handleAdAIClick = () => {
    setShowChat(true);
    setShowWorkAIOptions(false);
    setSelectedWorkAIModel(null);
  };

  const handleWorkAIClick = () => {
    setShowWorkAIOptions(true); // Fixed typo: setShowWorkAIOoptions -> setShowWorkAIOptions
    setShowChat(false);
    setSelectedWorkAIModel(null);
  };

  const handleWorkAIModelSelect = (model: string) => {
    setSelectedWorkAIModel(model);
    setShowWorkAIOptions(false);
    setShowChat(true);
  };

  const handleBackClick = () => {
    if (selectedWorkAIModel) {
      setSelectedWorkAIModel(null);
      setShowChat(false);
      setShowWorkAIOptions(true);
    } else if (showWorkAIOptions) {
      setShowWorkAIOptions(false);
    } else {
      setShowChat(false);
    }
  };

  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <main className="main-content">
      <div className="container sidebar-toggler">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
            <HomeLeft clss="d-lg-none" />
          </div>

          {/* Main Content */}
          <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            {showChat ? (
              <ChatInterface
                title={selectedWorkAIModel ? selectedWorkAIModel : "Ad.AI"}
                message={message}
                setMessage={setMessage}
                onBack={handleBackClick}
                onSend={handleSend}
              />
            ) : showWorkAIOptions ? (
              <WorkAIOptions
                models={workAIModels}
                onModelSelect={handleWorkAIModelSelect}
                onBack={handleBackClick}
              />
            ) : (
              <ExploreAISection
                onAdAIClick={handleAdAIClick}
                onWorkAIClick={handleWorkAIClick}
              />
            )}
          </div>

          {/* Right Sidebar (Followers) */}
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0 followers-wrapper">
            <RightSide />
          </div>
        </div>
      </div>
    </main>
  );
}
