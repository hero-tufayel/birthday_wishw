import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Heart, Share2, Crown, Maximize2, X, Check } from 'lucide-react';
import { triggerGrandFireworks, triggerLuxuryConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

interface SceneFinaleProps {
  onReplay: () => void;
}

export const SceneFinale: React.FC<SceneFinaleProps> = ({ onReplay }) => {
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [tributeWishes, setTributeWishes] = useState<string[]>([
    'Proud of you always! Welcome to Chapter 18! 🌟',
    'Stay humble, stay ambitious, stay real. Happy Birthday bro! 👑',
  ]);
  const [newWish, setNewWish] = useState('');

  useEffect(() => {
    // Cinematic trigger on mount
    triggerGrandFireworks();
    const timer = setTimeout(() => {
      triggerLuxuryConfetti();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSparkle = () => {
    soundEngine.playChime(1.2);
    triggerLuxuryConfetti();
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;
    setTributeWishes([newWish.trim(), ...tributeWishes]);
    setNewWish('');
    soundEngine.playChime(1.4);
    triggerLuxuryConfetti();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy 18th Birthday Mashrafi!",
          text: "Celebrating Mashrafi's 18th Birthday with a cinematic tribute!",
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-12 select-none">
      {/* Top celebratory header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-2 mb-8 sm:mb-12"
      >
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-400 font-medium">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Chapter 18 · Official Reveal</span>
          <Crown className="w-4 h-4 text-amber-400" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-gold-shimmer tracking-tight">
          Happy 18th Birthday, Mashrafi! 🎂
        </h1>
      </motion.div>

      {/* Main Showcase Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left / Center: Cinematic Photo Reveal Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          {/* Golden Frame Container */}
          <div className="relative group p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-amber-400/30 via-amber-600/10 to-amber-900/30 border border-amber-400/40 shadow-[0_0_50px_rgba(245,197,100,0.35)] backdrop-blur-md max-w-sm sm:max-w-md w-full">
            {/* Corner Luxury Flourishes */}
            <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
            <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-300" />

            {/* Inner Border & Image */}
            <div className="relative overflow-hidden rounded-xl bg-slate-950 aspect-[3/4] w-full">
              {/* Actual Mashrafi Photograph */}
              <img
                src="/mashrafi.jpg"
                alt="Mashrafi 18th Birthday Celebration"
                onLoad={() => setPhotoLoaded(true)}
                className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                  photoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Light Sweep Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent animate-light-sweep"
                aria-hidden="true"
              />

              {/* Subtle Vignette Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-200/90 font-sans-luxury backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-lg border border-amber-400/20">
                <span className="font-cinzel tracking-wider uppercase">Mashrafi · 18 Years</span>
                <button
                  onClick={() => setShowFullPhoto(true)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
                  title="Expand Full View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              </div>
            </div>

            {/* Ambient Aura Ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400/20 via-yellow-200/20 to-amber-600/20 blur-xl -z-10 animate-pulse-glow" />
          </div>

          {/* Quick interaction pills under photo */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleSparkle}
              className="px-4 py-2 rounded-full border border-amber-400/30 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 text-xs tracking-wider font-sans-luxury transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sparkle Sparks ✨</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-300 text-xs tracking-wider font-sans-luxury transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Tribute</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right: Heartfelt Tribute Blessings & Signature */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left"
        >
          {/* Main Blessing Paragraph 1 */}
          <div className="space-y-4 font-sans-luxury text-slate-200 text-base sm:text-lg font-light leading-relaxed">
            <p className="text-slate-100 font-normal">
              May this new chapter bring you endless happiness, unforgettable memories, incredible
              opportunities, and the courage to chase every dream in your heart.
            </p>

            <p className="text-amber-200 font-medium text-lg sm:text-xl font-cinzel tracking-wide">
              Keep smiling. Keep growing. Keep shining.
            </p>

            <p className="text-slate-300 italic font-cormorant text-xl sm:text-2xl border-l-2 border-amber-400/50 pl-4 py-1">
              &ldquo;Your best chapters are still unwritten. Make them extraordinary. ✨&rdquo;
            </p>
          </div>

          {/* Signature */}
          <div className="pt-2">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-400/90 font-medium mb-1">
              Sent With Warmth
            </p>
            <p className="font-cinzel text-xl sm:text-2xl font-bold text-gold-shimmer flex items-center gap-2">
              <span>With lots of love &amp; best wishes</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500 inline-block animate-pulse" />
            </p>
          </div>

          {/* Interactive Community Wishes / Guestbook */}
          <div className="pt-4 border-t border-slate-800/80">
            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">
              Add a Birthday Wish for Mashrafi
            </h3>

            <form onSubmit={handleAddWish} className="flex gap-2">
              <input
                type="text"
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Write your personal blessing..."
                className="flex-1 bg-slate-900/60 border border-slate-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400/40 transition-all font-sans-luxury"
                maxLength={120}
              />
              <button
                type="submit"
                disabled={!newWish.trim()}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-slate-950 font-medium text-xs tracking-wider transition-all cursor-pointer font-sans-luxury shrink-0"
              >
                Send Wish
              </button>
            </form>

            {/* List of wishes */}
            <div className="mt-3 space-y-2 max-h-36 overflow-y-auto pr-1">
              {tributeWishes.map((wish, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 font-sans-luxury flex items-start gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{wish}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replay Button CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playChime(1.0);
                onReplay();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-amber-400/40 bg-amber-950/20 hover:bg-amber-900/30 text-amber-300 text-xs sm:text-sm font-sans-luxury tracking-wider font-medium transition-all duration-200 cursor-pointer hover:border-amber-300 focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Experience Again ↺</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {showFullPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowFullPhoto(false)}
          >
            <div
              className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFullPhoto(false)}
                className="absolute -top-12 right-0 text-slate-300 hover:text-white p-2 rounded-full bg-slate-800/50 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-2 rounded-2xl border border-amber-400/40 bg-black/80 shadow-[0_0_60px_rgba(245,197,100,0.4)]">
                <img
                  src="/mashrafi.jpg"
                  alt="Mashrafi 18th Birthday Fullscreen"
                  className="max-h-[80vh] w-auto object-contain rounded-xl"
                />
              </div>

              <p className="mt-3 text-xs tracking-widest uppercase text-amber-300 font-cinzel">
                Happy 18th Birthday Mashrafi · The Crown Chapter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
