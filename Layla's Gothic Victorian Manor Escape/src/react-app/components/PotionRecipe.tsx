import { useState, useCallback, useEffect } from 'react';
import { Check, X, Sparkles, Beaker, Skull, Flame } from 'lucide-react';

interface PotionRecipeProps {
  ingredients: Array<{
    word: string;
    missingLetters: number[];
  }>;
  availableLetters: string[];
  onIngredientComplete: (ingredient: string) => void;
  completedIngredients: string[];
}

export default function PotionRecipe({ 
  ingredients, 
  availableLetters, 
  onIngredientComplete, 
  completedIngredients 
}: PotionRecipeProps) {
  const [placedLetters, setPlacedLetters] = useState<Record<string, string>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ ingredient: string; isCorrect: boolean } | null>(null);

  const handleLetterClick = (letter: string, letterIndex: number) => {
    if (selectedLetter === `${letter}-${letterIndex}`) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(`${letter}-${letterIndex}`);
    }
  };

  const handleSlotClick = (ingredient: string, slotIndex: number) => {
    if (!selectedLetter) return;
    if (completedIngredients.includes(ingredient)) return;

    const slotKey = `${ingredient}-${slotIndex}`;
    
    // If slot already has a letter, remove it
    if (placedLetters[slotKey]) {
      setPlacedLetters(prev => {
        const newPlaced = { ...prev };
        delete newPlaced[slotKey];
        return newPlaced;
      });
    }

    // Place the selected letter
    const [letter] = selectedLetter.split('-');
    setPlacedLetters(prev => ({
      ...prev,
      [slotKey]: letter
    }));

    setSelectedLetter(null);
  };

  const checkIngredient = useCallback((ingredient: { word: string; missingLetters: number[] }) => {
    const isComplete = ingredient.missingLetters.every(slotIndex => {
      const slotKey = `${ingredient.word}-${slotIndex}`;
      const placedLetter = placedLetters[slotKey];
      const correctLetter = ingredient.word[slotIndex];
      return placedLetter === correctLetter;
    });

    if (isComplete && !completedIngredients.includes(ingredient.word)) {
      setFeedback({ ingredient: ingredient.word, isCorrect: true });
      onIngredientComplete(ingredient.word);
      
      setTimeout(() => {
        setFeedback(null);
      }, 2500);
    }
  }, [placedLetters, completedIngredients, onIngredientComplete]);

  useEffect(() => {
    ingredients.forEach(ingredient => {
      checkIngredient(ingredient);
    });
  }, [placedLetters, ingredients, checkIngredient]);

  const getUsedLetterCount = (letter: string) => {
    return Object.values(placedLetters).filter(placed => placed === letter).length;
  };

  const getAvailableCount = (letter: string) => {
    return availableLetters.filter(available => available === letter).length;
  };

  const isLetterAvailable = (letter: string) => {
    const usedCount = getUsedLetterCount(letter);
    const availableCount = getAvailableCount(letter);
    return usedCount < availableCount;
  };

  return (
    <div className="space-y-10">
      
      {/* Victorian Alchemical Laboratory Header */}
      <div className="text-center">
        <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Beaker className="w-10 h-10 text-amber-400 candlelight-glow" />
            <h3 className="text-4xl gothic-title text-amber-100 candlelight-glow">
              Victorian Alchemical Laboratory
            </h3>
            <Beaker className="w-10 h-10 text-amber-400 candlelight-glow" />
          </div>
          <p className="text-amber-300/90 gothic-text text-xl leading-relaxed">
            Complete the ancient ingredient formulae to brew the mystical elixir of passage
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-amber-400/70">
            <Skull className="w-5 h-5" />
            <span className="text-sm gothic-casual">Est. 1847 • Master Alchemist's Workshop</span>
            <Skull className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Victorian Alchemical Recipe Scroll */}
      <div className="ornate-frame bg-gradient-to-br from-amber-950/30 to-amber-900/15 p-10">
        <div className="text-center mb-8">
          <h4 className="text-2xl gothic-script text-amber-200 candlelight-glow mb-2">
            Ancient Recipe Formulae
          </h4>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        
        <div className="space-y-8">
          {ingredients.map((ingredient, ingredientIndex) => {
            const isCompleted = completedIngredients.includes(ingredient.word);
            
            return (
              <div 
                key={ingredient.word}
                className={`
                  ornate-frame p-8 transition-all duration-500 transform
                  ${isCompleted 
                    ? 'bg-green-800/40 border-green-600/50 scale-105' 
                    : 'bg-amber-950/40 border-amber-700/40 hover:bg-amber-900/30'
                  }
                `}
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Flame className="w-6 h-6 text-amber-400 candlelight-glow" />
                    <span className="text-amber-200 font-bold gothic-text text-lg">
                      Alchemical Component {ingredientIndex + 1}
                    </span>
                    <Flame className="w-6 h-6 text-amber-400 candlelight-glow" />
                    {isCompleted && <Check className="w-6 h-6 text-green-400 candlelight-glow" />}
                  </div>
                  <p className="text-amber-300/80 gothic-text italic">
                    {isCompleted ? "Formula successfully transcribed" : "Complete the missing alchemical symbols"}
                  </p>
                </div>
                
                <div className="flex justify-center gap-3 flex-wrap">
                  {ingredient.word.split('').map((letter, letterIndex) => {
                    const isMissing = ingredient.missingLetters.includes(letterIndex);
                    const slotKey = `${ingredient.word}-${letterIndex}`;
                    const placedLetter = placedLetters[slotKey];
                    
                    if (isMissing) {
                      return (
                        <button
                          key={letterIndex}
                          onClick={() => handleSlotClick(ingredient.word, letterIndex)}
                          disabled={isCompleted}
                          className={`
                            relative w-16 h-16 border-3 border-dashed rounded-lg 
                            flex items-center justify-center text-2xl font-bold gothic-title
                            transition-all duration-300 transform hover:scale-105
                            ${placedLetter 
                              ? 'bg-amber-600/60 text-amber-100 border-solid border-amber-500 shadow-deep-gothic' 
                              : 'bg-amber-900/20 text-amber-400/60 border-amber-600/50 hover:bg-amber-800/30 hover:border-amber-500/70'
                            }
                            ${isCompleted ? 'border-green-500/60 bg-green-700/40' : ''}
                          `}
                        >
                          {placedLetter || '?'}
                          {/* Victorian decorative corner */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                        </button>
                      );
                    }
                    
                    return (
                      <div
                        key={letterIndex}
                        className={`
                          relative w-16 h-16 rounded-lg border-3 flex items-center justify-center text-2xl font-bold gothic-title
                          ${isCompleted 
                            ? 'bg-green-700/60 border-green-600/60 text-green-200 shadow-deep-gothic' 
                            : 'ornate-frame bg-amber-800/50 border-amber-600/60 text-amber-200'
                          }
                        `}
                      >
                        {letter}
                        {/* Victorian decorative corner */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                      </div>
                    );
                  })}
                </div>

                {/* Victorian completion indicator */}
                {isCompleted && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-700/40 border border-green-600/50 rounded-lg">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-green-200 gothic-text font-medium">
                        Added to the Mystical Cauldron
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Victorian Alchemical Symbol Library */}
      <div className="ornate-frame bg-gradient-to-br from-amber-950/30 to-amber-900/15 p-8">
        <div className="text-center mb-8">
          <h4 className="text-2xl gothic-script text-amber-200 mb-4 candlelight-glow">
            Ancient Symbol Repository
          </h4>
          <p className="text-amber-300/80 gothic-text">
            Select alchemical symbols and place them in the missing formulae positions
          </p>
        </div>
        
        <div className="flex justify-center gap-4 flex-wrap">
          {availableLetters.map((letter, index) => {
            const letterKey = `${letter}-${index}`;
            const isSelected = selectedLetter === letterKey;
            const isAvailable = isLetterAvailable(letter);
            
            return (
              <button
                key={letterKey}
                onClick={() => handleLetterClick(letter, index)}
                disabled={!isAvailable}
                className={`
                  relative w-18 h-18 rounded-lg border-3 flex items-center justify-center text-2xl font-bold gothic-title
                  transition-all duration-300 transform shadow-deep-gothic
                  ${isSelected 
                    ? 'bg-amber-500/80 border-amber-400 text-white scale-110 candlelight-glow' 
                    : isAvailable
                      ? 'ornate-frame bg-amber-800/50 border-amber-600/60 text-amber-200 hover:bg-amber-700/60 hover:scale-105 hover:border-amber-500/80'
                      : 'bg-gray-800/50 border-gray-600/60 text-gray-500/70 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {letter}
                {/* Victorian decorative elements */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
              </button>
            );
          })}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-amber-400/80 gothic-text italic">
            Click a mystical symbol, then place it within the incomplete formulae above
          </p>
        </div>
      </div>

      {/* Victorian Alchemical Success Notification */}
      {feedback && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className={`
            ornate-frame p-10 text-center transition-all duration-500 transform scale-105
            ${feedback.isCorrect 
              ? 'bg-green-800/95 border-green-600/60' 
              : 'bg-red-800/95 border-red-600/60'
            }
          `}>
            {feedback.isCorrect ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Check className="w-10 h-10 text-green-400 candlelight-glow" />
                  <Beaker className="w-10 h-10 text-green-400 candlelight-glow" />
                </div>
                <h3 className="text-3xl gothic-title text-green-200 candlelight-glow">
                  Alchemical Success!
                </h3>
                <p className="text-green-300 gothic-text text-xl">
                  The essence of <strong>"{feedback.ingredient}"</strong> has been successfully transmuted 
                  and added to the mystical cauldron!
                </p>
                <div className="flex items-center justify-center gap-2 text-green-400/80">
                  <Sparkles className="w-5 h-5" />
                  <span className="gothic-text">The elixir grows stronger...</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <X className="w-10 h-10 text-red-400" />
                  <Beaker className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-3xl gothic-title text-red-200">
                  Alchemical Disruption
                </h3>
                <p className="text-red-300 gothic-text text-xl">
                  The mystical energies resist your current formulation... 
                  Review the ancient symbols and try once more...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
