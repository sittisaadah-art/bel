declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

let webAudioCtx: AudioContext | null = null;

function getOrCreateAudioContext(): AudioContext {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    throw new Error('Browser tidak mendukung Web Audio API.');
  }
  if (!webAudioCtx) {
    webAudioCtx = new AudioCtx();
  }
  if (webAudioCtx.state === 'suspended') {
    void webAudioCtx.resume();
  }
  return webAudioCtx;
}

export async function unlockAudioSystem(): Promise<void> {
  const ctx = getOrCreateAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.value = 0.001;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * Plays a classic 8-note Westminster school chime via Web Audio API
 * when no custom MP3/WAV audio file is uploaded for a schedule.
 */
export function startFallbackChime(onComplete: () => void): () => void {
  const ctx = getOrCreateAudioContext();
  const notes = [659.25, 523.25, 587.33, 392.0]; // E5, C5, D5, G4
  let step = 0;
  let stopped = false;

  const triggerNote = () => {
    if (stopped) return;
    const freq = notes[step % notes.length];
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.45, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
    step++;
  };

  triggerNote();
  const intervalId = window.setInterval(() => {
    if (stopped) return;
    if (step >= 8) {
      window.clearInterval(intervalId);
      onComplete();
    } else {
      triggerNote();
    }
  }, 650);

  return () => {
    stopped = true;
    window.clearInterval(intervalId);
  };
}
