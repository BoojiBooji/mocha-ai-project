import { CheckCircle2, Circle, Crown, Scroll, Feather } from 'lucide-react';

interface WordListProps {
  wordsToFind: string[];
  foundWords: string[];
}

export default function WordList({ wordsToFind, foundWords }: WordListProps) {
  const completionPercentage = Math.round((foundWords.length / wordsToFind.length) * 100);

  return (
    <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-6">
      
      {/* Victorian Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Scroll className="w-6 h-6 text-amber-400 candlelight-glow" />
          <h3 className="text-xl gothic-script text-amber-200 candlelight-glow">
            Victorian Word Registry
          </h3>
          <Scroll className="w-6 h-6 text-amber-400 candlelight-glow" />
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
      </div>

      {/* Victorian Word Entries */}
      <div className="space-y-3">
        {wordsToFind.map((word) => {
          const isFound = foundWords.includes(word);
          return (
            <div
              key={word}
              className={`
                ornate-border p-4 rounded-lg transition-all duration-500 transform
                ${isFound 
                  ? 'bg-green-800/40 border-green-600/50 text-green-200 scale-105' 
                  : 'bg-amber-950/30 border-amber-700/40 text-amber-200'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Victorian Status Icon */}
                <div className={`
                  relative flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${isFound 
                    ? 'bg-green-700/50 border-green-500/70' 
                    : 'bg-amber-900/50 border-amber-700/70'
                  }
                `}>
                  {isFound ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 candlelight-glow" />
                  ) : (
                    <Circle className="w-6 h-6 text-amber-400" />
                  )}
                  {/* Victorian decorative corner */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                </div>
                
                <div className="flex-1 flex items-center justify-between">
                  {/* Word Display */}
                  <div className="flex items-center gap-3">
                    <Feather className="w-4 h-4 text-amber-400/70" />
                    <span className={`font-bold gothic-text text-lg ${isFound ? 'line-through opacity-75' : ''}`}>
                      {word.toUpperCase()}
                    </span>
                    {isFound && <Crown className="w-5 h-5 text-green-400 candlelight-glow" />}
                  </div>
                  
                  {/* Victorian Status Badge */}
                  {isFound && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-700/40 border border-green-600/50 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-300 gothic-text font-medium">
                        Discovered
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Victorian Progress Summary */}
      <div className="mt-6 pt-6 border-t-2 border-amber-700/40">
        <div className="text-center space-y-4">
          <h4 className="text-lg gothic-script text-amber-200 candlelight-glow">
            Discovery Progress
          </h4>
          
          <div className="flex justify-between items-center text-amber-300 gothic-text">
            <span>Words Found:</span>
            <span className="font-bold text-xl">{foundWords.length} / {wordsToFind.length}</span>
          </div>
          
          {/* Victorian Progress Bar */}
          <div className="relative">
            <div className="w-full h-4 bg-gradient-to-r from-amber-950/60 to-amber-900/40 rounded-full border-2 border-amber-800/50 shadow-inset">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000 ease-out candlelight-glow"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            {/* Victorian progress ornaments */}
            <div className="absolute -top-2 left-0 w-4 h-4 bg-amber-600 rotate-45 border-2 border-amber-500"></div>
            <div className="absolute -top-2 right-0 w-4 h-4 bg-amber-600 rotate-45 border-2 border-amber-500"></div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-amber-100 gothic-title">{completionPercentage}%</span>
            <p className="text-sm text-amber-400/80 gothic-text italic mt-1">
              {completionPercentage === 0 && "Begin your word hunting expedition..."}
              {completionPercentage > 0 && completionPercentage < 50 && "The hidden words reveal themselves..."}
              {completionPercentage >= 50 && completionPercentage < 100 && "You draw closer to completion..."}
              {completionPercentage === 100 && "All Victorian words have been discovered!"}
            </p>
          </div>
        </div>
      </div>

      {/* Victorian Completion Celebration */}
      {completionPercentage === 100 && (
        <div className="mt-6 text-center ornate-frame bg-green-800/40 border-green-600/50 p-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
            <Feather className="w-6 h-6 text-amber-400 candlelight-glow" />
            <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
          </div>
          <p className="text-green-200 gothic-text font-bold">
            Magnificent! All hidden Victorian words have been discovered!
          </p>
        </div>
      )}
    </div>
  );
}
