"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import CreatePoll from "./CreatePoll";

import add_post_avatar from "/public/images/hell.jpg";

const CreatePost: React.FC = () => {
  const [isPollMode, setIsPollMode] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const documentInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiIconRef = useRef<HTMLSpanElement>(null);

  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedDocuments(files);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedMedia(files);
  };

  const triggerDocumentInput = (): void => {
    documentInputRef.current?.click();
  };

  const triggerMediaInput = (): void => {
    mediaInputRef.current?.click();
  };

  const removeDocument = (index: number): void => {
    setSelectedDocuments(selectedDocuments.filter((_, i) => i !== index));
  };

  const removeMedia = (index: number): void => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  const toggleEmojiPicker = (): void => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData: EmojiClickData): void => {
    setPostContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePostSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      !postContent.trim() &&
      selectedMedia.length === 0 &&
      selectedDocuments.length === 0
    ) {
      alert("Please add some content to post!");
      return;
    }

    const postData = {
      content: postContent,
      media: selectedMedia,
      documents: selectedDocuments,
      timestamp: new Date().toISOString(),
    };

    console.log("Submitted Post:", postData);

    setPostContent("");
    setSelectedMedia([]);
    setSelectedDocuments([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiIconRef.current &&
        !emojiIconRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="share-post d-flex gap-2 gap-sm-3 p-2 p-sm-3">
      <div className="profile-box">
        <Link href="#">
          <Image
            src={add_post_avatar}
            width={40}
            height={40}
            className="max-un"
            alt="profile avatar"
          />
        </Link>
      </div>
      <div className="w-100 position-relative">
        {!isPollMode ? (
          <form onSubmit={handlePostSubmit} className="w-100 position-relative">
            <textarea
              cols={10}
              rows={2}
              placeholder="Write something to Lerio..."
              className="w-100"
              value={postContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostContent(e.target.value)
              }
            ></textarea>
            <div className="abs-area position-absolute d-none d-sm-block">
              <i
                className="material-symbols-outlined mat-icon xxltxt"
                onClick={toggleEmojiPicker}
                ref={emojiIconRef}
              >
                sentiment_satisfied
              </i>
              {showEmojiPicker && (
                <div className="emoji-picker" ref={emojiPickerRef}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            {selectedMedia.length > 0 && (
              <div className="selected-media mt-2">
                <h6>Selected Photos/Videos:</h6>
                <ul>
                  {selectedMedia.map((file, index) => (
                    <li
                      key={index}
                      className="smtxt d-flex align-items-center gap-2"
                    >
                      <span>{file.name}</span>
                      <button
                        className="cmn-btn alt smtxt"
                        onClick={() => removeMedia(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedDocuments.length > 0 && (
              <div className="selected-documents mt-2">
                <h6>Selected Documents:</h6>
                <ul>
                  {selectedDocuments.map((file, index) => (
                    <li
                      key={index}
                      className="smtxt d-flex align-items-center gap-2"
                    >
                      <span>{file.name}</span>
                      <button
                        className="cmn-btn alt smtxt"
                        onClick={() => removeDocument(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="d-flex align-items-center mt-2 gap-2 action-list space-between">
              <li
                className="d-flex align-items-center gap-2"
                onClick={triggerMediaInput}
              >
                <span className="material-symbols-outlined icon-orange lgtxt">
                  photo
                </span>
                <span>Photo/Video</span>
                <input
                  type="file"
                  ref={mediaInputRef}
                  multiple
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={handleMediaChange}
                />
              </li>
              <li
                className="d-flex align-items-center gap-2 choose-documents"
                onClick={triggerDocumentInput}
              >
                <span className="material-symbols-outlined icon-orange lgtxt">
                  description
                </span>
                <span>Choose Documents</span>
                <input
                  type="file"
                  ref={documentInputRef}
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: "none" }}
                  onChange={handleDocumentChange}
                />
              </li>
              <li
                className="d-flex align-items-center gap-2"
                onClick={() => setIsPollMode(true)}
              >
                <span className="material-symbols-outlined">poll</span>
                <span>Poll</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <button type="submit" className="cmn-btn custom-post-btn">
                  <span className="material-symbols-outlined">send</span>
                  <span>Post</span>
                </button>
              </li>
            </ul>
          </form>
        ) : (
          <CreatePoll
            onCancel={() => setIsPollMode(false)}
            onSubmitPoll={(pollData) =>
              console.log("Submitted Poll:", pollData)
            }
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
