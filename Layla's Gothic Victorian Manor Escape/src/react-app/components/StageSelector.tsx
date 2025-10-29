import { Lock, Star, Play, Crown, Skull, Ghost, Scroll } from 'lucide-react';

interface StageSelectorProps {
  currentStage: number;
  completedStages: number[];
  onStageSelect: (stage: number) => void;
}

const stageData = [
  { 
    stage: 1, 
    title: 'The Cursed Manor', 
    description: 'Decipher the ancient word scrolls within the haunted chambers',
    color: 'from-amber-900 via-amber-800 to-amber-900',
    icon: Scroll,
    subtitle: 'The Library of Lost Words'
  },
  { 
    stage: 2, 
    title: 'The Victorian Cemetery', 
    description: 'Brew mystical potions among the weathered tombstones',
    color: 'from-green-900 via-slate-800 to-green-900',
    icon: Ghost,
    subtitle: 'The Alchemist\'s Graveyard'
  },
  { 
    stage: 3, 
    title: 'The Spirit Portal', 
    description: 'Unite shadow words with their ethereal counterparts',
    color: 'from-purple-900 via-violet-800 to-purple-900',
    icon: Crown,
    subtitle: 'The Gateway to Freedom'
  },
];

export default function StageSelector({ currentStage, completedStages, onStageSelect }: StageSelectorProps) {
  return (
    <div className="min-h-screen victorian-bg p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Victorian Chapter Selection Header */}
        <div className="text-center mb-16">
          <div className="ornate-frame p-12 bg-gradient-to-br from-amber-950/40 to-amber-900/20 scroll-appear">
            <h1 className="text-6xl gothic-title text-amber-100 candlelight-glow mb-6">
              Choose Your Dark Journey
            </h1>
            <div className="flex items-center justify-center gap-6 mb-6">
              <img
                src="https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-cat-witch.png"
                alt="Lady Layla of the Manor"
                className="w-20 h-20 rounded-full ornate-frame p-2 pixelated"
              />
              <div className="text-left">
                <p className="text-2xl gothic-script text-amber-200 candlelight-glow">Lady Layla's Plight</p>
                <p className="text-lg text-amber-300/90 gothic-text italic">A feline mistress of the mystical arts, trapped within cursed Victorian halls</p>
              </div>
            </div>
            <p className="text-xl text-amber-300/90 gothic-text leading-relaxed max-w-3xl mx-auto">
              Navigate through the shadowed chambers of an ancient manor, where word puzzles guard the secrets of escape. 
              Each stage unveils new mysteries in this tale of supernatural deliverance.
            </p>
          </div>
        </div>

        {/* Victorian Chapter Selection Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {stageData.map(({ stage, title, description, color, icon: Icon, subtitle }) => {
            const isCompleted = completedStages.includes(stage);
            const isUnlocked = stage === 1 || completedStages.includes(stage - 1);
            const isCurrent = stage === currentStage;

            return (
              <div
                key={stage}
                className={`
                  relative overflow-hidden transition-all duration-500 transform
                  ${isUnlocked 
                    ? 'cursor-pointer hover:scale-105 hover:shadow-deep-gothic' 
                    : 'cursor-not-allowed opacity-70'
                  }
                  ${isCurrent ? 'ring-4 ring-amber-400/60 shadow-deep-gothic' : ''}
                `}
                onClick={() => isUnlocked && onStageSelect(stage)}
              >
                {/* Victorian Card Frame */}
                <div className={`ornate-frame bg-gradient-to-br ${color} h-80 relative`}>
                  
                  {/* Lock Overlay for Locked Stages */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                      <div className="text-center space-y-4">
                        <Lock className="w-16 h-16 text-amber-600/70 mx-auto candlelight-glow" />
                        <p className="text-amber-300/80 gothic-text text-lg">Sealed by Ancient Magic</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="p-8 h-full flex flex-col justify-between relative">
                    
                    {/* Chapter Header */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-8 h-8 text-amber-300 candlelight-glow" />
                          <span className="text-amber-200/90 gothic-casual text-lg">Chapter {stage}</span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-2">
                            <Star className="w-6 h-6 text-amber-400 fill-current candlelight-glow" />
                            <Crown className="w-5 h-5 text-amber-400 candlelight-glow" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl gothic-title text-amber-100 mb-2 candlelight-glow">{title}</h3>
                      <p className="text-sm text-amber-300/80 gothic-script italic mb-4">{subtitle}</p>
                      <p className="text-amber-200/90 gothic-text text-sm leading-relaxed">{description}</p>
                    </div>

                    {/* Action Area */}
                    {isUnlocked && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-amber-200/90">
                          <Play className="w-5 h-5" />
                          <span className="gothic-text font-medium">
                            {isCompleted ? 'Revisit This Tale' : isCurrent ? 'Continue Quest' : 'Begin Chapter'}
                          </span>
                        </div>
                        
                        {/* Victorian-style progress indicator */}
                        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              isCompleted 
                                ? 'w-full bg-gradient-to-r from-amber-400 to-amber-600' 
                                : isCurrent 
                                  ? 'w-1/3 bg-gradient-to-r from-amber-600 to-amber-800 animate-pulse' 
                                  : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Victorian Decorative Corner Elements */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-3 border-t-3 border-amber-400/60"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-3 border-t-3 border-amber-400/60"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-3 border-b-3 border-amber-400/60"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-3 border-b-3 border-amber-400/60"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Victorian Progress Summary */}
        <div className="text-center">
          <div className="ornate-frame p-8 bg-gradient-to-br from-amber-950/30 to-amber-900/20 max-w-md mx-auto">
            <h4 className="text-xl gothic-script text-amber-200 mb-4 candlelight-glow">
              Manor Escape Progress
            </h4>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-amber-300 gothic-text">Journey Status:</span>
              <div className="flex gap-3">
                {[1, 2, 3].map((stage) => (
                  <div
                    key={stage}
                    className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      completedStages.includes(stage) 
                        ? 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-500/50 candlelight-glow' 
                        : stage === currentStage 
                          ? 'bg-amber-600 border-amber-500 animate-pulse' 
                          : 'bg-transparent border-amber-700/50'
                    }`}
                  >
                    {completedStages.includes(stage) && (
                      <Star className="w-3 h-3 text-amber-900 absolute top-0.5 left-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-amber-300/80 gothic-text">
              {completedStages.length === 0 && "The journey awaits, brave soul..."}
              {completedStages.length === 1 && "First chamber conquered! The path grows clearer..."}
              {completedStages.length === 2 && "Nearing freedom! One final trial remains..."}
              {completedStages.length === 3 && "Victory! Lady Layla has escaped the cursed manor!"}
            </p>
          </div>
        </div>

        {/* Gothic Decorative Elements */}
        <div className="fixed top-1/3 left-8 text-amber-800/20 text-8xl gothic-script pointer-events-none candlelight-glow">
          ❦
        </div>
        <div className="fixed bottom-1/3 right-12 text-amber-800/20 text-8xl gothic-script pointer-events-none candlelight-glow">
          ❦
        </div>
        <div className="fixed top-1/2 right-4 text-amber-800/20 text-4xl gothic-script pointer-events-none candlelight-glow">
          <Skull className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
}
