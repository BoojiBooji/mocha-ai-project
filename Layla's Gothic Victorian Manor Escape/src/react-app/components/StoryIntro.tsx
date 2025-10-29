import { useState } from 'react';
import { Play, X, Scroll, BookOpen } from 'lucide-react';

interface StoryIntroProps {
  stage: number;
  onContinue: () => void;
  onSkip: () => void;
}

const storyContent = {
  1: {
    title: "The Cursed Victorian Manor",
    dialogue: [
      "Gracious me! How did I find myself trapped within the walls of this forbidding Gothic manor?",
      "I am Lady Layla, a feline practitioner of the mystical arts, and these shadowed corridors feel leagues from my warm hearth...",
      "The very stones whisper of ancient maledictions that bind this estate in perpetual midnight.",
      "Perhaps if I can decipher these cryptic Victorian manuscripts with their bewildering word puzzles, I might break the dark enchantment that holds me prisoner!"
    ],
    emotion: "worried",
    background: "from-slate-900 via-gray-900 to-amber-950",
    chapter: "Chapter I"
  },
  2: {
    title: "The Moonlit Cemetery of Souls",
    dialogue: [
      "The manor's iron grip loosens, yet now I find myself amidst the weathered headstones of a Victorian graveyard...",
      "Wrought iron gates creak in the spectral wind, and ethereal mists dance between marble angels and Gothic mausoleums.",
      "Behold! An ornate brass cauldron rests beside this moss-covered sepulcher - adorned with alchemical sigils of old!",
      "If I can concoct the proper elixir using these ancient recipe fragments, mayhap it shall illuminate the path to my deliverance."
    ],
    emotion: "determined",
    background: "from-gray-900 via-slate-900 to-green-950",
    chapter: "Chapter II"
  },
  3: {
    title: "The Portal of Victorian Spirits",
    dialogue: [
      "Through the cemetery's ethereal veils, I glimpse something wondrous - a shimmering portal wreathed in starlight and Gothic splendor!",
      "Yet phantom guardians bar my passage, their voices echoing like whispers from beyond the veil of mortality.",
      "These spectral utterances appear to be riddles - shadow words seeking their luminous counterparts in the great tapestry of language.",
      "If I can unite each shadow with its destined spirit word, the portal shall recognize my noble intent and grant me safe passage to the realm of the living!"
    ],
    emotion: "happy",
    background: "from-purple-950 via-violet-900 to-pink-950",
    chapter: "Chapter III"
  }
};

export default function StoryIntro({ stage, onContinue, onSkip }: StoryIntroProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const story = storyContent[stage as keyof typeof storyContent];

  const handleNext = () => {
    if (currentDialogue < story.dialogue.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    } else {
      onContinue();
    }
  };

  const getEmotionSprite = () => {
    switch (story.emotion) {
      case 'worried': return 'https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-worried.png';
      case 'determined': return 'https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-determined.png';
      case 'happy': return 'https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-happy.png';
      default: return 'https://mocha-cdn.com/019a2a4e-25ef-79e7-a94c-abc75307a95d/layla-worried.png';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className={`max-w-4xl w-full bg-gradient-to-br ${story.background} rounded-none shadow-deep-gothic ornate-frame`}>
        
        {/* Victorian Chapter Header */}
        <div className="relative bg-gradient-to-r from-amber-950/80 to-amber-900/60 border-b-2 border-amber-700/50">
          <div className="flex items-center justify-between p-8">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-amber-400 candlelight-glow" />
              <div>
                <p className="text-sm text-amber-400/80 gothic-casual uppercase tracking-widest">
                  {story.chapter}
                </p>
                <h2 className="text-3xl gothic-title text-amber-100 candlelight-glow">
                  {story.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="p-3 text-amber-300/70 hover:text-amber-100 hover:bg-amber-800/30 rounded-lg transition-colors ornate-border"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Decorative Victorian scroll elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-6 h-6 bg-amber-600 rotate-45 border-2 border-amber-500/70 shadow-lg"></div>
        </div>

        {/* Victorian Manuscript Style Content */}
        <div className="p-10 flex items-start gap-10">
          
          {/* Ornate Victorian Portrait */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Elaborate frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-amber-800/60 rounded-full blur-xl"></div>
              <div className="relative ornate-frame bg-gradient-to-br from-amber-950/80 to-amber-900/60 p-2">
                <div className="relative bg-gradient-to-br from-amber-800/40 to-amber-900/60 rounded-full p-3 border-2 border-amber-600/50">
                  <img
                    src={getEmotionSprite()}
                    alt="Lady Layla of the Manor"
                    className="w-32 h-32 rounded-full pixelated bg-amber-800/20 p-2"
                  />
                  
                  {/* Victorian portrait decorations */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-3 border-amber-300 shadow-lg candlelight-glow"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-700 rotate-45 border-2 border-amber-400/70"></div>
                </div>
              </div>
              
              {/* Gothic ornamental flourishes */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-amber-400 text-2xl gothic-script candlelight-glow">❦</div>
            </div>
          </div>

          {/* Victorian Manuscript Page */}
          <div className="flex-1">
            <div className="relative">
              {/* Parchment effect */}
              <div className="absolute inset-0 parchment-bg rounded-lg shadow-deep-gothic"></div>
              <div className="relative bg-gradient-to-br from-amber-50/95 to-amber-100/90 rounded-lg p-8 border-2 border-amber-800/40">
                
                {/* Victorian manuscript decorations */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-3 border-t-3 border-amber-700/60"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-r-3 border-t-3 border-amber-700/60"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-3 border-b-3 border-amber-700/60"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-3 border-b-3 border-amber-700/60"></div>
                
                <div className="flex items-start gap-6">
                  {/* Illuminated manuscript initial */}
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full mt-1 flex items-center justify-center border-2 border-amber-500 shadow-lg">
                    <Scroll className="w-6 h-6 text-amber-100" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-amber-900 text-xl leading-relaxed gothic-text font-medium tracking-wide">
                      {story.dialogue[currentDialogue]}
                    </p>
                    
                    {/* Victorian page progress indicators */}
                    <div className="flex gap-3 mt-6 justify-center">
                      {story.dialogue.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            index <= currentDialogue 
                              ? 'bg-gradient-to-r from-amber-600 to-amber-800 shadow-lg shadow-amber-500/50 candlelight-glow' 
                              : 'bg-amber-300/50 border-2 border-amber-600/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Victorian-styled Action Panel */}
        <div className="p-8 pt-0 flex justify-between items-center bg-gradient-to-t from-amber-950/40 to-transparent">
          <button
            onClick={onSkip}
            className="px-8 py-3 text-amber-300/80 hover:text-amber-100 transition-colors gothic-text font-semibold tracking-wide ornate-border bg-transparent hover:bg-amber-800/20"
          >
            Skip this Tale
          </button>
          
          <button
            onClick={handleNext}
            className="victorian-btn px-10 py-4 text-amber-100 font-bold gothic-text flex items-center gap-4 text-lg"
          >
            {currentDialogue < story.dialogue.length - 1 ? (
              <>Continue Reading</>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Begin the Quest
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
