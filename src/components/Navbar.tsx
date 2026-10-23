import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  currentScene: number; // 1, 2, 3, 4
  onSelectScene: (scene: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScene, onSelectScene }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05060a]/80 backdrop-blur-md border-b border-amber-500/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectScene(1)}
          className="text-sm sm:text-base font-cinzel font-bold tracking-wider text-amber-200/95 hover:text-amber-100 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-left focus:outline-none"
        >
          MASHRAFI <span className="text-amber-400 font-normal">·</span> XVIII
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-widest uppercase font-sans-luxury">
          <button
            onClick={() => onSelectScene(1)}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScene === 1
                ? 'text-amber-300 font-semibold border-b border-amber-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            01. Prologue
          </button>
          <button
            onClick={() => onSelectScene(2)}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScene === 2
                ? 'text-amber-300 font-semibold border-b border-amber-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            02. Wishes
          </button>
          <button
            onClick={() => onSelectScene(3)}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScene === 3
                ? 'text-amber-300 font-semibold border-b border-amber-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            03. The Gateway
          </button>
          <button
            onClick={() => onSelectScene(4)}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScene === 4
                ? 'text-amber-300 font-semibold border-b border-amber-400 pb-0.5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            04. The Reveal
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster (Sound + Fullscreen controls) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              isMuted
                ? 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-900/60'
                : 'border-amber-400/40 text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 shadow-[0_0_12px_rgba(245,197,100,0.25)]'
            }`}
            title={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
            aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px] uppercase font-sans-luxury font-medium">
              {isMuted ? 'Muted' : 'Sound On'}
            </span>
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
