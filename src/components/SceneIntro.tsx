import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SceneIntroProps {
  onStart: () => void;
}

export const SceneIntro: React.FC<SceneIntroProps> = ({ onStart }) => {
  const handleBegin = () => {
    soundEngine.playChime(1.0);
    soundEngine.playMusic();
    onStart();
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none">
      {/* Subtle glowing crest emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-amber-500/15 blur-xl animate-pulse-glow" />
          <div className="relative w-16 h-16 rounded-full border border-amber-400/30 bg-amber-950/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
        </div>
      </motion.div>

      {/* Main Title / Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-2xl"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-400/80 font-medium">
          A Moment Prepared For You
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-bold tracking-tight text-gold-shimmer">
          Hey Mashrafi... ✨
        </h1>
      </motion.div>

      {/* Cinematic Body Lines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 space-y-4 max-w-xl text-slate-300 font-sans-luxury text-base sm:text-lg md:text-xl font-light leading-relaxed"
      >
        <p className="text-amber-100/90 font-normal">
          Something special is waiting for you.
        </p>

        <p className="text-slate-300/80">
          A little surprise, a few heartfelt words,
          <br className="hidden sm:inline" />
          and one final moment you won&apos;t expect.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-amber-300/90 pt-3 text-lg font-cormorant italic text-2xl"
        >
          Are you ready?
        </motion.p>
      </motion.div>

      {/* Begin Surprise CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
        <button
          onClick={handleBegin}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-sans-luxury font-medium text-sm sm:text-base tracking-wider text-slate-950 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 hover:from-white hover:via-amber-300 hover:to-amber-400 shadow-[0_0_35px_rgba(245,197,100,0.45)] hover:shadow-[0_0_50px_rgba(245,197,100,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
        >
          <span className="font-semibold tracking-wide">Begin the Surprise ✨</span>
          <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="mt-4 text-xs tracking-widest uppercase text-slate-500 font-light">
          Tap to immerse · Best with sound
        </p>
      </motion.div>
    </div>
  );
};
