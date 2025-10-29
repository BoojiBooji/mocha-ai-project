
CREATE TABLE puzzles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stage INTEGER NOT NULL,
  grid_data TEXT NOT NULL,
  words_to_find TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  stage INTEGER NOT NULL,
  completed_puzzles TEXT,
  current_stage_progress TEXT,
  is_completed BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_puzzles_stage ON puzzles(stage);
