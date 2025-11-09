import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Utility to create organic clusters of orbs
function useOrbs(count = 12) {
  const seed = useMemo(() => Math.random() * 1000, []);
  return useMemo(() => {
    const rnd = (i) => Math.sin(i * 12.9898 + seed) * 43758.5453 % 1;
    const orbs = Array.from({ length: count }).map((_, i) => {
      const cluster = Math.floor(rnd(i) * 3);
      const angle = rnd(i + 1) * Math.PI * 2;
      const radius = 120 + rnd(i + 2) * 220 + cluster * 60;
      const x = Math.cos(angle) * radius + (cluster - 1) * 160;
      const y = Math.sin(angle) * radius + (cluster - 1) * 60;
      const size = 48 + rnd(i + 3) * 60;
      const hue = 200 + rnd(i + 4) * 140; // deep, cool spectrum
      const subject = ['Physics', 'Biology', 'Design', 'Music', 'Math', 'Neuro', 'Code'][i % 7];
      return { id: i, x, y, size, hue, subject };
    });
    return orbs;
  }, [count, seed]);
}

function Glow({ hue = 200, blur = 40, opacity = 0.7 }) {
  return (
    <div
      className="absolute inset-0 rounded-full"
      style={{
        filter: `blur(${blur}px)`,
        background: `conic-gradient(from 0deg, hsla(${hue},90%,65%,${opacity}) 0%, hsla(${(hue+60)%360},90%,65%,${opacity}) 50%, hsla(${(hue+120)%360},90%,65%,${opacity}) 100%)`,
        opacity,
      }}
    />
  );
}

function Orb({ data, onOpen }) {
  const { size, hue, subject } = data;
  const x = useSpring(useMotionValue(data.x), { stiffness: 50, damping: 18, mass: 0.8 });
  const y = useSpring(useMotionValue(data.y), { stiffness: 50, damping: 18, mass: 0.8 });

  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  // gentle bobbing
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (t) => {
      const k = (t - start) / 1000;
      const dx = Math.sin(k + data.id) * 4;
      const dy = Math.cos(k * 0.8 + data.id) * 6;
      x.set(data.x + dx);
      y.set(data.y + dy);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [data.id, data.x, data.y, x, y]);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(data)}
      className="group absolute select-none outline-none"
      style={{ x, y, width: size, height: size, translateX: '-50%', translateY: '-50%' }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 30px rgba(255,255,255,0.15), 0 18px 60px hsla(${hue}, 90%, 60%, 0.35)` }} />
        <div className="absolute inset-[1px] rounded-full" style={{
          background: `radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.06) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.3) 100%)`,
          backdropFilter: 'blur(6px)'
        }} />
        <Glow hue={hue} blur={28} opacity={0.45} />

        {/* title */}
        <motion.span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white font-semibold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
        >
          {subject}
        </motion.span>
      </div>
    </motion.button>
  );
}

export default function KnowledgeGarden({ onOpen }) {
  const containerRef = useRef(null);
  const orbs = useOrbs(16);

  // simple parallax with mouse movement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-x', String(cx * 6));
      el.style.setProperty('--tilt-y', String(cy * 6));
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[130vh] md:h-[120vh] bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(80% 60% at 50% 0%, rgba(56,189,248,0.08) 0%, rgba(168,85,247,0.06) 35%, rgba(234,179,8,0.05) 70%, rgba(0,0,0,0) 100%)'
      }} />

      {/* subtle caustics */}
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.25), transparent 30%), radial-gradient(circle at 70% 60%, rgba(236,72,153,0.18), transparent 30%), radial-gradient(circle at 40% 80%, rgba(234,179,8,0.2), transparent 35%)',
        filter: 'blur(40px)'
      }} />

      {/* Orb field */}
      <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, calc(-40% + var(--tilt-y, 0px)))' }}>
        {orbs.map((o) => (
          <Orb key={o.id} data={o} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
