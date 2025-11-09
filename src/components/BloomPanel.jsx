import { motion, AnimatePresence } from 'framer-motion';

export default function BloomPanel({ open, subject, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* atmosphere */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-black/90 to-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* reading panel */}
          <motion.div
            className="relative z-10 mx-auto mt-20 mb-16 max-w-3xl px-6"
            initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 10, opacity: 0, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 70, damping: 18 }}
          >
            <div className="relative rounded-3xl p-8 md:p-12"
                 style={{
                   background: 'radial-gradient(120% 100% at 20% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.0) 100%)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   boxShadow: '0 30px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
                 }}
            >
              <div className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-50" style={{
                background: 'conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.2), rgba(168,85,247,0.2), rgba(234,179,8,0.2), rgba(59,130,246,0.2))',
                filter: 'blur(28px)'
              }} />

              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-sky-300 via-fuchsia-200 to-amber-200">
                  {subject}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-white/90">
                  <p>
                    Enter a focused realm. Typography breathes; surfaces glow. Content flows without edges—no boxes, only atmosphere.
                  </p>
                  <p>
                    This is a prototype reading surface. Imagine lessons, video, and interactive tasks living here with chromeless controls that reveal on intent.
                  </p>
                  <p className="text-white/70">
                    Use the condense glyph to return. The garden remembers your orbit.
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={onClose}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-black bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:brightness-110 transition"
                  >
                    Condense
                  </button>
                  <div className="text-white/60 text-sm">Next Lesson →</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
