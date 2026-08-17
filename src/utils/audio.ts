/**
 * Romantic Ambient Audio Synthesizer & Audio Element Manager
 * Generates an ultra-soft, warm acoustic piano/music box ambient loop using Web Audio API
 * or falls back cleanly to a local audio file if provided.
 */

class RomanticAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private step: number = 0;
  private audioElement: HTMLAudioElement | null = null;
  private isUsingCustomFile: boolean = false;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic/romantic notes in Hertz (C major / A minor romantic chords)
  // C4, E4, G4, B4, C5, D5, E5, G5, A5
  private readonly notes: { [key: string]: number } = {
    'C3': 130.81,
    'E3': 164.81,
    'F3': 174.61,
    'G3': 196.00,
    'A3': 220.00,
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25,
    'D5': 587.33,
    'E5': 659.25,
    'G5': 783.99,
  };

  // Romantic progression: Fmaj9 -> Cmaj7 -> Am9 -> Gsus4
  private readonly sequence: Array<{ chord: string[]; melody: string[] }> = [
    { chord: ['F3', 'C4', 'E4', 'A4'], melody: ['C5', 'A4', 'E4', 'G4'] },
    { chord: ['F3', 'A3', 'C4', 'E4'], melody: ['E5', 'C5', 'A4', 'C5'] },
    { chord: ['C3', 'G3', 'B3', 'E4'], melody: ['G5', 'E5', 'C5', 'D5'] },
    { chord: ['C3', 'E3', 'G3', 'C4'], melody: ['B4', 'G4', 'E4', 'G4'] },
    { chord: ['A3', 'E4', 'G4', 'C5'], melody: ['C5', 'E5', 'D5', 'C5'] },
    { chord: ['A3', 'C4', 'E4', 'G4'], melody: ['A4', 'C5', 'E5', 'A5'] },
    { chord: ['G3', 'D4', 'G4', 'B4'], melody: ['D5', 'B4', 'G4', 'A4'] },
    { chord: ['G3', 'C4', 'D4', 'G4'], melody: ['B4', 'G4', 'D4', 'E4'] },
  ];

  constructor() {
    // Attempt to preload local audio file if it exists
    try {
      this.audioElement = new Audio();
      this.audioElement.src = '/assets/music/romantic.mp3';
      this.audioElement.loop = true;
      this.audioElement.volume = 0.45;
      
      this.audioElement.addEventListener('canplaythrough', () => {
        this.isUsingCustomFile = true;
      });
      
      this.audioElement.addEventListener('error', () => {
        // Fallback gracefully to Web Audio synth
        this.isUsingCustomFile = false;
      });
    } catch {
      this.isUsingCustomFile = false;
    }
  }

  private initWebAudio() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playTone(freq: number, time: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.08) {
    if (!this.audioCtx || !this.masterGain) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      // Add gentle detune for warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 4, time);

      // Envelope: gentle attack, warm sustain, long romantic decay
      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.exponentialRampToValueAtTime(gainVal, time + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration + 0.1);
    } catch {
      // Audio node failure protection
    }
  }

  private scheduleNextMeasure() {
    if (!this.isPlaying || !this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const currentSeq = this.sequence[this.step % this.sequence.length];

    // Play chord pad
    currentSeq.chord.forEach((noteName, idx) => {
      const freq = this.notes[noteName];
      if (freq) {
        this.playTone(freq, now + idx * 0.05, 3.8, 'sine', 0.045);
      }
    });

    // Play delicate arpeggiated melody notes
    currentSeq.melody.forEach((noteName, idx) => {
      const freq = this.notes[noteName];
      if (freq) {
        const noteTime = now + 0.3 + idx * 0.65;
        // Warm celesta chime tone
        this.playTone(freq, noteTime, 1.8, 'triangle', 0.055);
        // Subtle octave overtone
        this.playTone(freq * 2, noteTime, 0.9, 'sine', 0.015);
      }
    });

    this.step++;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextMeasure();
    }, 2800);
  }

  public playChime() {
    this.initWebAudio();
    if (!this.audioCtx || !this.masterGain) return;

    const now = this.audioCtx.currentTime;
    const chimeNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

    chimeNotes.forEach((freq, i) => {
      this.playTone(freq, now + i * 0.08, 1.6, 'triangle', 0.08);
      this.playTone(freq * 1.5, now + i * 0.08, 0.8, 'sine', 0.03);
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.isUsingCustomFile && this.audioElement) {
      this.audioElement.play().catch(() => {
        // Fallback to synth if user blocked custom file
        this.initWebAudio();
        this.step = 0;
        this.scheduleNextMeasure();
      });
    } else {
      this.initWebAudio();
      this.step = 0;
      this.scheduleNextMeasure();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioManager();
