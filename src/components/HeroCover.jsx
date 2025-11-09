import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroCover() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Cover */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/g2cnMT7B1IgkJ7Ie/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Atmospheric overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)'
      }} />

      {/* Hero Copy */}
      <div className="relative z-10 flex h-full w-full items-center justify-center text-center px-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-sky-200 via-fuchsia-200 to-amber-200 drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]"
          >
            Mind Garden
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 60, damping: 20 }}
            className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-white/80"
          >
            A fluid, tactile learning space. Drift between glowing knowledge orbs and discover paths that feel inevitable.
          </motion.p>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 60, damping: 18 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em]">Deepen Focus</span>
          <div className="h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1">
            <motion.div
              className="h-2 w-2 rounded-full bg-white/70"
              animate={{ y: [0, 16, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
