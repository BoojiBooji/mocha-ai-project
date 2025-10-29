import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Check, Crown, Skull, BookOpen } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import { usePuzzle, useUserProgress } from '@/react-app/hooks/useApi';
import { useScrambleGame } from '@/react-app/hooks/useScrambleGame';
import { usePotionGame } from '@/react-app/hooks/usePotionGame';
import { useSpiritGame } from '@/react-app/hooks/useSpiritGame';
import WordScramble from '@/react-app/components/WordScramble';
import PotionRecipe from '@/react-app/components/PotionRecipe';
import SpiritEchoes from '@/react-app/components/SpiritEchoes';
import WordProgress from '@/react-app/components/WordProgress';
import StoryIntro from '@/react-app/components/StoryIntro';

export default function Game() {
  const { stage } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const stageNumber = parseInt(stage || '1');
  const [showStory, setShowStory] = useState(true);
  const [storyShown, setStoryShown] = useState(false);
  
  const { puzzle, loading, error } = usePuzzle(stageNumber);
  const { saveProgress } = useUserProgress();
  
  // Initialize the appropriate game hook based on stage
  const scrambleGame = useScrambleGame(stageNumber === 1 ? puzzle : null);
  const potionGame = usePotionGame(stageNumber === 2 ? puzzle : null);
  const spiritGame = useSpiritGame(stageNumber === 3 ? puzzle : null);
  
  // Get the active game state and handlers
  const getGameState = () => {
    switch (stageNumber) {
      case 1: return scrambleGame.gameState;
      case 2: return potionGame.gameState;
      case 3: return spiritGame.gameState;
      default: return scrambleGame.gameState;
    }
  };
  
  const resetGame = () => {
    switch (stageNumber) {
      case 1: scrambleGame.resetGame(); break;
      case 2: potionGame.resetGame(); break;
      case 3: spiritGame.resetGame(); break;
    }
  };
  
  const gameState = getGameState();

  useEffect(() => {
    if (gameState.isCompleted && user) {
      // Save progress when stage is completed
      const completedPuzzles = [puzzle?.id.toString() || ''];
      saveProgress(stageNumber, completedPuzzles, gameState, true);
    }
  }, [gameState.isCompleted, user, stageNumber, puzzle?.id, saveProgress, gameState]);

  // Reset story when stage changes
  useEffect(() => {
    setShowStory(true);
    setStoryShown(false);
  }, [stageNumber]);

  const handleStoryComplete = () => {
    setShowStory(false);
    setStoryShown(true);
  };

  const handleSkipStory = () => {
    setShowStory(false);
    setStoryShown(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen victorian-bg flex items-center justify-center">
        <div className="text-center ornate-frame p-12">
          <div className="animate-spin w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-6 candlelight-glow"></div>
          <p className="text-amber-200 gothic-text text-xl">Loading the Ancient Tome...</p>
          <p className="text-amber-400/80 gothic-text text-sm mt-2">Deciphering mystical inscriptions</p>
        </div>
      </div>
    );
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen victorian-bg flex items-center justify-center">
        <div className="text-center ornate-frame p-12">
          <Skull className="w-16 h-16 text-amber-600/70 mx-auto mb-6 candlelight-glow" />
          <p className="text-amber-300 mb-6 gothic-text text-xl">The Ancient Tome Remains Sealed</p>
          <button
            onClick={() => navigate('/')}
            className="victorian-btn px-8 py-4 text-amber-100 font-bold gothic-text"
          >
            Return to the Manor
          </button>
        </div>
      </div>
    );
  }

  const getCompletionPercentage = () => {
    switch (stageNumber) {
      case 1: 
        return Math.round((scrambleGame.gameState.solvedWords.length / scrambleGame.gameState.correctWords.length) * 100);
      case 2:
        return Math.round((potionGame.gameState.completedIngredients.length / potionGame.gameState.ingredients.length) * 100);
      case 3:
        return Math.round((spiritGame.gameState.matchedPairs.length / spiritGame.gameState.correctPairs.length) * 100);
      default:
        return 0;
    }
  };
  
  const completionPercentage = getCompletionPercentage();

  // Show story intro if not yet shown and puzzle is loaded
  if (showStory && puzzle && !storyShown) {
    return (
      <StoryIntro 
        stage={stageNumber} 
        onContinue={handleStoryComplete}
        onSkip={handleSkipStory}
      />
    );
  }

  return (
    <div className="min-h-screen victorian-bg p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Gothic Victorian Header */}
        <div className="ornate-frame bg-gradient-to-r from-amber-950/80 to-amber-900/60 p-8 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="victorian-btn px-6 py-3 text-amber-100 font-semibold gothic-text flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Manor
            </button>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-amber-400 candlelight-glow" />
                <h1 className="text-4xl gothic-title text-amber-100 candlelight-glow">
                  {puzzle.title}
                </h1>
                <BookOpen className="w-8 h-8 text-amber-400 candlelight-glow" />
              </div>
              <p className="text-amber-300/90 gothic-text text-lg italic leading-relaxed max-w-2xl">
                {puzzle.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-amber-400/70">
                <Crown className="w-4 h-4" />
                <span className="text-sm gothic-casual">Chapter {stageNumber} of Lady Layla's Escape</span>
                <Crown className="w-4 h-4" />
              </div>
            </div>

            <button
              onClick={resetGame}
              className="victorian-btn px-6 py-3 text-amber-100 font-semibold gothic-text flex items-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Chapter
            </button>
          </div>
        </div>

        {/* Victorian Progress Scroll */}
        <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl gothic-script text-amber-200 candlelight-glow">Quest Progress</h3>
            <span className="text-2xl text-amber-100 font-bold gothic-title">{completionPercentage}%</span>
          </div>
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
        </div>

        {/* Main Game Content with Victorian Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Primary Game Area - Takes 3 columns */}
          <div className="lg:col-span-3">
            {stageNumber === 1 && (
              <WordScramble
                scrambledWords={scrambleGame.gameState.scrambledWords}
                correctWords={scrambleGame.gameState.correctWords}
                solvedWords={scrambleGame.gameState.solvedWords}
                onWordSolved={scrambleGame.handleWordSolved}
              />
            )}
            
            {stageNumber === 2 && (
              <PotionRecipe
                ingredients={potionGame.gameState.ingredients}
                availableLetters={potionGame.gameState.availableLetters}
                completedIngredients={potionGame.gameState.completedIngredients}
                onIngredientComplete={potionGame.handleIngredientComplete}
              />
            )}
            
            {stageNumber === 3 && (
              <SpiritEchoes
                shadowWords={spiritGame.gameState.shadowWords}
                spiritWords={spiritGame.gameState.spiritWords}
                correctPairs={spiritGame.gameState.correctPairs}
                matchedPairs={spiritGame.gameState.matchedPairs}
                onPairMatched={spiritGame.handlePairMatched}
              />
            )}
          </div>

          {/* Victorian Progress Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {stageNumber === 1 && (
              <WordProgress
                correctWords={scrambleGame.gameState.correctWords}
                solvedWords={scrambleGame.gameState.solvedWords}
              />
            )}
            
            {stageNumber === 2 && (
              <div className="ornate-frame bg-gradient-to-br from-amber-950/40 to-amber-900/20 p-6">
                <h3 className="text-xl gothic-script text-amber-200 mb-6 candlelight-glow text-center">
                  Alchemical Progress
                </h3>
                <div className="space-y-4">
                  {potionGame.gameState.ingredients.map((ingredient, index) => {
                    const isCompleted = potionGame.gameState.completedIngredients.includes(ingredient.word);
                    return (
                      <div
                        key={ingredient.word}
                        className={`
                          ornate-border p-4 rounded-lg transition-all duration-500
                          ${isCompleted 
                            ? 'bg-green-800/40 border-green-600/50 text-green-200' 
                            : 'bg-amber-900/30 border-amber-700/40 text-amber-200'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold gothic-text">Ingredient {index + 1}</p>
                            <p className="text-sm opacity-80">{ingredient.word}</p>
                          </div>
                          {isCompleted && (
                            <Check className="w-6 h-6 text-green-400 candlelight-glow" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {stageNumber === 3 && (
              <div className="ornate-frame bg-gradient-to-br from-purple-950/40 to-violet-900/20 p-6">
                <h3 className="text-xl gothic-script text-purple-200 mb-6 candlelight-glow text-center">
                  Spectral Bonds
                </h3>
                <div className="space-y-4">
                  {spiritGame.gameState.correctPairs.map((pair, index) => {
                    const isMatched = spiritGame.gameState.matchedPairs.some(
                      matched => matched.shadow === pair.shadow && matched.spirit === pair.spirit
                    );
                    return (
                      <div
                        key={`${pair.shadow}-${pair.spirit}`}
                        className={`
                          ornate-border p-4 rounded-lg transition-all duration-500
                          ${isMatched 
                            ? 'bg-green-800/40 border-green-600/50 text-green-200' 
                            : 'bg-purple-900/30 border-purple-700/40 text-purple-200'
                          }
                        `}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm gothic-text font-medium">Bond {index + 1}</p>
                            {isMatched && (
                              <Check className="w-5 h-5 text-green-400 candlelight-glow" />
                            )}
                          </div>
                          <div className="text-xs gothic-text">
                            <p className="text-gray-400">Shadow: {pair.shadow}</p>
                            <p className="text-purple-300">Spirit: {pair.spirit}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Victorian Completion Modal */}
        {gameState.isCompleted && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
            <div className="ornate-frame bg-gradient-to-br from-amber-950/95 to-amber-900/90 p-12 text-center max-w-2xl mx-4 shadow-deep-gothic">
              <div className="mb-10">
                {/* Triumphant Layla with Victorian frame */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-amber-600/40 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative ornate-frame p-4 bg-gradient-to-br from-amber-900/80 to-amber-950/80">
                    <img
                      src="https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-triumph.png"
                      alt="Lady Layla Triumphant"
                      className="w-32 h-32 mx-auto rounded-full pixelated bg-amber-800/20 p-3"
                    />
                    <Crown className="absolute -top-2 -right-2 w-8 h-8 text-amber-400 candlelight-glow" />
                  </div>
                </div>
                
                <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-6 candlelight-glow" />
                <h2 className="text-4xl gothic-title text-amber-100 mb-6 candlelight-glow">
                  Chapter Complete!
                </h2>
                <div className="ornate-frame p-6 bg-gradient-to-br from-amber-900/60 to-amber-950/40 mb-6">
                  <p className="text-amber-200 gothic-text text-lg leading-relaxed">
                    {stageNumber === 1 && `Lady Layla has successfully deciphered all ${scrambleGame.gameState.correctWords.length} mystical scrolls, breaking the manor's ancient word curse that bound her to these halls!`}
                    {stageNumber === 2 && `The alchemical elixir is complete! Lady Layla has masterfully brewed all ${potionGame.gameState.ingredients.length} rare ingredients, and the cemetery path now glows with ethereal Victorian light.`}
                    {stageNumber === 3 && `The spectral portal resonates with supernatural power! Lady Layla has united all ${spiritGame.gameState.correctPairs.length} spirit echoes, and the gateway to her Victorian home opens majestically before her...`}
                  </p>
                </div>
                
                {stageNumber === 3 && (
                  <div className="ornate-frame p-6 bg-gradient-to-r from-purple-950/60 to-violet-900/40 mb-8">
                    <p className="text-purple-100 text-xl gothic-text italic leading-relaxed">
                      "As the portal's golden light envelops my form, I feel the familiar warmth of my beloved Victorian manor calling me home. 
                      My whiskers twitch with profound joy - I have finally conquered the dark enchantments and found my way back to where I truly belong. 
                      The shadows of this cursed realm fade away as I step gracefully through to the safety of my own hearth..."
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-6">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 victorian-btn px-8 py-4 text-amber-100 font-bold gothic-text text-lg"
                >
                  Return to Manor
                </button>
                {stageNumber < 3 && (
                  <button
                    onClick={() => navigate(`/game/${stageNumber + 1}`)}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg hover:from-amber-700 hover:to-amber-600 transition-colors flex items-center justify-center gap-3 border-2 border-amber-500/50 shadow-deep-gothic font-bold gothic-text text-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Next Chapter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Decorative Victorian Elements */}
        <div className="fixed top-1/4 left-4 text-amber-800/20 text-6xl gothic-script pointer-events-none candlelight-glow">
          ❦
        </div>
        <div className="fixed bottom-1/4 right-4 text-amber-800/20 text-6xl gothic-script pointer-events-none candlelight-glow">
          ❦
        </div>
      </div>
    </div>
  );
}
