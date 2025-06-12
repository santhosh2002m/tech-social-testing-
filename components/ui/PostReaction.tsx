// components/ui/PostReaction.tsx
"use client";

import { useAppSelector } from "../../store/hooks";
import { Post as PostType } from "../../type/PostTypes";

interface PostReactionProps {
  reaction?: string;
  toggleCommentSection: () => void;
  isCommentSectionOpen: boolean;
  postId: number;
}

const PostReaction: React.FC<PostReactionProps> = ({
  reaction = "",
  toggleCommentSection,
  isCommentSectionOpen,
  postId,
}) => {
  const post = useAppSelector((state) =>
    state.posts.posts.find((p) => p.id === postId)
  ) as PostType | undefined;

  return (
    <>
      <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
        <button
          className={`d-center gap-1 gap-sm-2 mdtxt ${
            post?.is_like ? "active" : ""
          }`}
          disabled
        >
          <i className="material-symbols-outlined mat-icon"> thumb_up </i>
          {post?.total_like || 0}
        </button>
        <button
          className={`d-center gap-1 gap-sm-2 mdtxt ${
            isCommentSectionOpen ? "active" : ""
          }`}
          onClick={toggleCommentSection}
        >
          <i className="material-symbols-outlined mat-icon"> chat_bubble </i>
          {post?.total_comment || 0}
        </button>
        <button
          className="d-center gap-1 gap-sm-2 mdtxt"
          onClick={() => console.log("AI Search clicked for post:", postId)}
          title="AI Search"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ai-search-icon"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              strokeWidth="4"
              fill="black"
              className="ai-search-icon-stroke"
            />
            <text
              x="13"
              y="25"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="14"
              className="ai-search-icon-text"
            >
              AI
            </text>
            <line
              x1="31"
              y1="31"
              x2="44"
              y2="44"
              strokeWidth="4"
              strokeLinecap="round"
              className="ai-search-icon-stroke"
            />
          </svg>
          <span className="d-none d-sm-inline">{post?.popular_point || 0}</span>
        </button>
        <button
          className={`d-center gap-1 gap-sm-2 mdtxt ${
            post?.is_share_post ? "active" : ""
          }`}
          disabled
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="share-icon"
          >
            <path
              d="M12 4V16M12 4L8 8M12 4L16 8M8 12H4V12H20V12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {post?.total_share || 0}
        </button>
        <button className="d-center gap-1 gap-sm-2 mdtxt" disabled>
          <i className="material-symbols-outlined mat-icon"> visibility </i>
          {post?.total_view || 0}
        </button>
      </div>
      <div className="view-comments-date d-flex justify-content-between align-items-center mt-2">
        <span className="mdtxt">View {post?.total_comment || 0} Comments</span>
        <span className="mdtxt">
          {post?.updated_at
            ? new Date(post.updated_at * 1000).toLocaleDateString()
            : "Unknown date"}
        </span>
      </div>
    </>
  );
};

export default PostReaction;
