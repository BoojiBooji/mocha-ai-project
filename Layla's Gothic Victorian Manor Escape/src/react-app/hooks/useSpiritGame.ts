import { useState, useEffect, useCallback } from 'react';
import { Puzzle, SpiritGameState, SpiritPair } from '@/shared/types';

export function useSpiritGame(puzzle: Puzzle | null) {
  const [gameState, setGameState] = useState<SpiritGameState>({
    shadowWords: [],
    spiritWords: [],
    correctPairs: [],
    matchedPairs: [],
    isCompleted: false,
  });

  useEffect(() => {
    if (!puzzle) return;

    try {
      // Parse the puzzle data for spirit pairs
      const pairsData = JSON.parse(puzzle.words_to_find);
      
      const correctPairs: SpiritPair[] = pairsData.map((pair: { shadow: string; spirit: string }) => ({
        shadow: pair.shadow.toUpperCase(),
        spirit: pair.spirit.toUpperCase(),
      }));

      const shadowWords = correctPairs.map(pair => pair.shadow);
      const spiritWords = correctPairs.map(pair => pair.spirit);

      // Shuffle the words
      const shuffledShadowWords = [...shadowWords].sort(() => Math.random() - 0.5);
      const shuffledSpiritWords = [...spiritWords].sort(() => Math.random() - 0.5);

      setGameState({
        shadowWords: shuffledShadowWords,
        spiritWords: shuffledSpiritWords,
        correctPairs,
        matchedPairs: [],
        isCompleted: false,
      });
    } catch (error) {
      console.error('Error parsing spirit puzzle data:', error);
    }
  }, [puzzle]);

  const handlePairMatched = useCallback((shadowWord: string, spiritWord: string) => {
    setGameState(prev => {
      const newMatched = [...prev.matchedPairs, { shadow: shadowWord, spirit: spiritWord }];
      const isCompleted = newMatched.length === prev.correctPairs.length;
      
      return {
        ...prev,
        matchedPairs: newMatched,
        isCompleted,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      matchedPairs: [],
      isCompleted: false,
    }));
  }, []);

  return {
    gameState,
    handlePairMatched,
    resetGame,
  };
}
