
-- Restore original puzzle data
UPDATE puzzles SET 
  grid_data = '["PHANTOM", "GHOSTLY", "BCOWARD", "ASWITCH", "TSPOOKY", "SCREAMZ", "DARKTOM", "SHADOWX"]',
  words_to_find = '["PHANTOM", "GHOST", "BAT", "WITCH", "SPOOKY", "SCREAM", "DARK", "SHADOW"]',
  description = 'Find the spooky words hidden in the mansion'
WHERE stage = 1;

UPDATE puzzles SET 
  grid_data = '["SKELETON", "VAMPIREZ", "WEREWOL", "GOBLINS", "ZWITCHE", "GHOULSM", "SPECTRE", "HAUNTEY"]',
  words_to_find = '["SKELETON", "VAMPIRE", "WEREWOLF", "GOBLIN", "WITCH", "GHOUL", "SPECTRE", "HAUNT"]',
  description = 'Discover the creatures lurking in the graveyard'
WHERE stage = 2;

UPDATE puzzles SET 
  grid_data = '["BANSHEEM", "POLTERGS", "APPARIT", "DEMONSX", "NECROMA", "SORCERY", "MYSTICW", "CONJURE"]',
  words_to_find = '["BANSHEE", "POLTERGEIST", "APPARITION", "DEMON", "NECROMANCER", "SORCERY", "MYSTIC", "CONJURE"]',
  description = 'Uncover the ancient dark magic words'
WHERE stage = 3;
