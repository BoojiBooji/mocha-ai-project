import { useState, useCallback, useEffect } from 'react';
import { Shuffle, Check, X, Sparkles, Scroll, Feather } from 'lucide-react';

interface WordScrambleProps {
  scrambledWords: string[];
  correctWords: string[];
  solvedWords: string[];
  onWordSolved: (word: string) => void;
}

export default function WordScramble({ scrambledWords, correctWords, solvedWords, onWordSolved }: WordScrambleProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentScrambledWord = scrambledWords[currentWordIndex];
  const currentCorrectWord = correctWords[currentWordIndex];
  
  // Auto-advance to next unsolved word
  useEffect(() => {
    const nextUnsolvedIndex = scrambledWords.findIndex((_, index) => 
      !solvedWords.includes(correctWords[index])
    );
    
    if (nextUnsolvedIndex !== -1 && nextUnsolvedIndex !== currentWordIndex) {
      setCurrentWordIndex(nextUnsolvedIndex);
      setUserInput('');
      setIsCorrect(null);
      setShowFeedback(false);
    }
  }, [solvedWords, scrambledWords, correctWords, currentWordIndex]);

  const handleSubmit = useCallback(() => {
    const isWordCorrect = userInput.toUpperCase() === currentCorrectWord.toUpperCase();
    setIsCorrect(isWordCorrect);
    setShowFeedback(true);

    if (isWordCorrect) {
      onWordSolved(currentCorrectWord);
      setTimeout(() => {
        setUserInput('');
        setIsCorrect(null);
        setShowFeedback(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsCorrect(null);
        setShowFeedback(false);
      }, 2000);
    }
  }, [userInput, currentCorrectWord, onWordSolved]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length > 0) {
      handleSubmit();
    }
  };

  const handleShuffle = () => {
    // Provide visual feedback for shuffle action
    setTimeout(() => {
      setUserInput('');
    }, 300);
  };

  const handleWordSelect = (index: number) => {
    setCurrentWordIndex(index);
    setUserInput('');
    setIsCorrect(null);
    setShowFeedback(false);
  };

  const isSolved = solvedWords.includes(currentCorrectWord);

  return (
    <div className="space-y-8">
      
      {/* Victorian Manuscript Selection */}
      <div className="ornate-frame bg-gradient-to-br from-amber-950/30 to-amber-900/20 p-6">
        <h3 className="text-center text-xl gothic-script text-amber-200 mb-6 candlelight-glow">
          Ancient Manuscript Collection
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {scrambledWords.map((_, index) => {
            const wordSolved = solvedWords.includes(correctWords[index]);
            const isActive = index === currentWordIndex;
            
            return (
              <button
                key={index}
                onClick={() => handleWordSelect(index)}
                disabled={wordSolved}
                className={`
                  px-6 py-3 rounded-lg text-sm font-semibold gothic-text transition-all duration-300 flex items-center gap-2
                  ${wordSolved 
                    ? 'bg-green-800/40 text-green-200 border-2 border-green-600/50 opacity-75' 
                    : isActive 
                      ? 'victorian-btn text-amber-100 border-2 border-amber-500 shadow-deep-gothic transform scale-105' 
                      : 'bg-amber-900/40 text-amber-200 border-2 border-amber-700/40 hover:bg-amber-800/50 hover:border-amber-600/60'
                  }
                `}
              >
                <Scroll className="w-4 h-4" />
                Scroll {index + 1}
                {wordSolved && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Victorian Manuscript Area */}
      <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-10">
        <div className="text-center space-y-8">
          
          {/* Illuminated Manuscript Header */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Feather className="w-8 h-8 text-amber-400 candlelight-glow" />
              <h3 className="text-3xl gothic-title text-amber-100 candlelight-glow">
                Enchanted Manuscript #{currentWordIndex + 1}
              </h3>
              <Feather className="w-8 h-8 text-amber-400 candlelight-glow" />
            </div>
            <p className="text-amber-300/90 gothic-text text-lg italic">
              Decipher the scrambled Victorian incantation
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Victorian Letter Display */}
          <div className="relative">
            <div className="flex justify-center gap-4 mb-8">
              {currentScrambledWord.split('').map((letter, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <div className="w-16 h-16 ornate-frame bg-gradient-to-br from-amber-800/60 to-amber-900/40 flex items-center justify-center shadow-deep-gothic">
                    <span className="text-2xl font-bold text-amber-100 gothic-title">{letter}</span>
                  </div>
                  {/* Victorian decorative flourish */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-600 rotate-45 border border-amber-500"></div>
                </div>
              ))}
            </div>

            {/* Victorian Shuffle Mechanism */}
            <button
              onClick={handleShuffle}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 victorian-btn p-3 text-amber-100 font-medium gothic-text flex items-center gap-2"
              title="Shuffle the mystical letters"
            >
              <Shuffle className="w-5 h-5" />
              Rearrange
            </button>
          </div>

          {/* Victorian Input Manuscript */}
          {!isSolved && (
            <div className="space-y-6">
              <div className="relative max-w-md mx-auto">
                <div className="ornate-frame bg-gradient-to-br from-amber-900/60 to-amber-950/40 p-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="Inscribe your answer..."
                    className="w-full px-6 py-4 bg-transparent border-none text-amber-100 placeholder-amber-400/60 text-center text-xl font-bold gothic-text focus:outline-none"
                    maxLength={currentCorrectWord.length}
                    disabled={showFeedback}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={userInput.length === 0 || showFeedback}
                className="victorian-btn px-10 py-4 text-amber-100 font-bold gothic-text text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Cast Incantation
              </button>
            </div>
          )}

          {/* Victorian Feedback Scroll */}
          {showFeedback && (
            <div className={`
              ornate-frame p-6 transition-all duration-500 transform scale-105
              ${isCorrect 
                ? 'bg-green-800/40 border-green-600/50' 
                : 'bg-red-800/40 border-red-600/50'
              }
            `}>
              <div className="flex items-center justify-center gap-3">
                {isCorrect ? (
                  <>
                    <Check className="w-6 h-6 text-green-400 candlelight-glow" />
                    <span className="font-bold text-green-200 gothic-text text-lg">
                      Magnificent! The ancient words obey your command!
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-6 h-6 text-red-400" />
                    <span className="font-bold text-red-200 gothic-text text-lg">
                      The mystical energies resist... Try once more...
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Already Solved Manuscript */}
          {isSolved && (
            <div className="ornate-frame bg-green-800/40 border-green-600/50 p-6">
              <div className="flex items-center justify-center gap-3">
                <Check className="w-6 h-6 text-green-400 candlelight-glow" />
                <span className="font-bold text-green-200 gothic-text text-lg">
                  Manuscript Deciphered: "{currentCorrectWord}"
                </span>
                <Scroll className="w-6 h-6 text-green-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Victorian Scholar's Hint */}
      <div className="text-center ornate-frame bg-gradient-to-br from-amber-950/20 to-amber-900/10 p-4">
        <p className="text-amber-300/80 gothic-text">
          <span className="gothic-script text-amber-200">Scholar's Insight:</span> 
          This ancient word contains precisely {currentCorrectWord.length} mystical letters
        </p>
      </div>
    </div>
  );
}
