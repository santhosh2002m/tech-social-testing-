// components/savedPostDetails/SavedPostDetailsMain.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSavedPosts } from "../../store/postSlice";
import RightSide from "../home/RightSide";
import HomeLeft from "../menu/HomeLeft";
import ParentComment from "../ui/ParentComment";
import Post from "../ui/Post";
import PostReaction from "../ui/PostReaction";
import SiblingComment from "../ui/SiblingComment";
import WriteComment from "../ui/WriteComment";

const SavedPostDetailsMain = () => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  // Select the third saved post (index 2) to match the original behavior
  const data = posts.length > 2 ? posts[2] : null;

  if (loading) {
    return <p className="text-center mdtxt">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center mdtxt text-danger">Error: {error}</p>;
  }

  if (!data) {
    return <p className="text-center mdtxt">Post not found</p>;
  }

  return (
    <main className="main-content">
      <div className="container sidebar-toggler">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            <div className="post-item d-flex flex-column gap-5 gap-md-7">
              <div className="post-single-box p-3 p-sm-5">
                <Post post={data} />
                {/* Uncomment if needed */}
                {/* <PostReaction /> */}
                <WriteComment />
                {data.comments
                  ? data.comments.map((comment) => (
                      <div key={comment.id} className="comments-area mt-5">
                        <div className="single-comment-area ms-1 ms-xxl-15">
                          <ParentComment comment={comment} />
                          {comment?.replies.map((reply, i, arr) => (
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
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
            <div
              className={`cus-overflow cus-scrollbar sidebar-head ${
                activeProfile ? "active" : ""
              }`}
            >
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavedPostDetailsMain;
