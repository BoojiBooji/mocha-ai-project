
-- Revert to original grid data
UPDATE puzzles SET 
  grid_data = '["CATBOO", "ATWORM", "THELLO", "COWPET", "RATDOG", "TOPHAT"]',
  title = "Haunted Mansion",
  description = "Layla begins her journey to escape the spooky mansion"
WHERE stage = 1;

UPDATE puzzles SET 
  grid_data = '["BATFLY", "OWLRUN", "DOGJMP", "CATGHI", "RATBOX", "PIGMUD"]',
  title = "Graveyard Terror",
  description = "Layla ventures deeper into the haunted grounds"
WHERE stage = 2;

UPDATE puzzles SET 
  grid_data = '["KEYXIT", "DOORUN", "GOAWAY", "FREELU", "HOMEZY", "SAFEWX"]',
  title = "Dark Magic Realm", 
  description = "Layla finds the magical exit from Fright Land"
WHERE stage = 3;
