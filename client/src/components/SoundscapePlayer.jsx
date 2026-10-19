import React, { useState } from 'react';
import { toggleLoomAmbience } from '../utils/craftAudio';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function SoundscapePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    toggleLoomAmbience((state) => {
      setIsPlaying(state);
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full shadow-2xl border transition-all text-xs font-bold ${
        isPlaying
          ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400 animate-pulse'
          : 'bg-[#1E1B4B] text-amber-300 border-amber-400/60 hover:bg-[#2D1B69]'
      }`}
      title={isPlaying ? 'Mute Craft Workshop Soundscape' : 'Listen to Workshop Loom & Chisel Ambience'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="hidden sm:inline">Loom Ambience: On</span>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-1 h-3 bg-white animate-bounce"></span>
            <span className="w-1 h-2 bg-white animate-bounce delay-100"></span>
            <span className="w-1 h-3.5 bg-white animate-bounce delay-200"></span>
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Sound of the Loom</span>
        </>
      )}
    </button>
  );
}
