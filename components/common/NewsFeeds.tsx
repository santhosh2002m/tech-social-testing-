// components/common/NewsFeeds.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllPosts,
  fetchSavedPosts,
  fetchLikedPosts,
  fetchSharedPosts,
  fetchCommentedPosts,
  fetchMentionedPosts,
  clearError,
} from "../../store/postSlice";
import ParentComment from "../ui/ParentComment";
import Post from "../ui/Post";
import PostReaction from "../ui/PostReaction";
import SiblingComment from "../ui/SiblingComment";
import WriteComment from "../ui/WriteComment";
import { toast } from "react-toastify";
import { Post as PostType } from "../../type/PostTypes";

interface NewsFeedsProps {
  clss?: string;
  reaction?: string;
}

const NewsFeeds: React.FC<NewsFeedsProps> = ({ clss = "", reaction = "" }) => {
  const [openCommentSections, setOpenCommentSections] = useState<{
    [key: number]: boolean;
  }>({});
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    switch (reaction) {
      case "/saved":
        dispatch(fetchSavedPosts());
        break;
      case "/liked":
        dispatch(fetchLikedPosts());
        break;
      case "/shared":
        dispatch(fetchSharedPosts());
        break;
      case "/commented":
        dispatch(fetchCommentedPosts());
        break;
      case "/mentioned":
        dispatch(fetchMentionedPosts());
        break;
      case "/":
      case "/posts":
        dispatch(fetchAllPosts());
        break;
      case "/chats":
      case "/explore-ai":
      case "/faq":
      case "/support":
      case "/subscription":
        // Placeholder for non-post pages
        break;
      default:
        dispatch(fetchAllPosts());
    }
  }, [reaction, dispatch]);

  const toggleCommentSection = (postId: number): void => {
    setOpenCommentSections((prev) => ({
      ...prev,
      [postId]: !prev[postId] || false,
    }));
  };

  return (
    <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
      {loading ? (
        <p className="text-center mdtxt">Loading posts...</p>
      ) : error ? (
        <p className="text-center mdtxt text-danger">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center mdtxt">
          No {reaction.replace("/", "") || "posts"} yet
        </p>
      ) : reaction === "/chats" ||
        reaction === "/explore-ai" ||
        reaction === "/faq" ||
        reaction === "/support" ||
        reaction === "/subscription" ? (
        <p className="text-center mdtxt">
          {reaction.replace("/", "").replace("-", " ").toUpperCase()} page
          coming soon
        </p>
      ) : (
        posts.map((post: PostType) => {
          const isCommentSectionOpen = openCommentSections[post.id] || false;

          return (
            <div key={post.id} className={`post-single-box ${clss}`}>
              <Post post={post} />
              <PostReaction
                reaction={reaction}
                toggleCommentSection={() => toggleCommentSection(post.id)}
                isCommentSectionOpen={isCommentSectionOpen}
                postId={post.id}
              />
              {isCommentSectionOpen && (
                <>
                  <WriteComment />
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div key={comment.id} className="comments-area mt-5">
                        <div className="single-comment-area ms-1 ms-xxl-15">
                          <ParentComment comment={comment} />
                          {comment?.replies?.map((reply, i, arr) => (
                            <SiblingComment
                              key={reply.id}
                              clss={
                                arr.length - 1 === i
                                  ? "single-comment-area"
                                  : "sibling-comment"
                              }
                              reply={reply}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default NewsFeeds;
