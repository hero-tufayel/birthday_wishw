import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SceneMessagesProps {
  onComplete: () => void;
  onBack: () => void;
}

const MESSAGES = [
  {
    kicker: 'A Significant Moment',
    quote: 'Some days are special for a reason. Today is one of them.',
    subtext: 'October 24 · Celebrating an extraordinary milestone',
  },
  {
    kicker: 'The Threshold of Adulthood',
    quote: "Eighteen isn't just a number. It's the beginning of a whole new chapter.",
    subtext: 'A wider world, greater adventures, infinite horizons',
  },
  {
    kicker: 'Hopes & Aspirations',
    quote: 'May your dreams grow bigger, your smile grow brighter, and your days become filled with happiness.',
    subtext: 'Every step guided by courage and joy',
  },
  {
    kicker: 'Enduring Blessings',
    quote: 'May success find your path, peace fill your heart, and beautiful memories follow you wherever you go.',
    subtext: 'Surrounded by strength, wisdom, and warm hearts',
  },
];

export const SceneMessages: React.FC<SceneMessagesProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (currentIndex < MESSAGES.length - 1) {
      soundEngine.playChime(1.0 + (currentIndex + 1) * 0.1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      soundEngine.playChime(1.5);
      onComplete();
    }
  }, [currentIndex, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      soundEngine.playChime(0.9);
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  }, [currentIndex, onBack]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const current = MESSAGES[currentIndex];

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-between px-4 sm:px-6 py-8 text-center select-none">
      {/* Editorial Step Tracker (Zero-Pill Compliance) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-400/80 font-medium"
      >
        <span>Chapter 18</span>
        <span aria-hidden="true" className="text-amber-500/40">·</span>
        <span className="font-mono tabular-nums text-amber-300">
          Message 0{currentIndex + 1} / 0{MESSAGES.length}
        </span>
        <span aria-hidden="true" className="text-amber-500/40">·</span>
        <span className="text-slate-400">Heartfelt Wishes</span>
      </motion.div>

      {/* Main Message Showcase */}
      <div className="my-auto py-12 max-w-3xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Subtle sparkling ornament */}
            <div className="mb-6 flex items-center justify-center">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              <Sparkles className="w-4 h-4 mx-3 text-amber-300" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            </div>

            {/* Kicker */}
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-400/90 font-medium mb-4">
              {current.kicker}
            </span>

            {/* Quote */}
            <blockquote className="font-cormorant text-2xl sm:text-4xl md:text-5xl text-slate-100 font-normal leading-snug sm:leading-tight px-4 sm:px-8 text-balance max-w-2xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Subtext */}
            <p className="mt-6 text-sm sm:text-base text-slate-400 font-sans-luxury font-light tracking-wide max-w-md">
              {current.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Indicators & Action Controls */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Subtle dot progress */}
        <div className="flex items-center gap-2">
          {MESSAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEngine.playChime(1.0 + idx * 0.1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer focus:outline-none ${
                idx === currentIndex
                  ? 'w-8 bg-amber-400 shadow-[0_0_12px_rgba(245,197,100,0.8)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Jump to message ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            onClick={handlePrev}
            className="px-5 py-3 rounded-full border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 bg-slate-900/40 backdrop-blur-sm text-xs sm:text-sm tracking-wider font-sans-luxury transition-all duration-200 flex items-center gap-2 cursor-pointer focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="group relative px-7 sm:px-8 py-3.5 rounded-full font-sans-luxury font-medium text-xs sm:text-sm tracking-wider text-slate-950 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 hover:from-white hover:via-amber-300 hover:to-amber-400 shadow-[0_0_25px_rgba(245,197,100,0.4)] hover:shadow-[0_0_35px_rgba(245,197,100,0.65)] transition-all duration-200 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span>
              {currentIndex === MESSAGES.length - 1 ? 'Continue to Surprise' : 'Next Message'}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <p className="text-[11px] text-slate-500 tracking-wider font-light">
          Use Arrow Keys or Space to navigate
        </p>
      </div>
    </div>
  );
};
