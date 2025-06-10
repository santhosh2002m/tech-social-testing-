import Link from "next/link";
import Contact from "../common/Contact";
import MakePost from "../common/MakePost";
import NewsFeeds from "../common/NewsFeeds";
import Photos from "../marketplacePost/Photos";
import RightSide from "../home/RightSide";
import HomeLeft from "../menu/HomeLeft";

const bioData = [
  {
    id: 1,
    type: "Developer",
    icon: "integration_instructions",
    class: "",
  },
  {
    id: 2,
    type: "Master's degree",
    icon: "school",
    class: "",
  },
  {
    id: 3,
    type: "test@mail.com",
    icon: "flag",
    class: "link",
  },
  {
    id: 4,
    type: "www.wisoky.com",
    icon: "language",
    class: "link",
  },
  {
    id: 5,
    type: "(316) 555-0116",
    icon: "call",
    class: "",
  },
  {
    id: 6,
    type: "USA",
    icon: "pin_drop",
    class: "",
  },
  {
    id: 7,
    type: "775 Rolling Green Rd.",
    icon: "house",
    class: "",
  },
];

const ProfilePostMain = () => {
  return (
    <>
      <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
        <HomeLeft clss="d-lg-none" />
      </div>
      <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
        {/* Make Post */}
        <MakePost />

        {/* Feeds */}
        <NewsFeeds clss="p-3 p-sm-5" />
      </div>
      <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
        <div className="cus-overflow cus-scrollbar sidebar-head">
          <div className="d-flex justify-content-end">
            <div className="d-block d-xl-none me-4">
              <button className="button toggler-btn mb-4 mb-lg-0 d-flex align-items-center gap-2">
                <span>My List</span>
                <i className="material-symbols-outlined mat-icon"> tune </i>
              </button>
            </div>
          </div>
          <div className="cus-scrollbar side-wrapper">
            <RightSide />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePostMain;
