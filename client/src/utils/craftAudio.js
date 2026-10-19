// Web Audio API Rhythmic Craft Soundscape Synthesizer
// Generates gentle rhythmic ambience of Indian master craft workshops (handlooms, chisel, potter wheel)
// Completely offline, 0 dependencies, works in all modern browsers.

let audioCtx = null;
let isPlaying = false;
let intervalId = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play a gentle wooden loom shuttle click
export const playLoomClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
};

// Play a gentle bronze temple chime / metal ping
export const playChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.4);
};

// Start continuous ambient loom rhythm
export const toggleLoomAmbience = (onStateChange) => {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (isPlaying) {
    clearInterval(intervalId);
    isPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    isPlaying = true;
    if (onStateChange) onStateChange(true);
    let beat = 0;
    playLoomClick();
    intervalId = setInterval(() => {
      beat++;
      if (beat % 4 === 0) {
        playChime();
      } else {
        playLoomClick();
      }
    }, 450);
    return true;
  }
};
