/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CosmicCanvas } from './components/CosmicCanvas';
import { Navbar } from './components/Navbar';
import { SceneIntro } from './components/SceneIntro';
import { SceneMessages } from './components/SceneMessages';
import { SceneMystery } from './components/SceneMystery';
import { SceneFinale } from './components/SceneFinale';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);

  const handleStart = () => {
    setCurrentScene(2);
  };

  const handleMessagesComplete = () => {
    setCurrentScene(3);
  };

  const handleUnlockFinal = () => {
    setCurrentScene(4);
  };

  const handleReplay = () => {
    setCurrentScene(1);
  };

  return (
    <div className="relative min-h-screen bg-[#05060a] text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic Cosmic Background Canvas */}
      <CosmicCanvas
        glowIntensity={currentScene === 4 ? 0.9 : currentScene === 3 ? 0.7 : 0.5}
        accentGold={true}
      />

      {/* Top Bar Navigation */}
      <Navbar currentScene={currentScene} onSelectScene={setCurrentScene} />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl w-full mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SceneIntro onStart={handleStart} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SceneMessages
                onComplete={handleMessagesComplete}
                onBack={() => setCurrentScene(1)}
              />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SceneMystery
                onUnlock={handleUnlockFinal}
                onBack={() => setCurrentScene(2)}
              />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SceneFinale onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Editorial Footer (Anti-Slop Restraint: No fake telemetry tickers) */}
      <footer className="relative z-20 w-full py-4 px-6 border-t border-slate-900 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-sans-luxury">
          <p className="tracking-wide">
            Designed for <span className="text-amber-300 font-medium">Mashrafi</span> · 18th Birthday Celebration
          </p>
          <div className="flex items-center gap-2">
            <span>Chapter XVIII</span>
            <span aria-hidden="true">·</span>
            <span>Unwritten Chapters Ahead</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
