
-- Update puzzle data to make stages easier
UPDATE puzzles SET 
  grid_data = '["CATBOO", "ATWORM", "THELLO", "COWPET", "RATDOG", "TOPHAT"]',
  words_to_find = '["CAT", "BOO", "HAT", "COW", "RAT", "TOP", "PET", "DOG"]',
  description = 'Layla begins her journey to escape the spooky mansion'
WHERE stage = 1;

UPDATE puzzles SET 
  grid_data = '["BATFLY", "OWLRUN", "DOGJMP", "CATGHI", "RATBOX", "PIGMUD"]',
  words_to_find = '["BAT", "FLY", "OWL", "RUN", "DOG", "CAT", "RAT", "PIG"]',
  description = 'Layla ventures deeper into the haunted grounds'
WHERE stage = 2;

UPDATE puzzles SET 
  grid_data = '["KEYXIT", "DOORUN", "GOAWAY", "FREELU", "HOMEZY", "SAFEWX"]',
  words_to_find = '["KEY", "EXIT", "DOOR", "GO", "FREE", "HOME", "SAFE", "WAY"]',
  description = 'Layla finds the magical exit from Fright Land'
WHERE stage = 3;
