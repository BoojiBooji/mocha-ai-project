import { useState, useEffect } from 'react';
import { Puzzle } from '@/shared/types';

interface ScrambleGameState {
  scrambledWords: string[];
  correctWords: string[];
  solvedWords: string[];
  isCompleted: boolean;
}

export function useScrambleGame(puzzle: Puzzle | null) {
  const [gameState, setGameState] = useState<ScrambleGameState>({
    scrambledWords: [],
    correctWords: [],
    solvedWords: [],
    isCompleted: false,
  });

  useEffect(() => {
    if (!puzzle) return;

    try {
      const scrambledWords = JSON.parse(puzzle.grid_data); // Now contains scrambled words
      const correctWords = JSON.parse(puzzle.words_to_find);
      
      setGameState({
        scrambledWords,
        correctWords,
        solvedWords: [],
        isCompleted: false,
      });
    } catch (error) {
      console.error('Error parsing puzzle data:', error);
    }
  }, [puzzle]);

  const handleWordSolved = (word: string) => {
    setGameState(prev => {
      const newSolvedWords = [...prev.solvedWords, word];
      const isCompleted = newSolvedWords.length === prev.correctWords.length;
      
      return {
        ...prev,
        solvedWords: newSolvedWords,
        isCompleted,
      };
    });
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      solvedWords: [],
      isCompleted: false,
    }));
  };

  return {
    gameState,
    handleWordSolved,
    resetGame,
  };
}
