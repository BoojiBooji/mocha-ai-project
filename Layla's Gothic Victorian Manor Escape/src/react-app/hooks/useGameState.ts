import { useState, useEffect } from 'react';
import { Puzzle, GameState } from '@/shared/types';

export function useGameState(puzzle: Puzzle | null) {
  const [gameState, setGameState] = useState<GameState>({
    selectedCells: [],
    foundWords: [],
    currentStage: 1,
    isCompleted: false,
  });

  const [grid, setGrid] = useState<string[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);

  useEffect(() => {
    if (!puzzle) return;

    try {
      const gridData = JSON.parse(puzzle.grid_data);
      const words = JSON.parse(puzzle.words_to_find);
      
      // Convert grid strings to 2D array
      const gridArray = gridData.map((row: string) => row.split(''));
      
      setGrid(gridArray);
      setWordsToFind(words);
      setGameState(prev => ({
        ...prev,
        currentStage: puzzle.stage,
        foundWords: [],
        isCompleted: false,
      }));
    } catch (error) {
      console.error('Error parsing puzzle data:', error);
    }
  }, [puzzle]);

  const handleWordFound = (word: string) => {
    setGameState(prev => {
      const newFoundWords = [...prev.foundWords, word];
      const isCompleted = newFoundWords.length === wordsToFind.length;
      
      return {
        ...prev,
        foundWords: newFoundWords,
        isCompleted,
      };
    });
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      selectedCells: [],
      foundWords: [],
      isCompleted: false,
    }));
  };

  return {
    gameState,
    grid,
    wordsToFind,
    handleWordFound,
    resetGame,
  };
}
