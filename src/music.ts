/**
 * MusicBox — a tiny generative "music box" loop built on the Web Audio API.
 * Plays a gentle arpeggiated progression (C – Am – F – G) with bell-like
 * triangle-wave tones, so the invitation has real music with zero assets.
 */

const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

// Chords as midi note sets [root, 3rd, 5th, octave]
const PROGRESSION: number[][] = [
  [48, 55, 60, 64], // C
  [45, 52, 57, 60], // Am
  [41, 48, 53, 57], // F
  [43, 50, 55, 59], // G
];

// arpeggio order within a chord (indices), 8 steps per bar
const PATTERN = [0, 2, 1, 3, 2, 3, 1, 2];
// optional sparkle melody on some steps (chord index + 12)
const MELODY: (number | null)[] = [null, 3, null, 2, null, 3, 1, null];

const STEP_MS = 300;

export class MusicBox {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  playing = false;

  private ensure() {
    if (this.ctx) return;
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;

    // soft hall-ish feel: feedback delay
    const delay = this.ctx.createDelay(1.2);
    delay.delayTime.value = 0.34;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.32;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.22;
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(this.ctx.destination);

    this.master.connect(this.ctx.destination);
    this.master.connect(delay);
  }

  private note(freq: number, when: number, peak: number, dur: number) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2.001; // faint overtone shimmer

    const g = this.ctx.createGain();
    const g2 = this.ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    g2.gain.setValueAtTime(0, when);
    g2.gain.linearRampToValueAtTime(peak * 0.18, when + 0.01);
    g2.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.6);

    osc.connect(g);
    osc2.connect(g2);
    g.connect(this.master);
    g2.connect(this.master);
    osc.start(when);
    osc2.start(when);
    osc.stop(when + dur + 0.05);
    osc2.stop(when + dur + 0.05);
  }

  private tick = () => {
    if (!this.ctx || !this.master) return;
    const bar = Math.floor(this.step / PATTERN.length) % PROGRESSION.length;
    const chord = PROGRESSION[bar];
    const inBar = this.step % PATTERN.length;
    const when = this.ctx.currentTime + 0.03;

    const idx = PATTERN[inBar];
    this.note(midi(chord[idx]), when, 0.16, 1.5);

    // low root at the start of each bar
    if (inBar === 0) this.note(midi(chord[0] - 12), when, 0.1, 2.2);

    // sparkle melody
    const m = MELODY[inBar];
    if (m !== null) this.note(midi(chord[m] + 12), when, 0.09, 1.1);

    this.step++;
  };

  start() {
    this.ensure();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") void this.ctx.resume();
    if (this.playing) return;
    this.playing = true;
    this.tick();
    this.timer = window.setInterval(this.tick, STEP_MS);
  }

  stop() {
    this.playing = false;
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.master) {
      // gentle fade out so nothing clicks
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(this.master.gain.value, t);
      this.master.gain.linearRampToValueAtTime(0.0001, t + 0.4);
      window.setTimeout(() => {
        if (this.master && !this.playing) this.master.gain.value = 0.5;
      }, 450);
    }
  }

  toggle() {
    if (this.playing) this.stop();
    else this.start();
    return this.playing;
  }
}

export const musicBox = new MusicBox();
