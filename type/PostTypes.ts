// types/PostTypes.ts
export interface Post {
  id: number;
  user_id: number;
  type: number;
  post_content_type: number;
  content_type_reference_id: number | null;
  unique_id: string;
  audio_id: number | null;
  audio_start_time: number | null;
  audio_end_time: number | null;
  is_add_to_post: number;
  competition_id: number | null;
  club_id: number | null;
  campaign_id: number | null;
  event_id: number | null;
  is_winning: number;
  title: string | null;
  description: string | null;
  image: string | null;
  total_view: number;
  total_like: number;
  total_comment: number;
  total_share: number;
  popular_point: number;
  is_share_post: number;
  share_level: number;
  origin_post_id: number | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  is_comment_enable: number;
  status: number;
  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
  share_comment: string | null;
  poll_id: number | null;
  display_whose: number;
  share_link: string;
  postGallary: {
    type: number;
    media_type: number;
    filename: string;
    video_thumb: string;
    is_default: number;
  }[];
  is_like: number;
  is_reported: number;
  hashtags: string[];
  mentionUsers: string[];
  is_promotion: number;
  isSaved?: boolean;
  isLiked?: boolean;
  isCommented?: boolean;
  isShared?: boolean;
  isMentioned?: boolean;
  authorName?: string;
  authorAvt?: string;
  mediaType?: string;
  poll?: PollOption[];
  comments?: Comment[];
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Comment {
  id: number;
  content: string;
  replies: Comment[];
  authorName?: string; // Added
  authorAvt?: string; // Added (string, since we'll pass a URL to Image)
}

export interface PostResponse {
  status: number;
  statusText: string;
  message: string;
  data: {
    posts?: Post[];
    errors?: { message: string[] };
  };
}
