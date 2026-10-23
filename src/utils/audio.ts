/**
 * Cinematic Web Audio Ambient Engine
 * Synthesizes a warm, celestial soundtrack and chime sound effects
 * without relying on external media files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private padGain: GainNode | null = null;
  private chordTimer: number | null = null;
  private currentChordIndex: number = 0;

  // Celestial chord frequencies (Dmaj9, Bm7, Gmaj7, Aadd9)
  private chords = [
    // Dmaj9 (D3, F#3, A3, C#4, E4)
    [146.83, 185.0, 220.0, 277.18, 329.63],
    // Bm7 (B2, D3, F#3, A3, D4)
    [123.47, 146.83, 185.0, 220.0, 293.66],
    // Gmaj7 (G2, B2, D3, F#3, B3)
    [98.0, 123.47, 146.83, 185.0, 246.94],
    // Aadd9 (A2, C#3, E3, B3, E4)
    [110.0, 138.59, 164.81, 246.94, 329.63],
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.padGain = this.ctx.createGain();
      this.padGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.padGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playMusic() {
    this.initContext();
    if (!this.ctx || !this.padGain) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.playNextChord();

    // Rotate ambient chords every 6.5 seconds
    this.chordTimer = window.setInterval(() => {
      if (this.isPlaying) {
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playNextChord();
      }
    }, 6500);
  }

  private playNextChord() {
    if (!this.ctx || !this.padGain || this.isMuted) return;

    const chord = this.chords[this.currentChordIndex];
    const now = this.ctx.currentTime;
    const duration = 6.8;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.padGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm sine + triangle blend
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for dreamy, cinematic warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, now);
      filter.frequency.exponentialRampToValueAtTime(750, now + duration * 0.5);

      // Smooth attack and release envelope
      const maxGain = 0.045 / (idx + 1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(maxGain, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.padGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.chordTimer) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.5, now, 0.08);
    }
    if (!this.isMuted && !this.isPlaying) {
      this.playMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Sparkling celestial bell chime on step transitions
  public playChime(pitchMultiplier: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.0, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * pitchMultiplier, now + idx * 0.06);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.3);
    });
  }

  // Grand fanfare chime for the final photo reveal
  public playGrandReveal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [
      { f: 293.66, t: 0.0 }, // D4
      { f: 369.99, t: 0.15 }, // F#4
      { f: 440.0, t: 0.3 }, // A4
      { f: 587.33, t: 0.45 }, // D5
      { f: 739.99, t: 0.6 }, // F#5
      { f: 880.0, t: 0.75 }, // A5
      { f: 1174.66, t: 0.95 }, // D6
    ];

    const now = this.ctx.currentTime;
    notes.forEach((item) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.0001, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.08, now + item.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.t + 2.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + item.t);
      osc.stop(now + item.t + 2.3);
    });
  }
}

export const soundEngine = new SoundEngine();
