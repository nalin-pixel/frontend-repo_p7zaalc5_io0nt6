import { useEffect, useRef, useState } from 'react';

export default function AmbientAudio() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.25;
    if (enabled) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [enabled]);

  return (
    <div className="fixed left-4 bottom-4 z-40">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/09/audio_307a0cc1bd.mp3" />
      <button
        onClick={() => setEnabled((s) => !s)}
        className={`rounded-full px-4 py-2 text-xs font-medium backdrop-blur border ${enabled ? 'bg-white/20 border-white/40 text-white' : 'bg-black/30 border-white/20 text-white/80'}`}
      >
        {enabled ? 'Ambient On' : 'Ambient Off'}
      </button>
    </div>
  );
}
