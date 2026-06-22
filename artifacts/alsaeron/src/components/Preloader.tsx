import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["A", "L", "S", "A", "E", "R", "O", "N"];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1400);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(onComplete, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex items-center gap-[0.06em]">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            className="font-serif text-white text-4xl md:text-6xl tracking-[0.12em]"
            initial={{ opacity: 0, y: 16 }}
            animate={
              phase === "in"
                ? { opacity: 1, y: 0 }
                : phase === "out"
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: phase === "in" ? 0.6 : 0.5,
              delay: phase === "in" ? i * 0.07 : i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          phase === "in"
            ? { opacity: 1, scaleX: 1 }
            : phase === "out"
            ? { opacity: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.8, delay: phase === "in" ? 0.7 : 0, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      >
        <div
          className="w-20 h-[1px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.7), transparent)" }}
        />
      </motion.div>

      <motion.p
        className="mt-4 text-[9px] tracking-[0.4em] font-sans uppercase"
        style={{ color: "rgba(37,99,235,0.5)" }}
        initial={{ opacity: 0 }}
        animate={phase === "in" ? { opacity: 1 } : phase === "out" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, delay: phase === "in" ? 1.1 : 0 }}
      >
        Crafted Beyond Time
      </motion.p>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.6, delay: 0.8, repeat: 1, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-white/20"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
