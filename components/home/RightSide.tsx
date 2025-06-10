"use client";

import { useState } from "react";
import Contact from "../common/Contact";

const RightSide = () => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("followings");

  const toggleAccordion = (section: string) => {
    console.log(
      "Toggling accordion:",
      section,
      "Current state:",
      activeAccordion
    );
    setActiveAccordion(activeAccordion === section ? "" : section);
  };

  return (
    <div
      className={`cus-overflow cus-scrollbar sidebar-head ${
        activeProfile ? "active" : ""
      }`}
    >
      <div className="d-flex justify-content-end">
        <div className="d-block d-xl-none me-4">
          <button
            className="button toggler-btn mb-4 mb-lg-0 d-flex align-items-center gap-2"
            onClick={() => {
              console.log("Toggling sidebar:", !activeProfile);
              setActiveProfile(!activeProfile);
            }}
          >
            <span>My List</span>
            <i className="material-symbols-outlined mat-icon">tune</i>
          </button>
        </div>
      </div>
      <div className="cus-scrollbar side-wrapper">
        <div className="sidebar-wrapper d-flex flex-column gap-6">
          <div className="sidebar-area p-5">
            <div className="accordion" id="sidebarAccordion">
              {/* Followers Section */}
              <div className="accordion-item accordion-item-custom">
                <h2 className="accordion-header" id="followersHeading">
                  <button
                    className={`accordion-button accordion-button-custom ${
                      activeAccordion !== "followers" ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() => toggleAccordion("followers")}
                    aria-expanded={activeAccordion === "followers"}
                    aria-controls="followersCollapse"
                  >
                    <h6 className="m-0">Followers</h6>
                  </button>
                </h2>
                <div
                  id="followersCollapse"
                  className={`accordion-collapse collapse ${
                    activeAccordion === "followers" ? "show" : ""
                  }`}
                  aria-labelledby="followersHeading"
                >
                  <div className="accordion-body">
                    <Contact sectionType="followers">
                      <div className="mb-4"></div>
                    </Contact>
                  </div>
                </div>
              </div>

              {/* Followings Section */}
              <div className="accordion-item accordion-item-custom mt-4">
                <h2 className="accordion-header" id="followingsHeading">
                  <button
                    className={`accordion-button accordion-button-custom ${
                      activeAccordion !== "followings" ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() => toggleAccordion("followings")}
                    aria-expanded={activeAccordion === "followings"}
                    aria-controls="followingsCollapse"
                  >
                    <h6 className="m-0">Followings</h6>
                  </button>
                </h2>
                <div
                  id="followingsCollapse"
                  className={`accordion-collapse collapse ${
                    activeAccordion === "followings" ? "show" : ""
                  }`}
                  aria-labelledby="followingsHeading"
                >
                  <div className="accordion-body">
                    <Contact sectionType="followings">
                      <div className="mb-4"></div>
                    </Contact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
