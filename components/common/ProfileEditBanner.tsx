"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ContactAction from "../ui/ContactAction";
import avatar_14 from "/public/images/hell.jpg";
import { fetchUser, clearError } from "../../store/userSlice";
import { RootState, AppDispatch } from "../../store";
import secureLocalStorage from "react-secure-storage";

interface BioDataItem {
  id: number;
  type: string;
  label: string;
  icon: string;
  class: string;
}

interface StatsDataItem {
  id: number;
  icon: string;
  label: string;
}

const ProfileEditBanner: React.FC = () => {
  const path = usePathname();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const lastPath = path.split("/").pop() || "";

  useEffect(() => {
    const token = secureLocalStorage.getItem("loginToken");
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(fetchUser());
  }, [dispatch, router]);

  useEffect(() => {
    if (error === "Session expired. Please log in again.") {
      router.push("/login");
    }
  }, [error, router]);

  // Generate bioData dynamically based on API response
  const bioData: BioDataItem[] = user
    ? ([
        user.industry && {
          id: 1,
          type: user.industry,
          label: "Industry",
          icon: "factory",
          class: "",
        },
        user.location && {
          id: 2,
          type: user.location,
          label: "Location",
          icon: "pin_drop",
          class: "",
        },
        user.website && {
          id: 3,
          type: user.website,
          label: "Website",
          icon: "link",
          class: "link",
        },
        user.email && {
          id: 4,
          type: user.email,
          label: "Email",
          icon: "email",
          class: "",
        },
        user.phone && {
          id: 5,
          type: `${user.country_code} ${user.phone}`,
          label: "Phone",
          icon: "call",
          class: "",
        },
        user.profileCategoryName && {
          id: 6,
          type: user.profileCategoryName,
          label: "Category",
          icon: "category",
          class: "",
        },
      ].filter(Boolean) as BioDataItem[]) // Remove falsy entries
    : [];

  // Generate statsData dynamically based on API response
  const statsData: StatsDataItem[] = user
    ? [
        {
          id: 1,
          icon: "description",
          label: `${user.totalActivePost || 0} post`,
        },
        {
          id: 2,
          icon: "visibility",
          label: `${user.profile_views || 0} Views`,
        },
        {
          id: 3,
          icon: "group",
          label: `${user.totalFollower || 0} followers`,
        },
        {
          id: 4,
          icon: "person_add",
          label: `${user.totalFollowing || 0} following`,
        },
      ]
    : [];

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">No profile data available.</div>;
  }

  return (
    <div className="banner-area pages-create mb-5">
      <div className="single-box p-5">
        <div className="avatar-area">
          <div className="banner-text">TechSocial</div>
        </div>
        <div className="top-area">
          {/* Profile Picture */}
          <div className="avatar-item position-relative">
            <Image
              className="avatar-img max-un setting-size-120"
              src={user.image || avatar_14}
              alt="avatar"
              width={120}
              height={120}
            />
            {user.is_verified === 1 && (
              <span className="badge bg-primary text-white position-absolute bottom-0 end-0 rounded-circle p-1">
                <i className="material-symbols-outlined">verified</i>
              </span>
            )}
          </div>

          {/* Main Content */}
          <div className="text-area">
            {/* Buttons Section at Top-Right */}
            <div className="btn-section">
              <Link href="/profile/edit" className="cmn-btn d-center gap-2">
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
                <div className="d-flex align-items-center gap-2">
                  <h4 className="m-0 xltxt">{user.name || "Unknown User"}</h4>
                  {user.is_verified === 1 && (
                    <i className="material-symbols-outlined text-primary">
                      verified
                    </i>
                  )}
                </div>
                <p className="m-0 text-orange-500 lgtxt margin-bottom">
                  @{user.username}
                </p>
                <p className="about-text mb-0 lgtxt">
                  {user.bio || "No bio available"}
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
            {[
              { id: "posts", label: "Posts" },
              { id: "likes", label: "Likes" },
              { id: "share", label: "Shares" },
              { id: "comments", label: "Comments" },
              { id: "mentions", label: "Mentions" },
              { id: "saved", label: "Saved" },
            ].map((tab) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <Link
                  href={`/profile/${tab.id}`}
                  className={`nav-link d-center lgtxt ${
                    lastPath === tab.id ? "active" : ""
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditBanner;
