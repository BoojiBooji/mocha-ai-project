import { useState, useEffect, useCallback } from 'react';
import { Puzzle, PotionGameState, PotionIngredient } from '@/shared/types';

export function usePotionGame(puzzle: Puzzle | null) {
  const [gameState, setGameState] = useState<PotionGameState>({
    ingredients: [],
    availableLetters: [],
    completedIngredients: [],
    isCompleted: false,
  });

  useEffect(() => {
    if (!puzzle) return;

    try {
      // Parse the puzzle data for potion ingredients
      const ingredientsData = JSON.parse(puzzle.words_to_find);
      
      const ingredients: PotionIngredient[] = ingredientsData.map((word: string) => {
        // Randomly select 2-3 letters to be missing
        const wordLength = word.length;
        const missingCount = Math.max(2, Math.min(3, Math.floor(wordLength / 2)));
        const missingLetters: number[] = [];
        
        while (missingLetters.length < missingCount) {
          const randomIndex = Math.floor(Math.random() * wordLength);
          if (!missingLetters.includes(randomIndex)) {
            missingLetters.push(randomIndex);
          }
        }
        
        return {
          word: word.toUpperCase(),
          missingLetters: missingLetters.sort((a, b) => a - b),
        };
      });

      // Create available letters pool from all missing letters
      const availableLetters: string[] = [];
      ingredients.forEach(ingredient => {
        ingredient.missingLetters.forEach(index => {
          availableLetters.push(ingredient.word[index]);
        });
      });

      // Shuffle the available letters
      const shuffledLetters = [...availableLetters].sort(() => Math.random() - 0.5);

      setGameState({
        ingredients,
        availableLetters: shuffledLetters,
        completedIngredients: [],
        isCompleted: false,
      });
    } catch (error) {
      console.error('Error parsing potion puzzle data:', error);
    }
  }, [puzzle]);

  const handleIngredientComplete = useCallback((ingredient: string) => {
    setGameState(prev => {
      const newCompleted = [...prev.completedIngredients, ingredient];
      const isCompleted = newCompleted.length === prev.ingredients.length;
      
      return {
        ...prev,
        completedIngredients: newCompleted,
        isCompleted,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      completedIngredients: [],
      isCompleted: false,
    }));
  }, []);

  return {
    gameState,
    handleIngredientComplete,
    resetGame,
  };
}
