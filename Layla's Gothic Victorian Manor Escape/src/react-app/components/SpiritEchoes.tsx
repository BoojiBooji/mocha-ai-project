import { useState, useCallback } from 'react';
import { Check, X, Sparkles, Ghost, Skull, Crown, Eye } from 'lucide-react';

interface SpiritEchoesProps {
  shadowWords: string[];
  spiritWords: string[];
  correctPairs: Array<{ shadow: string; spirit: string }>;
  onPairMatched: (shadowWord: string, spiritWord: string) => void;
  matchedPairs: Array<{ shadow: string; spirit: string }>;
}

export default function SpiritEchoes({ 
  shadowWords, 
  spiritWords, 
  correctPairs, 
  onPairMatched, 
  matchedPairs 
}: SpiritEchoesProps) {
  const [selectedShadow, setSelectedShadow] = useState<string | null>(null);
  const [selectedSpirit, setSelectedSpirit] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; shadow: string; spirit: string } | null>(null);
  

  const handleShadowClick = (word: string) => {
    if (isWordMatched(word, 'shadow')) return;
    
    if (selectedShadow === word) {
      setSelectedShadow(null);
    } else {
      setSelectedShadow(word);
      setSelectedSpirit(null);
    }
  };

  const handleSpiritClick = (word: string) => {
    if (isWordMatched(word, 'spirit')) return;
    
    if (selectedSpirit === word) {
      setSelectedSpirit(null);
    } else {
      setSelectedSpirit(word);
      if (selectedShadow) {
        attemptMatch(selectedShadow, word);
      }
    }
  };

  const attemptMatch = useCallback((shadowWord: string, spiritWord: string) => {
    const isCorrect = correctPairs.some(pair => 
      pair.shadow === shadowWord && pair.spirit === spiritWord
    );

    setFeedback({ isCorrect, shadow: shadowWord, spirit: spiritWord });

    if (isCorrect) {
      onPairMatched(shadowWord, spiritWord);
      
      setTimeout(() => {
        setSelectedShadow(null);
        setSelectedSpirit(null);
        setFeedback(null);
      }, 2500);
    } else {
      setTimeout(() => {
        setSelectedShadow(null);
        setSelectedSpirit(null);
        setFeedback(null);
      }, 2000);
    }
  }, [correctPairs, onPairMatched]);

  const isWordMatched = (word: string, type: 'shadow' | 'spirit') => {
    return matchedPairs.some(pair => 
      type === 'shadow' ? pair.shadow === word : pair.spirit === word
    );
  };

  return (
    <div className="space-y-10">
      
      {/* Victorian Séance Chamber Header */}
      <div className="text-center">
        <div className="ornate-frame bg-gradient-to-br from-purple-950/50 to-violet-900/30 p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Ghost className="w-10 h-10 text-purple-400 animate-pulse candlelight-glow" />
            <h3 className="text-4xl gothic-title text-purple-100 candlelight-glow">
              Victorian Séance Chamber
            </h3>
            <Ghost className="w-10 h-10 text-purple-400 animate-pulse candlelight-glow" />
          </div>
          <p className="text-purple-300/90 gothic-text text-xl leading-relaxed">
            Unite the shadowy whispers with their ethereal spirit counterparts to open the portal
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-purple-400/70">
            <Skull className="w-5 h-5" />
            <span className="text-sm gothic-casual">Beyond the Veil • Spectral Communications</span>
            <Skull className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Victorian Supernatural Communication Board */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        {/* Shadow Realm - Left Side */}
        <div className="space-y-6">
          <div className="ornate-frame bg-gradient-to-br from-gray-900/60 to-slate-800/40 p-6">
            <h4 className="text-center text-2xl gothic-script text-gray-300 mb-6 candlelight-glow">
              <div className="flex items-center justify-center gap-3">
                <Eye className="w-6 h-6 text-gray-500 animate-pulse" />
                Whispers from the Shadow Realm
                <Eye className="w-6 h-6 text-gray-500 animate-pulse" />
              </div>
            </h4>
            
            <div className="space-y-4">
              {shadowWords.map((word) => {
                const isMatched = isWordMatched(word, 'shadow');
                const isSelected = selectedShadow === word;
                
                return (
                  <button
                    key={word}
                    onClick={() => handleShadowClick(word)}
                    disabled={isMatched}
                    className={`
                      relative w-full p-6 rounded-lg border-2 transition-all duration-500 transform
                      font-bold text-xl gothic-text overflow-hidden group
                      ${isMatched 
                        ? 'bg-green-800/40 border-green-600/60 text-green-200 opacity-75 scale-95' 
                        : isSelected
                          ? 'bg-gray-700/80 border-gray-500/80 text-white scale-105 shadow-deep-gothic candlelight-glow'
                          : 'bg-gray-900/50 border-gray-700/60 text-gray-300 hover:bg-gray-800/60 hover:border-gray-600/80 hover:scale-102 shadow-gothic'
                      }
                    `}
                  >
                    {/* Animated shadow effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent
                      transform -translate-x-full transition-transform duration-1000
                      ${!isMatched ? 'group-hover:translate-x-full' : ''}
                    `}></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span>{word}</span>
                      {isMatched && (
                        <div className="flex items-center gap-2">
                          <Check className="w-6 h-6 text-green-400 candlelight-glow" />
                          <Crown className="w-5 h-5 text-green-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Victorian corner decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gray-500/60"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gray-500/60"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gray-500/60"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gray-500/60"></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spirit Realm - Right Side */}
        <div className="space-y-6">
          <div className="ornate-frame bg-gradient-to-br from-purple-950/60 to-violet-900/40 p-6">
            <h4 className="text-center text-2xl gothic-script text-purple-200 mb-6 candlelight-glow">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                Voices from the Spirit Realm
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </h4>
            
            <div className="space-y-4">
              {spiritWords.map((word) => {
                const isMatched = isWordMatched(word, 'spirit');
                const isSelected = selectedSpirit === word;
                
                return (
                  <button
                    key={word}
                    onClick={() => handleSpiritClick(word)}
                    disabled={isMatched}
                    className={`
                      relative w-full p-6 rounded-lg border-2 transition-all duration-500 transform
                      font-bold text-xl gothic-text overflow-hidden group
                      ${isMatched 
                        ? 'bg-green-800/40 border-green-600/60 text-green-200 opacity-75 scale-95' 
                        : isSelected
                          ? 'bg-purple-600/80 border-purple-500/80 text-white scale-105 shadow-deep-gothic candlelight-glow'
                          : 'bg-purple-900/50 border-purple-700/60 text-purple-200 hover:bg-purple-800/60 hover:border-purple-600/80 hover:scale-102 shadow-gothic'
                      }
                    `}
                  >
                    {/* Animated spirit effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent
                      transform translate-x-full transition-transform duration-1000
                      ${!isMatched ? 'group-hover:-translate-x-full' : ''}
                    `}></div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span>{word}</span>
                      {isMatched && (
                        <div className="flex items-center gap-2">
                          <Check className="w-6 h-6 text-green-400 candlelight-glow" />
                          <Crown className="w-5 h-5 text-green-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Victorian corner decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-500/60"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-500/60"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-500/60"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500/60"></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Victorian Séance Instructions */}
      <div className="text-center ornate-frame bg-gradient-to-br from-purple-950/30 to-violet-900/15 p-6 max-w-3xl mx-auto">
        <h4 className="text-xl gothic-script text-purple-200 mb-4 candlelight-glow">
          Séance Ritual Instructions
        </h4>
        <p className="text-purple-300/90 gothic-text text-lg leading-relaxed">
          {selectedShadow 
            ? (
              <span>
                You have summoned the shadow: <strong>"{selectedShadow}"</strong><br/>
                Now commune with its matching spirit to forge the ethereal bond
              </span>
            ) : (
              'First commune with a whisper from the Shadow Realm, then unite it with its destined voice from the Spirit Realm'
            )
          }
        </p>
      </div>

      {/* Victorian Supernatural Progress */}
      <div className="text-center">
        <div className="ornate-frame bg-gradient-to-br from-purple-950/40 to-violet-900/20 p-6 inline-block">
          <h4 className="text-lg gothic-script text-purple-200 mb-3 candlelight-glow">
            Portal Manifestation Progress
          </h4>
          <div className="flex items-center gap-4">
            <Ghost className="w-6 h-6 text-purple-400 animate-pulse" />
            <span className="text-purple-200 gothic-text text-lg">
              {matchedPairs.length} of {correctPairs.length} spectral bonds forged
            </span>
            <Ghost className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          
          {/* Victorian progress indicator */}
          <div className="mt-4 w-64 h-3 bg-purple-950/60 rounded-full border border-purple-700/50 mx-auto">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full transition-all duration-1000 candlelight-glow"
              style={{ width: `${(matchedPairs.length / correctPairs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Victorian Supernatural Feedback Modal */}
      {feedback && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className={`
            ornate-frame p-12 text-center transition-all duration-500 transform scale-105
            ${feedback.isCorrect 
              ? 'bg-green-800/95 border-green-600/60' 
              : 'bg-red-800/95 border-red-600/60'
            }
          `}>
            {feedback.isCorrect ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Check className="w-12 h-12 text-green-400 candlelight-glow" />
                  <Ghost className="w-12 h-12 text-green-400 animate-pulse candlelight-glow" />
                </div>
                <h3 className="text-4xl gothic-title text-green-200 candlelight-glow">
                  Spectral Bond Forged!
                </h3>
                <div className="space-y-3">
                  <p className="text-green-300 gothic-text text-xl">
                    The shadow whisper <strong>"{feedback.shadow}"</strong>
                  </p>
                  <p className="text-green-300 gothic-text text-xl">
                    has been united with the spirit voice <strong>"{feedback.spirit}"</strong>
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-green-400/90">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span className="gothic-text text-lg">The portal grows stronger...</span>
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <X className="w-12 h-12 text-red-400" />
                  <Skull className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-4xl gothic-title text-red-200">
                  Spectral Dissonance
                </h3>
                <div className="space-y-3">
                  <p className="text-red-300 gothic-text text-xl">
                    The shadow <strong>"{feedback.shadow}"</strong> and spirit <strong>"{feedback.spirit}"</strong> 
                  </p>
                  <p className="text-red-300 gothic-text text-xl">
                    are not destined to be united... Try communing again...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
