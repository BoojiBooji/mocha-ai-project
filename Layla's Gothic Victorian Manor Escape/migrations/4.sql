
-- Update Stage 2 for Potion Recipe puzzle
UPDATE puzzles 
SET 
  description = "Brew magical potions by completing ingredient names in the graveyard",
  words_to_find = '["PUMPKIN", "GHOST", "BLOOD", "SPELL", "MAGIC", "POTION"]'
WHERE stage = 2;

-- Update Stage 3 for Spirit Echoes puzzle  
UPDATE puzzles
SET
  description = "Connect shadowy echoes with their spirit words to open the portal",
  words_to_find = '[{"shadow": "BAT", "spirit": "CAVE"}, {"shadow": "WITCH", "spirit": "HAT"}, {"shadow": "GHOST", "spirit": "BOO"}, {"shadow": "DARK", "spirit": "LIGHT"}, {"shadow": "MOON", "spirit": "NIGHT"}, {"shadow": "MAGIC", "spirit": "SPELL"}]'
WHERE stage = 3;
