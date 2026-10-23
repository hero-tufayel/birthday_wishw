import React from 'react';
import { motion } from 'motion/react';
import { Crown, Gift, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SceneMysteryProps {
  onUnlock: () => void;
  onBack: () => void;
}

export const SceneMystery: React.FC<SceneMysteryProps> = ({ onUnlock, onBack }) => {
  const handleUnlockClick = () => {
    soundEngine.playGrandReveal();
    onUnlock();
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none">
      {/* Darkened Vignette Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none -z-10" />

      {/* Floating Crown Emblem */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4"
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-6 bg-amber-500/20 rounded-full blur-2xl animate-pulse-glow" />
          <Crown className="w-12 h-12 text-amber-300 drop-shadow-[0_0_15px_rgba(245,197,100,0.8)]" />
        </div>
      </motion.div>

      {/* Large Glowing Golden Number 18 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-2"
      >
        {/* Golden halo rings */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-300/25 to-amber-600/10 blur-3xl" />
        <div className="absolute -inset-4 rounded-full border border-amber-400/20 animate-pulse-glow" />

        <div className="relative">
          <span className="font-cinzel font-black text-8xl sm:text-9xl md:text-[11rem] leading-none text-gold-shimmer drop-shadow-[0_0_40px_rgba(245,197,100,0.5)] tracking-tighter">
            18
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-300/80">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>
      </motion.div>

      {/* Anticipation Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 space-y-3 max-w-lg"
      >
        <p className="font-cormorant italic text-2xl sm:text-3xl text-amber-200">
          But wait, Mashrafi...
        </p>

        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-semibold text-slate-100 tracking-wide text-balance">
          There&apos;s one last surprise.
        </h2>

        <p className="font-sans-luxury text-sm sm:text-base text-slate-300/80 font-light tracking-wide">
          Something special is waiting just for you.
        </p>
      </motion.div>

      {/* Unlock Final Surprise CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <button
          onClick={handleUnlockClick}
          className="group relative inline-flex items-center gap-3.5 px-9 sm:px-11 py-4 sm:py-4.5 rounded-full font-sans-luxury font-semibold text-sm sm:text-base tracking-wider text-slate-950 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 hover:from-white hover:via-amber-300 hover:to-amber-400 shadow-[0_0_40px_rgba(245,197,100,0.6)] hover:shadow-[0_0_65px_rgba(245,197,100,0.85)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <Gift className="w-5 h-5 text-slate-950 transition-transform duration-300 group-hover:rotate-12" />
          <span>Unlock Your Final Surprise 🎁</span>
        </button>

        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-[0.2em] font-light cursor-pointer mt-2"
        >
          ← Previous Wishes
        </button>
      </motion.div>
    </div>
  );
};
