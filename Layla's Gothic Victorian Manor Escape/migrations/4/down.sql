
-- Revert Stage 2 back to original word scramble
UPDATE puzzles 
SET 
  description = "Decipher the enchanted runes scattered throughout the graveyard",
  words_to_find = '["BAT", "FLY", "OWL", "RUN", "DOG", "CAT", "RAT", "PIG"]'
WHERE stage = 2;

-- Revert Stage 3 back to original word scramble
UPDATE puzzles
SET
  description = "Solve the final magical word spells to open the exit portal", 
  words_to_find = '["KEY", "EXIT", "DOOR", "GO", "FREE", "HOME", "SAFE", "WAY"]'
WHERE stage = 3;
