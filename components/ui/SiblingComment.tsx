// components/ui/SiblingComment.tsx
import Image from "next/image";
import Link from "next/link";
import CommentAction from "./CommentAction";
import ReplayReaction from "./ReplayReaction";
import { Comment } from "../../type/PostTypes";

interface SiblingCommentProps {
  reply: Comment;
  clss?: string;
}

const SiblingComment = ({
  reply,
  clss = "sibling-comment",
}: SiblingCommentProps) => {
  const { authorAvt, authorName, content } = reply;

  return (
    <div
      className={`${clss} comment-item-nested single-comment-area mt-4 mt-sm-7 ms-13 ms-sm-15`}
    >
      <div className="d-flex gap-2 gap-sm-4 align-items-baseline">
        <div className="avatar-item">
          <Image
            className="avatar-img max-un"
            src={authorAvt || "/default-avatar.png"} // Fallback if authorAvt is missing
            alt={authorName || "User"}
            width={30} // Added required width
            height={30} // Added required height
          />
        </div>
        <div className="info-item">
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
    </div>
  );
};

export default SiblingComment;
