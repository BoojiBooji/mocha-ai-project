import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { LogIn, LogOut, User, Loader2, Crown, Skull } from 'lucide-react';
import { useUserProgress } from '@/react-app/hooks/useApi';
import StageSelector from '@/react-app/components/StageSelector';

export default function Home() {
  const navigate = useNavigate();
  const { user, isPending, redirectToLogin, logout } = useAuth();
  const { progress, fetchProgress } = useUserProgress();
  const [currentStage, setCurrentStage] = useState(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user, fetchProgress]);

  useEffect(() => {
    const completed = progress
      .filter(p => p.is_completed)
      .map(p => p.stage);
    
    setCompletedStages(completed);
    
    // Set current stage to the first incomplete stage or stage 1
    const nextStage = [1, 2, 3].find(stage => !completed.includes(stage)) || 3;
    setCurrentStage(nextStage);
  }, [progress]);

  const handleStageSelect = (stage: number) => {
    navigate(`/game/${stage}`);
  };

  if (isPending) {
    return (
      <div className="min-h-screen victorian-bg flex items-center justify-center">
        <div className="text-center ornate-frame p-8">
          <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4 candlelight-glow" />
          <p className="text-amber-200 gothic-text text-lg">Loading the Manor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen victorian-bg">
      {/* Ornate Victorian Header */}
      <div className="relative">
        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-60"></div>
        
        <div className="flex justify-between items-center p-8 border-b-2 border-amber-800/50">
          <div className="flex items-center gap-6">
            {/* Victorian Portrait Frame */}
            <div className="relative">
              <div className="absolute inset-0 bg-amber-600/30 rounded-full blur-md animate-pulse"></div>
              <div className="relative ornate-frame p-2 bg-gradient-to-br from-amber-900/80 to-amber-950/80">
                <img
                  src="https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-happy.png"
                  alt="Lady Layla"
                  className="w-16 h-16 rounded-full pixelated"
                />
                <Crown className="absolute -top-1 -right-1 w-6 h-6 text-amber-400 candlelight-glow" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl gothic-title text-amber-100 candlelight-glow">
                Layla's Gothic Victorian Manor Escape
              </h1>
              <p className="text-lg text-amber-300/90 gothic-text italic gothic-ornament">
                A Dark Victorian Tale of Mystical Word Puzzles
              </p>
              <div className="flex items-center gap-2 text-amber-400/70">
                <Skull className="w-4 h-4" />
                <span className="text-sm gothic-casual">Est. 1847 • Haunted since Forever</span>
                <Skull className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Victorian User Panel */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="ornate-frame p-4 bg-gradient-to-br from-amber-900/60 to-amber-950/60">
                  <div className="flex items-center gap-3 text-amber-200">
                    <User className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-sm gothic-text font-semibold">Guest of Honor</p>
                      <p className="text-xs text-amber-300/80">{user.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="victorian-btn px-6 py-3 text-amber-100 font-semibold gothic-text flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Depart Manor
                </button>
              </>
            ) : (
              <button
                onClick={redirectToLogin}
                className="victorian-btn px-8 py-4 text-amber-100 font-bold gothic-text flex items-center gap-3 text-lg"
              >
                <LogIn className="w-5 h-5" />
                Enter the Manor
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gothic Welcome Section */}
      <div className="relative px-8 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="ornate-frame p-8 bg-gradient-to-br from-amber-950/30 to-amber-900/20 scroll-appear">
            <h2 className="text-2xl gothic-script text-amber-200 mb-4 candlelight-glow">
              Welcome to the Cursed Manor
            </h2>
            <p className="text-lg text-amber-300/90 gothic-text leading-relaxed max-w-2xl mx-auto">
              Within these shadowed halls lie mystical word puzzles that bind poor Layla to this realm. 
              Only by solving the ancient riddles can she escape the manor's dark enchantment and return home.
            </p>
          </div>
        </div>
      </div>

      {/* Stage Selector */}
      <StageSelector
        currentStage={currentStage}
        completedStages={completedStages}
        onStageSelect={handleStageSelect}
      />

      {/* Victorian Notice for Non-Users */}
      {!user && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="ornate-frame p-6 bg-gradient-to-br from-amber-950/90 to-amber-900/80 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <h3 className="text-lg gothic-script text-amber-200 candlelight-glow">
                Manor Guest Registry
              </h3>
              <p className="text-sm text-amber-300/90 gothic-text max-w-xs">
                Sign the guest book to preserve your progress through the haunted halls 
                and compare your puzzle-solving prowess with fellow visitors!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Gothic Elements */}
      <div className="fixed top-1/4 left-4 text-amber-800/30 text-6xl gothic-script pointer-events-none candlelight-glow">
        ❦
      </div>
      <div className="fixed top-3/4 right-8 text-amber-800/30 text-6xl gothic-script pointer-events-none candlelight-glow">
        ❦
      </div>
    </div>
  );
}
