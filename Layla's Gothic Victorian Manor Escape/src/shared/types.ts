import z from "zod";

export const PuzzleSchema = z.object({
  id: z.number(),
  stage: z.number(),
  grid_data: z.string(),
  words_to_find: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UserProgressSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  stage: z.number(),
  completed_puzzles: z.string().nullable(),
  current_stage_progress: z.string().nullable(),
  is_completed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const GameStateSchema = z.object({
  selectedCells: z.array(z.object({
    row: z.number(),
    col: z.number(),
  })),
  foundWords: z.array(z.string()),
  currentStage: z.number(),
  isCompleted: z.boolean(),
});

export type Puzzle = z.infer<typeof PuzzleSchema>;
export type UserProgress = z.infer<typeof UserProgressSchema>;
export type GameState = z.infer<typeof GameStateSchema>;

export interface Cell {
  row: number;
  col: number;
  letter: string;
  isSelected: boolean;
  isFound: boolean;
}

export interface WordDirection {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  word: string;
}

// New puzzle types for different stages
export interface PotionIngredient {
  word: string;
  missingLetters: number[];
}

export interface SpiritPair {
  shadow: string;
  spirit: string;
}

export interface ScrambleGameState {
  scrambledWords: string[];
  correctWords: string[];
  solvedWords: string[];
  isCompleted: boolean;
}

export interface PotionGameState {
  ingredients: PotionIngredient[];
  availableLetters: string[];
  completedIngredients: string[];
  isCompleted: boolean;
}

export interface SpiritGameState {
  shadowWords: string[];
  spiritWords: string[];
  correctPairs: SpiritPair[];
  matchedPairs: SpiritPair[];
  isCompleted: boolean;
}
