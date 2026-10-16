CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  email_verified INTEGER NOT NULL DEFAULT 0,
  password_hash TEXT,
  google_sub TEXT UNIQUE,
  username TEXT UNIQUE COLLATE NOCASE,
  is_banned INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL
);
CREATE TABLE email_tokens (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  purpose TEXT NOT NULL CHECK (purpose IN ('verify','reset')),
  expires_at INTEGER NOT NULL
);
CREATE TABLE referral_codes (
  code TEXT PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  created_at INTEGER NOT NULL,
  redeemed_at INTEGER,
  revoked_at INTEGER
);
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  slug TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  deleted_at INTEGER
);
CREATE INDEX idx_posts_topic_created ON posts(topic, created_at);
CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  deleted_at INTEGER
);
CREATE TABLE votes (
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  PRIMARY KEY (user_id, post_id)
);
CREATE TABLE photos (
  key TEXT PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('pending','live','rejected')),
  created_at INTEGER NOT NULL
);
CREATE TABLE reports (
  id INTEGER PRIMARY KEY,
  reporter_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  reply_id INTEGER REFERENCES replies(id),
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  resolved_at INTEGER
);
CREATE TABLE feedback (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  owner_reply TEXT,
  created_at INTEGER NOT NULL,
  replied_at INTEGER
);
-- Indexes for the hot lookups (D1 bills rows read; without these the queries below full-scan).
CREATE INDEX idx_replies_post_created ON replies(post_id, created_at);
CREATE INDEX idx_replies_user_created ON replies(user_id, created_at);
CREATE INDEX idx_photos_post ON photos(post_id);
CREATE INDEX idx_photos_pending ON photos(status) WHERE status = 'pending';
CREATE INDEX idx_votes_post ON votes(post_id);
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_email_tokens_user ON email_tokens(user_id);
CREATE INDEX idx_feedback_user_created ON feedback(user_id, created_at);
CREATE INDEX idx_reports_resolved ON reports(resolved_at);
