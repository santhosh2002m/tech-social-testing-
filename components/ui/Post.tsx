// components/ui/Post.tsx (for reference)
import Image from "next/image";
import Link from "next/link";
import PostAction from "./PostAction";
import { PostData, PollOption } from "../../data/postData"; // Importing from postData.ts

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const {
    description,
    image,
    hashtags,
    mentionUsers,
    mediaType,
    poll,
    postGallary,
    authorName = "Unknown User",
    authorAvt = "/default-avatar.png",
  } = post;

  const renderMedia = () => {
    if (!mediaType || mediaType === "text") return null;

    if (mediaType === "poll" && poll) {
      const totalVotes = poll.reduce(
        (sum: number, option: PollOption) => sum + option.votes,
        0
      );

      return (
        <div className="poll-area my-3">
          <p className="poll-label">Poll</p>
          {poll.map((option: PollOption) => {
            const percentage =
              totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

            return (
              <div key={option.id} className="poll-option">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="poll-option-text">{option.text}</span>
                  <span className="poll-option-votes">
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="poll-progress-bar">
                  <div
                    className="poll-progress-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    const media =
      postGallary && postGallary.length > 0
        ? postGallary.map((item) => item.filename)
        : image
        ? [image]
        : [];

    if (!media || media.length === 0) {
      return <p className="text-danger">Media not found</p>;
    }

    if (mediaType === "image" || mediaType === "gif") {
      return (
        <div
          className={`post-img ${
            media.length > 1
              ? "d-flex justify-content-between flex-wrap gap-2 gap-lg-3"
              : ""
          }`}
        >
          {media.length > 1 ? (
            <>
              <div className="single">
                <Image
                  src={media[0]}
                  alt="post media"
                  width={300}
                  height={300}
                />
              </div>
              <div className="single d-grid gap-3">
                {media.slice(1).map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt="post media"
                    width={150}
                    height={150}
                  />
                ))}
              </div>
            </>
          ) : (
            <Image
              src={media[0]}
              alt="post media"
              className="w-100"
              width={600}
              height={400}
            />
          )}
        </div>
      );
    }

    if (mediaType === "video") {
      return (
        <div className="post-video">
          <video controls className="w-100" style={{ maxHeight: "400px" }}>
            <source src={media[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (mediaType === "pdf") {
      return (
        <div className="post-pdf">
          <iframe
            src={media[0]}
            width="100%"
            height="500px"
            title="PDF Document"
            style={{ border: "none" }}
          >
            Your browser does not support PDFs. Please download the PDF to view
            it: <a href={media[0]}>Download PDF</a>.
          </iframe>
        </div>
      );
    }

    return <p className="text-danger">Unsupported media type</p>;
  };

  return (
    <div className="top-area pb-5">
      <div className="profile-area d-center justify-content-between">
        <div className="avatar-item d-flex gap-3 align-items-center">
          <div className="avatar position-relative before-element-target">
            <Image
              className="avatar-img max-un"
              src={authorAvt}
              alt={authorName}
              width={50}
              height={50}
            />
          </div>
          <div className="info-area">
            <h6 className="m-0">
              <Link href="/public-profile/post">{authorName}</Link>
            </h6>
            <span className="mdtxt status">@santhosh_007</span>
          </div>
        </div>
        <div className="btn-group cus-dropdown">
          <PostAction />
        </div>
      </div>
      <div className="py-4">
        <p className="description">{description || ""}</p>
        <p className="hastag d-flex gap-2">
          {hashtags?.map((itm) => (
            <Link key={itm} href="#">
              #{itm}
            </Link>
          ))}
        </p>
        <p className="mentions d-flex gap-2">
          {mentionUsers?.map((user) => (
            <Link key={user} href="#">
              @{user}
            </Link>
          ))}
        </p>
      </div>
      {renderMedia()}
    </div>
  );
};

export default Post;
