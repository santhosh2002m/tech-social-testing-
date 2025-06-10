"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactAction from "../ui/ContactAction";
import avatar_14 from "/public/images/hell.jpg";

const bioData = [
  {
    id: 1,
    type: "Cloud Industry",
    icon: "factory",
    class: "",
  },
  {
    id: 2,
    type: "New Delhi",
    icon: "pin_drop",
    class: "",
  },
  {
    id: 3,
    type: "https://grok.com/",
    icon: "link",
    class: "link",
  },
  {
    id: 4,
    type: "",
    icon: "",
    class: "",
  },
  {
    id: 5,
    type: "",
    icon: "",
    class: "",
  },

  {
    id: 6,
    type: "",
    icon: "",
    class: "",
  },

  {
    id: 7,
    type: "",
    icon: "",
    class: "",
  },
];

const statsData = [
  { id: 1, icon: "description", label: "10k post" },
  { id: 2, icon: "visibility", label: "5.7k Views" },
  { id: 3, icon: "group", label: "4 followers" },
  { id: 4, icon: "person_add", label: "5.6k following" },
];

const ProfileEditBanner: React.FC = () => {
  const path: string = usePathname();
  const splitPath: string[] = path.split("/");
  const lastPath: string = splitPath[splitPath.length - 1];

  return (
    <div className="banner-area pages-create mb-5">
      <div className="single-box p-5">
        <div className="avatar-area">
          <div className="banner-text">TechSocial</div>
        </div>
        <div className="top-area">
          {/* Profile Picture */}
          <div className="avatar-item">
            <Image
              className="avatar-img max-un setting-size-120"
              src={avatar_14}
              alt="avatar"
            />
          </div>

          {/* Main Content */}
          <div className="text-area">
            {/* Buttons Section at Top-Right */}
            <div className="btn-section">
              <Link href="#" className="cmn-btn d-center gap-2">
                <i className="material-symbols-outlined mat-icon">edit_note</i>
                Edit Profile
              </Link>
              <ContactAction
                sectionType="followings"
                actionList={[
                  ["Block", "lock"],
                  ["Report", "flag"],
                ]}
              />
            </div>

            {/* Content Sections with Four Grid Layout */}
            <div className="content-sections">
              {/* Section 1: Username, Handle, About Text */}
              <div className="user-info-section">
                <h4 className="m-0 xltxt">santhosh</h4>
                <p className="m-0 text-orange-500 lgtxt margin-bottom">
                  @santhosh_kumar
                </p>
                <p className="about-text mb-0 lgtxt">
                  Co-Founder & CEO DataCenter Hub | WhiteNoise Corporation Tech
                  Influencer
                </p>
              </div>

              {/* Section 3: Bio Data */}
              <div className="bio-data-section">
                {bioData.map((itm) => (
                  <div
                    key={itm.id}
                    className="d-flex align-items-center gap-2 mb-2"
                  >
                    <span className="mdtxt d-center">
                      <i className="material-symbols-outlined lgtxt">
                        {itm.icon}
                      </i>
                    </span>
                    <span className={`info-content lgtxt ${itm.class}`}>
                      {itm.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Section 2: Stats */}
              <div className="stats-section">
                {statsData.map((stat) => (
                  <div
                    key={stat.id}
                    className="d-flex align-items-center gap-2 mb-2"
                  >
                    <span className="mdtxt d-center">
                      <i className="material-symbols-outlined lgtxt">
                        {stat.icon}
                      </i>
                    </span>
                    <span className="profile-icon-content lgtxt">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Section 4: Empty Space */}
              <div className="empty-section"></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="page-details">
          <ul className="nav mt-5 pt-4 flex-wrap gap-2 tab-area">
            {["posts", "likes", "share", "comments", "mentions", "saved"].map(
              (tab) => (
                <li className="nav-item" role="presentation" key={tab}>
                  <Link
                    href={`/profile/${tab}`}
                    className={`nav-link d-center lgtxt ${
                      lastPath === tab && "active"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditBanner;
