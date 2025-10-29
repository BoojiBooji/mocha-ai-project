
-- Update puzzles to use word scramble format instead of grid format
UPDATE puzzles SET 
  grid_data = '["TAC", "OOB", "AHT", "WOC", "TAR", "POT", "TEP", "GOD"]',
  title = "Haunted Mansion",
  description = "Help Layla unscramble cursed words to unlock the mansion doors"
WHERE stage = 1;

UPDATE puzzles SET 
  grid_data = '["TAB", "YLF", "LOW", "NUR", "GOD", "TAC", "TAR", "GIP"]',
  title = "Graveyard Path", 
  description = "Decipher the enchanted runes scattered throughout the graveyard"
WHERE stage = 2;

UPDATE puzzles SET 
  grid_data = '["YEK", "TIEX", "ROOD", "OG", "EEFR", "MOEH", "EFAS", "YAW"]',
  title = "Freedom Portal",
  description = "Solve the final magical word spells to open the exit portal"
WHERE stage = 3;
