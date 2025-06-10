"use client";
import React, { useState } from "react";

const Subscription: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">(
    "annual"
  );
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedWorkAIFeatures, setSelectedWorkAIFeatures] = useState<
    string[]
  >([]);

  const plans = [
    {
      name: `Ad.AI`,
      monthlyPrice: 50.0,
      annualPrice: 504.0, // Adjusted for 16% savings: 600 - (600 * 0.16) = 504
      annualSavings: 16, // 16% savings
      features: [
        "Reply boost",
        "Radar",
        "Edit Post",
        "Longer Post",
        "Download Video",
        "Background Video Playback",
      ],
    },
    {
      name: `Work.AI`,
      monthlyPrice: 65.0,
      annualPrice: 655.2, // Adjusted for 16% savings: 780 - (780 * 0.16) = 655.20
      annualSavings: 16, // 16% savings
      features: [
        "GPT-5",
        "Cloude 3",
        "Gemini 1.5",
        "Mistral 7B",
        "LLaMA 3",
        "xAI Grok",
      ],
    },
  ];

  const togglePlanSelection = (planName: string) => {
    if (selectedPlan === planName) {
      setSelectedPlan(null);
      if (planName === "Work.AI") {
        setSelectedWorkAIFeatures([]);
      }
    } else {
      setSelectedPlan(planName);
      if (selectedPlan === "Work.AI") {
        setSelectedWorkAIFeatures([]);
      }
    }
  };

  const toggleWorkAIFeature = (
    feature: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    if (selectedWorkAIFeatures.includes(feature)) {
      setSelectedWorkAIFeatures(
        selectedWorkAIFeatures.filter((f) => f !== feature)
      );
    } else {
      setSelectedWorkAIFeatures([...selectedWorkAIFeatures, feature]);
    }
  };

  const handleFeaturesClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (selectedPlan === "Work.AI") {
      event.stopPropagation();
    }
  };

  return (
    <div className="subscription">
      <h1 className="subscription-header">Subscription</h1>

      <div className="billing-toggle">
        <button
          className={billingCycle === "annual" ? "active" : ""}
          onClick={() => setBillingCycle("annual")}
        >
          Annual
        </button>
        <button
          className={billingCycle === "monthly" ? "active" : ""}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
      </div>

      <div className="plans-container">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${
              selectedPlan === plan.name ? "selected" : ""
            }`}
            onClick={() => togglePlanSelection(plan.name)}
          >
            <h3>{plan.name}</h3>
            {/* Add savings badge, visible only in annual billing cycle */}
            {billingCycle === "annual" && plan.annualSavings > 0 && (
              <span className="savings-badge">SAVE {plan.annualSavings}%</span>
            )}

            <ul
              className="features"
              onClick={
                plan.name === "Work.AI" ? handleFeaturesClick : undefined
              }
            >
              {plan.name === "Work.AI"
                ? plan.features.map((feature, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedWorkAIFeatures.includes(feature)}
                          onChange={(event) =>
                            toggleWorkAIFeature(feature, event)
                          }
                        />
                        <span className="reset">{feature}</span>
                      </label>
                    </li>
                  ))
                : plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span> {feature}
                    </li>
                  ))}
            </ul>
            <button
              className={`plan-button ${
                selectedPlan === plan.name ? "visible" : "hidden"
              }`}
            >
              {billingCycle === "monthly" ? "Monthly" : "Annual"} Pricing at $
              {billingCycle === "monthly"
                ? plan.monthlyPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : plan.annualPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
