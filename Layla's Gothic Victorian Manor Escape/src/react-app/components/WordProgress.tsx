import { CheckCircle2, Circle, Sparkles, Scroll, Feather, Crown } from 'lucide-react';

interface WordProgressProps {
  correctWords: string[];
  solvedWords: string[];
}

export default function WordProgress({ correctWords, solvedWords }: WordProgressProps) {
  const completionPercentage = Math.round((solvedWords.length / correctWords.length) * 100);

  return (
    <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-6">
      
      {/* Victorian Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Feather className="w-6 h-6 text-amber-400 candlelight-glow" />
          <h3 className="text-xl gothic-script text-amber-200 candlelight-glow">
            Mystical Manuscript Progress
          </h3>
          <Feather className="w-6 h-6 text-amber-400 candlelight-glow" />
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
      </div>

      {/* Victorian Word Entries */}
      <div className="space-y-4">
        {correctWords.map((word, index) => {
          const isSolved = solvedWords.includes(word);
          return (
            <div
              key={word}
              className={`
                ornate-border p-4 rounded-lg transition-all duration-500 transform
                ${isSolved 
                  ? 'bg-green-800/40 border-green-600/50 text-green-200 scale-105' 
                  : 'bg-amber-950/30 border-amber-700/40 text-amber-200'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Victorian Status Icon */}
                <div className={`
                  relative flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${isSolved 
                    ? 'bg-green-700/50 border-green-500/70' 
                    : 'bg-amber-900/50 border-amber-700/70'
                  }
                `}>
                  {isSolved ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 candlelight-glow" />
                  ) : (
                    <Circle className="w-6 h-6 text-amber-400" />
                  )}
                  {/* Victorian decorative corner */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rotate-45 border border-amber-500"></div>
                </div>
                
                <div className="flex-1">
                  {/* Word Display */}
                  <div className="flex items-center gap-3 mb-2">
                    <Scroll className="w-5 h-5 text-amber-400/70" />
                    <span className={`font-bold gothic-text text-lg ${isSolved ? 'line-through opacity-75' : ''}`}>
                      {isSolved ? word : '???'}
                    </span>
                    {isSolved && <Crown className="w-5 h-5 text-green-400 candlelight-glow" />}
                  </div>
                  
                  {/* Victorian Word Details */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-amber-400/80 gothic-text">
                        Manuscript {index + 1}
                      </span>
                      <span className="text-amber-400/80 gothic-text">
                        {word.length} ancient symbols
                      </span>
                    </div>
                    
                    {isSolved && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-700/40 border border-green-600/50 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-300 gothic-text font-medium">
                          Deciphered
                        </span>
                      </div>
                    )}
                  </div>
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
            Decryption Progress
          </h4>
          
          <div className="flex justify-between items-center text-amber-300 gothic-text">
            <span>Manuscripts Solved:</span>
            <span className="font-bold text-xl">{solvedWords.length} / {correctWords.length}</span>
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
              {completionPercentage === 0 && "Begin deciphering the ancient texts..."}
              {completionPercentage > 0 && completionPercentage < 50 && "The mysteries begin to unfold..."}
              {completionPercentage >= 50 && completionPercentage < 100 && "The path grows clearer..."}
              {completionPercentage === 100 && "All manuscripts have been deciphered!"}
            </p>
          </div>
        </div>
      </div>

      {/* Victorian Completion Celebration */}
      {completionPercentage === 100 && (
        <div className="mt-6 text-center ornate-frame bg-green-800/40 border-green-600/50 p-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
            <Sparkles className="w-6 h-6 text-amber-400 candlelight-glow" />
            <Crown className="w-6 h-6 text-amber-400 candlelight-glow" />
          </div>
          <p className="text-green-200 gothic-text font-bold">
            All ancient manuscripts have been successfully deciphered!
          </p>
        </div>
      )}
    </div>
  );
}
