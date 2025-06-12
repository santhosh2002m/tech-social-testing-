// components/ui/ParentComment.tsx
import Image from "next/image";
import Link from "next/link";
import CommentAction from "./CommentAction";
import ReplayReaction from "./ReplayReaction";
import { Comment } from "../../type/PostTypes";

const ParentComment = ({ comment }: { comment: Comment }) => {
  const { authorAvt, authorName, content, replies } = comment;

  return (
    <div
      className={`${
        replies.length > 0 ? "parent-comment" : ""
      } d-flex gap-2 gap-sm-4`}
    >
      <div className="avatar-item d-center align-items-baseline">
        <Image
          className="avatar-img max-un"
          src={authorAvt || "/default-avatar.png"} // Fallback if authorAvt is missing
          alt={authorName || "User"}
          width={40}
          height={40}
        />
      </div>
      <div className="info-item active">
        <div className="top-area px-4 py-3 d-flex gap-3 align-items-start justify-content-between">
          <div className="title-area">
            <h6 className="m-0 mb-3">
              <Link href="/public-profile/post">
                {authorName || "Unknown User"}{" "}
                {/* Fallback if authorName is missing */}
              </Link>
            </h6>
            <p className="mdtxt">{content}</p>
          </div>
          <div className="btn-group dropend cus-dropdown">
            {/* Comment Action */}
            <CommentAction />
          </div>
        </div>

        {/* Replay Reaction */}
        <ReplayReaction />
      </div>
    </div>
  );
};

export default ParentComment;
