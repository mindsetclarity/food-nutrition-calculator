export const TOPICS = [
  { slug: 'diet', label: 'Diet', indexable: true },
  { slug: 'exercise', label: 'Exercise', indexable: true },
  { slug: 'physique', label: 'Physique / Progress', indexable: true },
  { slug: 'feedback', label: 'Website feedback', indexable: false },
] as const;

export type TopicSlug = (typeof TOPICS)[number]['slug'];

export interface User {
  id: number;
  email: string;
  email_verified: number;
  password_hash: string | null;
  google_sub: string | null;
  username: string | null;
  is_banned: number;
  created_at: number;
}

export interface Post {
  id: number;
  user_id: number;
  topic: TopicSlug;
  title: string;
  body: string;
  slug: string;
  score: number;
  created_at: number;
  deleted_at: number | null;
}

export interface Reply {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
  created_at: number;
  deleted_at: number | null;
}
