/**
 * Web Audio API sound design cues for the 2.5s Countdown-to-Launch flythrough:
 * - Mechanical tick at 0.0s (01 -> 00)
 * - Deep bass rumble + acceleration whoosh through tunnel (0.05s -> 1.98s)
 * - Sudden silence + single crystalline "ding" on emergence (2.0s)
 */

let sharedCtx: AudioContext | null = null;
let audioUnlocked = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!sharedCtx) {
    try {
      sharedCtx = new AudioCtx();
    } catch {
      return null;
    }
  }
  return sharedCtx;
}

export function installAudioUnlockListeners(): () => void {
  if (typeof window === 'undefined') return () => {};

  const unlock = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    audioUnlocked = true;
  };

  window.addEventListener('pointerdown', unlock, { passive: true, once: true });
  window.addEventListener('keydown', unlock, { passive: true, once: true });
  window.addEventListener('touchstart', unlock, { passive: true, once: true });

  return () => {
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('touchstart', unlock);
  };
}

export function playLaunchSoundSequence(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    if (!audioUnlocked) return;
    ctx.resume().catch(() => {});
  }

  try {
    const now = ctx.currentTime;

    // 1. Mechanical flip-tick at t = 0.0s
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = 'triangle';
    tickOsc.frequency.setValueAtTime(160, now);
    tickOsc.frequency.exponentialRampToValueAtTime(48, now + 0.075);
    tickGain.gain.setValueAtTime(0.28, now);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    tickOsc.connect(tickGain);
    tickGain.connect(ctx.destination);
    tickOsc.start(now);
    tickOsc.stop(now + 0.09);

    // 2. Deep bass rumble (0.05s -> 1.98s, sudden silence before 2.0s)
    const bassOsc = ctx.createOscillator();
    const bassFilter = ctx.createBiquadFilter();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(46, now + 0.04);
    bassOsc.frequency.linearRampToValueAtTime(64, now + 0.9);
    bassOsc.frequency.exponentialRampToValueAtTime(36, now + 1.92);

    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(110, now + 0.04);
    bassFilter.frequency.linearRampToValueAtTime(210, now + 1.0);
    bassFilter.frequency.exponentialRampToValueAtTime(75, now + 1.94);

    bassGain.gain.setValueAtTime(0.001, now + 0.04);
    bassGain.gain.linearRampToValueAtTime(0.18, now + 0.42);
    bassGain.gain.setValueAtTime(0.18, now + 1.2);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.95);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(ctx.destination);
    bassOsc.start(now + 0.04);
    bassOsc.stop(now + 1.96);

    // 3. Filtered noise acceleration whoosh (0.08s -> 1.85s)
    const bufferSize = Math.floor(ctx.sampleRate * 1.85);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const whooshFilter = ctx.createBiquadFilter();
    whooshFilter.type = 'bandpass';
    whooshFilter.Q.setValueAtTime(1.8, now + 0.06);
    whooshFilter.frequency.setValueAtTime(220, now + 0.06);
    whooshFilter.frequency.exponentialRampToValueAtTime(1950, now + 1.05);
    whooshFilter.frequency.exponentialRampToValueAtTime(320, now + 1.9);

    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0.001, now + 0.06);
    whooshGain.gain.linearRampToValueAtTime(0.11, now + 0.55);
    whooshGain.gain.linearRampToValueAtTime(0.06, now + 1.35);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 1.92);

    noiseSource.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    noiseSource.start(now + 0.06);
    noiseSource.stop(now + 1.94);

    // 4. Sudden silence at 1.96s -> 2.04s, then clean single "ding" on emergence
    const dingStart = now + 2.04;
    const partials = [
      { freq: 880, gain: 0.14, decay: 1.4 },
      { freq: 1318.5, gain: 0.06, decay: 1.0 },
      { freq: 1760, gain: 0.035, decay: 0.7 },
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, dingStart);
      g.gain.setValueAtTime(0.001, dingStart);
      g.gain.linearRampToValueAtTime(gain, dingStart + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, dingStart + decay);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(dingStart);
      osc.stop(dingStart + decay + 0.05);
    });
  } catch {
    // Graceful no-op if browser blocks Web Audio
  }
}
