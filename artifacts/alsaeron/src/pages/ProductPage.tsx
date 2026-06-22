import { useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getProductBySlug,
  getAdjacentProducts,
  type Product,
} from "@/lib/products";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 22,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Watch Visual ─── */
function WatchVisual({ glowRgb }: { glowRgb: string }) {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${glowRgb},0.18) 0%, transparent 68%)`,
          filter: "blur(28px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer lugs / case silhouette */}
      <div
        className="absolute w-[268px] h-[268px] md:w-[300px] md:h-[300px] rounded-full"
        style={{
          background:
            "conic-gradient(from 220deg, #0e0e12 0deg, #1c1c24 60deg, #0a0a0f 120deg, #242432 180deg, #0e0e12 240deg, #1a1a22 300deg, #0e0e12 360deg)",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5)`,
        }}
      />

      {/* Bezel ring */}
      <div
        className="absolute w-[252px] h-[252px] md:w-[282px] md:h-[282px] rounded-full"
        style={{
          background:
            "conic-gradient(from 45deg, #111118 0deg, #2a2a36 30deg, #0d0d14 90deg, #1e1e2a 150deg, #0a0a10 210deg, #252530 270deg, #0e0e16 330deg, #111118 360deg)",
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.8)`,
        }}
      />

      {/* Dial face */}
      <div
        className="absolute w-[220px] h-[220px] md:w-[248px] md:h-[248px] rounded-full overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 35% 30%, rgba(${glowRgb},0.07) 0%, rgba(4,5,12,1) 55%, rgba(2,3,8,1) 100%)`,
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
      >
        {/* Dial texture ring */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            border: `1px solid rgba(${glowRgb},0.08)`,
            background: "transparent",
          }}
        />
        {/* Hour indices */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const isMain = i % 3 === 0;
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                style={{
                  width: isMain ? "1.5px" : "1px",
                  height: isMain ? "14px" : "9px",
                  marginLeft: isMain ? "-0.75px" : "-0.5px",
                  marginTop: "-106px",
                  background: isMain
                    ? `rgba(${glowRgb},0.9)`
                    : "rgba(255,255,255,0.45)",
                  boxShadow: isMain
                    ? `0 0 6px rgba(${glowRgb},0.8), 0 0 12px rgba(${glowRgb},0.4)`
                    : "none",
                  borderRadius: "1px",
                }}
              />
            </div>
          );
        })}

        {/* Minute hand */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 3600, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "100%" }}
        >
          <div
            style={{
              width: "1.5px",
              height: "76px",
              marginLeft: "-0.75px",
              marginTop: "-76px",
              background: `linear-gradient(to top, rgba(${glowRgb},0.15), rgba(255,255,255,0.9))`,
              borderRadius: "1px 1px 0 0",
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.4))",
            }}
          />
        </motion.div>

        {/* Hour hand */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 43200, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "100%" }}
        >
          <div
            style={{
              width: "2px",
              height: "54px",
              marginLeft: "-1px",
              marginTop: "-54px",
              background: `linear-gradient(to top, rgba(${glowRgb},0.2), rgba(255,255,255,0.85))`,
              borderRadius: "1px 1px 0 0",
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.3))",
            }}
          />
        </motion.div>

        {/* Seconds hand */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "75%" }}
        >
          <div
            style={{
              width: "1px",
              height: "90px",
              marginLeft: "-0.5px",
              marginTop: "-68px",
              background: `linear-gradient(to top, rgba(${glowRgb},0.0) 0%, rgba(${glowRgb},0.95) 70%, rgba(${glowRgb},0.7) 100%)`,
              borderRadius: "1px",
              filter: `drop-shadow(0 0 4px rgba(${glowRgb},0.9))`,
            }}
          />
        </motion.div>

        {/* Centre cap */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${glowRgb},1) 0%, rgba(${glowRgb},0.5) 100%)`,
            boxShadow: `0 0 8px rgba(${glowRgb},1), 0 0 20px rgba(${glowRgb},0.6)`,
          }}
        />

        {/* Brand text */}
        <div
          className="absolute bottom-[30%] left-1/2 -translate-x-1/2 text-center"
          style={{
            fontSize: "6px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          ALSAERON
        </div>

        {/* Sapphire crystal reflection */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Crown / winding stem */}
      <div
        className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-5 rounded-sm"
        style={{
          background:
            "linear-gradient(90deg, #1a1a22, #2e2e3c, #1a1a22)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Ring Visual ─── */
function RingVisual({ glowRgb }: { glowRgb: string }) {
  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center select-none">
      {/* Ambient glow */}
      <motion.div
        className="absolute w-52 h-52"
        style={{
          background: `radial-gradient(ellipse, rgba(${glowRgb},0.22) 0%, transparent 65%)`,
          filter: "blur(30px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ring band — outer ellipse (perspective view) */}
      <div
        className="absolute"
        style={{
          width: "200px",
          height: "90px",
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg, #0a0a0f 0deg, #3a3a4a 40deg, #c8c8d8 80deg, #f0f0f8 100deg, #d0d0e0 120deg, #8a8a9a 160deg, #1a1a24 200deg, #4a4a5a 240deg, #b0b0c0 280deg, #e8e8f0 300deg, #c0c0d0 320deg, #5a5a6a 340deg, #0a0a0f 360deg)",
          boxShadow: `0 12px 40px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8), inset 0 -2px 8px rgba(0,0,0,0.6), 0 0 30px rgba(${glowRgb},0.15)`,
        }}
      />

      {/* Ring band — inner hollow */}
      <div
        className="absolute"
        style={{
          width: "130px",
          height: "52px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 30%, rgba(${glowRgb},0.06) 0%, rgba(2,2,8,1) 70%)`,
          boxShadow: `inset 0 4px 16px rgba(0,0,0,0.98), inset 0 -2px 8px rgba(${glowRgb},0.06)`,
        }}
      />

      {/* Stone setting platform */}
      <div
        className="absolute"
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "4px",
          top: "calc(50% - 27px - 28px)",
          left: "calc(50% - 27px)",
          background:
            "linear-gradient(145deg, #1c1c28 0%, #2e2e3e 40%, #141420 100%)",
          transform: "rotate(45deg)",
          boxShadow: `0 4px 20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
      />

      {/* Crystal stone */}
      <motion.div
        className="absolute"
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "3px",
          top: "calc(50% - 19px - 28px)",
          left: "calc(50% - 19px)",
          transform: "rotate(45deg)",
          background: `radial-gradient(ellipse at 35% 30%, rgba(${glowRgb},0.9) 0%, rgba(${glowRgb},0.55) 35%, rgba(${glowRgb},0.15) 65%, rgba(2,4,20,0.9) 100%)`,
          boxShadow: `0 0 25px rgba(${glowRgb},0.7), 0 0 60px rgba(${glowRgb},0.35), inset 0 1px 3px rgba(255,255,255,0.3)`,
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Facet lines */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 40%, rgba(255,255,255,0.08) 60%, transparent 100%)",
            borderRadius: "3px",
          }}
        />
      </motion.div>

      {/* Reflection highlight on ring */}
      <div
        className="absolute"
        style={{
          width: "200px",
          height: "12px",
          borderRadius: "50%",
          top: "calc(50% - 45px)",
          left: "calc(50% - 100px)",
          background:
            "linear-gradient(to right, transparent 15%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 60%, transparent 85%)",
          pointerEvents: "none",
        }}
      />

      {/* Ground reflection */}
      <div
        className="absolute"
        style={{
          width: "180px",
          height: "20px",
          borderRadius: "50%",
          bottom: "10%",
          left: "calc(50% - 90px)",
          background: `radial-gradient(ellipse, rgba(${glowRgb},0.12) 0%, transparent 70%)`,
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}

/* ─── Bracelet Visual ─── */
function BraceletVisual({ glowRgb }: { glowRgb: string }) {
  const plateCount = 7;
  const plateW = 38;
  const plateH = 52;
  const gap = 4;
  const totalW = plateCount * (plateW + gap) - gap;
  const curveDepth = 18;

  return (
    <div className="relative w-72 h-64 md:w-80 md:h-72 flex items-center justify-center select-none">
      {/* Ambient glow beneath */}
      <motion.div
        className="absolute"
        style={{
          width: "280px",
          height: "60px",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse, rgba(${glowRgb},0.18) 0%, transparent 65%)`,
          filter: "blur(18px)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        width={totalW + 20}
        height={plateH + curveDepth + 40}
        viewBox={`0 0 ${totalW + 20} ${plateH + curveDepth + 40}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Nanocarbon plate gradient */}
          <linearGradient id="plate-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(40,42,52,1)" />
            <stop offset="30%" stopColor="rgba(18,20,28,1)" />
            <stop offset="70%" stopColor="rgba(10,11,16,1)" />
            <stop offset="100%" stopColor="rgba(22,24,32,1)" />
          </linearGradient>
          {/* Edge light */}
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`rgba(${glowRgb},0.0)`} />
            <stop offset="30%" stopColor={`rgba(${glowRgb},0.5)`} />
            <stop offset="70%" stopColor={`rgba(${glowRgb},0.5)`} />
            <stop offset="100%" stopColor={`rgba(${glowRgb},0.0)`} />
          </linearGradient>
          {/* Surface sheen */}
          <linearGradient id="sheen-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.01)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {Array.from({ length: plateCount }).map((_, i) => {
          const x = 10 + i * (plateW + gap);
          const curveOffset =
            Math.sin((i / (plateCount - 1)) * Math.PI) * curveDepth;
          const y = 20 + curveDepth - curveOffset;
          const rounding = 4;

          return (
            <g key={i}>
              {/* Drop shadow */}
              <rect
                x={x + 1}
                y={y + plateH + 2}
                width={plateW - 2}
                height={6}
                rx={3}
                fill={`rgba(${glowRgb},0.04)`}
                filter="url(#glow-filter)"
              />

              {/* Main plate body */}
              <rect
                x={x}
                y={y}
                width={plateW}
                height={plateH}
                rx={rounding}
                fill="url(#plate-grad)"
              />

              {/* Surface micro-texture lines */}
              {[8, 16, 24, 32, 40].map((ly) => (
                <line
                  key={ly}
                  x1={x + 5}
                  y1={y + ly}
                  x2={x + plateW - 5}
                  y2={y + ly}
                  stroke="rgba(255,255,255,0.025)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Surface sheen */}
              <rect
                x={x}
                y={y}
                width={plateW}
                height={plateH}
                rx={rounding}
                fill="url(#sheen-grad)"
              />

              {/* Top edge highlight */}
              <rect
                x={x + 2}
                y={y}
                width={plateW - 4}
                height={2}
                rx={1}
                fill="url(#edge-grad)"
                opacity={0.8}
              />

              {/* Bottom edge shadow */}
              <rect
                x={x + 2}
                y={y + plateH - 2}
                width={plateW - 4}
                height={2}
                rx={1}
                fill="rgba(0,0,0,0.6)"
              />

              {/* Side glow accent */}
              <rect
                x={x}
                y={y + 8}
                width={1.5}
                height={plateH - 16}
                rx={0.75}
                fill={`rgba(${glowRgb},0.35)`}
                opacity={i % 2 === 0 ? 0.7 : 0.4}
              />

              {/* Plate border */}
              <rect
                x={x + 0.5}
                y={y + 0.5}
                width={plateW - 1}
                height={plateH - 1}
                rx={rounding - 0.5}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />

              {/* Hinge connector */}
              {i < plateCount - 1 && (
                <rect
                  x={x + plateW}
                  y={y + plateH / 2 - 3}
                  width={gap}
                  height={6}
                  fill="rgba(30,32,42,1)"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="0.5"
                />
              )}
            </g>
          );
        })}

        {/* Clasp accent line */}
        <line
          x1={10}
          y1={20 + curveDepth + plateH + 14}
          x2={totalW + 10}
          y2={20 + curveDepth + plateH + 14}
          stroke={`rgba(${glowRgb},0.12)`}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/* ─── Dispatch to correct visual ─── */
function ProductVisual({ product }: { product: Product }) {
  const { glowRgb, shape } = product;
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      {/* Background radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${glowRgb},0.055) 0%, transparent 68%)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        {shape === "circle" && <WatchVisual glowRgb={glowRgb} />}
        {shape === "diamond" && <RingVisual glowRgb={glowRgb} />}
        {shape === "hexagon" && <BraceletVisual glowRgb={glowRgb} />}
      </motion.div>
    </div>
  );
}

/* ─── Acquisition Modal ─── */
function AcquireModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.78)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.5, ease }}
        style={{
          background: "rgba(2,2,6,0.98)",
          border: `1px solid rgba(${product.glowRgb}, 0.14)`,
          boxShadow: `0 0 80px rgba(${product.glowRgb}, 0.09)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${product.glowRgb}, 0.55), transparent)`,
          }}
        />
        <div className="p-8 md:p-12">
          <button
            onClick={onClose}
            data-testid="button-close-modal"
            className="absolute top-6 right-6 text-white/25 hover:text-white/70 transition-colors duration-300 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <p
            className="text-[9px] tracking-[0.38em] font-sans uppercase mb-6"
            style={{ color: `rgba(${product.glowRgb}, 0.65)` }}
          >
            Request Acquisition
          </p>
          <h3 className="text-2xl md:text-[1.7rem] font-serif text-white mb-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-white/28 font-sans font-light mb-9 tracking-wide">
            {product.price} — {product.priceNote}
          </p>
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: "Full Name", type: "text", id: "input-acquire-name", placeholder: "Your name" },
              { label: "Email Address", type: "email", id: "input-acquire-email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label className="text-[9px] tracking-[0.28em] text-white/28 font-sans uppercase">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  data-testid={field.id}
                  placeholder={field.placeholder}
                  className="bg-transparent border-b border-white/[0.08] focus:border-white/25 pb-3 text-white/72 placeholder:text-white/14 focus:outline-none transition-colors duration-500 font-light text-sm"
                  style={{ caretColor: `rgba(${product.glowRgb}, 0.8)` }}
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.28em] text-white/28 font-sans uppercase">
                Message (optional)
              </label>
              <textarea
                data-testid="input-acquire-message"
                rows={3}
                placeholder="Tell us about yourself..."
                className="bg-transparent border-b border-white/[0.08] focus:border-white/25 pb-3 text-white/72 placeholder:text-white/14 focus:outline-none transition-colors duration-500 font-light text-sm resize-none"
                style={{ caretColor: `rgba(${product.glowRgb}, 0.8)` }}
              />
            </div>
            <button
              type="submit"
              data-testid="button-submit-acquisition"
              className="mt-1 w-full py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer text-black transition-all duration-600"
              style={{ background: "rgba(255,255,255,0.93)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px rgba(${product.glowRgb}, 0.28)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Submit Request
            </button>
          </form>
          <p className="mt-6 text-[9px] text-white/18 text-center font-sans leading-relaxed">
            Your inquiry is reviewed within 48 hours by our private concierge.
            <br />
            All communications are strictly confidential.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const product = getProductBySlug(params.slug || "");
  const adjacent = product ? getAdjacentProducts(params.slug || "") : null;

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 80]), {
    stiffness: 42,
    damping: 26,
    restDelta: 0.001,
  });
  const heroBgY = useSpring(useTransform(heroScroll, [0, 1], [0, 55]), {
    stiffness: 32,
    damping: 20,
    restDelta: 0.001,
  });
  const visualY = useSpring(useTransform(storyScroll, [0, 1], [-22, 22]), {
    stiffness: 32,
    damping: 18,
    restDelta: 0.001,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/35 font-serif text-2xl mb-5">Artifact not found.</p>
          <button
            onClick={() => setLocation("/")}
            className="text-[10px] tracking-[0.24em] text-primary/55 hover:text-primary font-sans uppercase transition-colors duration-400"
          >
            Return to ALSAERON
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <AnimatePresence>
        {modalOpen && (
          <AcquireModal key="modal" product={product} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${product.heroImage})`, y: heroBgY }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.52) 40%, rgba(0,0,0,0.82) 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${product.glowRgb}, 0.1) 0%, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.009) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.009) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto will-change-transform"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.38em" }}
            transition={{ duration: 1.8, delay: 0.15, ease }}
            className="text-[9px] md:text-[10px] font-sans uppercase mb-6"
            style={{ color: `rgba(${product.glowRgb}, 0.72)` }}
            data-testid="text-product-category"
          >
            {product.category}
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease }}
              className="font-serif text-white tracking-[0.05em] leading-none"
              style={{
                fontSize: "clamp(2rem,6.5vw,5.5rem)",
                textShadow: `0 0 80px rgba(${product.glowRgb}, 0.22), 0 2px 40px rgba(0,0,0,0.6)`,
              }}
              data-testid="text-product-name"
            >
              {product.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
            className="text-base md:text-xl font-serif font-light italic text-white/42 tracking-wide max-w-xl mx-auto"
            data-testid="text-product-tagline"
          >
            {product.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.15, ease }}
            className="mt-8 mx-auto"
            style={{ originX: "50%" }}
          >
            <div
              className="w-20 h-[1px] mx-auto"
              style={{
                background: `linear-gradient(to right, transparent, rgba(${product.glowRgb}, 0.55), transparent)`,
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.2 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[8px] tracking-[0.4em] text-white/20 font-sans uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          >
            <ArrowDown size={13} strokeWidth={1} className="text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── VISUAL + STORY ─── */}
      <section ref={storyRef} className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Sticky product visual */}
          <motion.div
            className="relative flex items-center justify-center min-h-[70vh] lg:min-h-screen lg:sticky lg:top-0 will-change-transform"
            style={{ y: visualY }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${product.glowRgb},0.05) 0%, transparent 68%)`,
              }}
            />
            <div className="relative w-full h-full min-h-[70vh] lg:min-h-screen">
              <ProductVisual product={product} />
            </div>
          </motion.div>

          {/* Story */}
          <div className="flex flex-col justify-center py-20 md:py-36 px-8 md:px-14 lg:pl-8 lg:pr-20 border-l border-white/[0.04]">
            <FadeIn className="mb-12 md:mb-16">
              <div
                className="w-10 h-[1px] mb-8"
                style={{ background: `rgba(${product.glowRgb}, 0.5)` }}
              />
              <p
                className="text-[9px] tracking-[0.32em] font-sans uppercase mb-4"
                style={{ color: `rgba(${product.glowRgb}, 0.6)` }}
              >
                The Object
              </p>
              <h2 className="text-[1.35rem] md:text-2xl font-serif text-white leading-snug mb-4">
                {product.description}
              </h2>
              <p className="text-xs text-white/28 font-sans font-light tracking-wide">
                {product.priceNote}
              </p>
            </FadeIn>

            <div className="space-y-9 md:space-y-11 mb-14 md:mb-16">
              {product.story.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.09}>
                  <p className="text-[0.875rem] md:text-[0.95rem] text-white/50 font-light leading-[1.95]">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.18}>
              <div className="flex items-baseline gap-3 mb-10">
                <span
                  className="text-4xl md:text-5xl font-serif text-white tabular-nums"
                  data-testid="text-product-price"
                >
                  {product.price}
                </span>
                <span className="text-[10px] text-white/22 font-sans tracking-wider">USD</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  data-testid="button-acquire"
                  onClick={() => setModalOpen(true)}
                  className="flex-1 py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer text-black transition-all duration-600"
                  style={{ background: "rgba(255,255,255,0.93)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 50px rgba(${product.glowRgb},0.24)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Request Acquisition
                </button>
                <button
                  data-testid="button-private-consult"
                  className="flex-1 py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer transition-all duration-600"
                  style={{
                    border: `1px solid rgba(${product.glowRgb},0.22)`,
                    color: `rgba(${product.glowRgb},0.65)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${product.glowRgb},0.55)`;
                    (e.currentTarget as HTMLButtonElement).style.color = `rgba(${product.glowRgb},1)`;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px rgba(${product.glowRgb},0.1), inset 0 0 20px rgba(${product.glowRgb},0.04)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${product.glowRgb},0.22)`;
                    (e.currentTarget as HTMLButtonElement).style.color = `rgba(${product.glowRgb},0.65)`;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Private Consult
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── SPECIFICATIONS ─── */}
      <section className="py-24 md:py-36 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <FadeIn className="mb-14 md:mb-18">
            <p
              className="text-[9px] tracking-[0.32em] font-sans uppercase mb-5"
              style={{ color: `rgba(${product.glowRgb},0.6)` }}
            >
              Technical Composition
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Specifications</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {product.specs.map((spec, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="py-6 md:py-8 border-b border-white/[0.04] flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 group">
                  <p className="text-[9px] tracking-[0.26em] text-white/22 font-sans uppercase sm:min-w-[180px] shrink-0 group-hover:text-white/38 transition-colors duration-500">
                    {spec.label}
                  </p>
                  <p className="text-sm text-white/55 font-serif font-light group-hover:text-white/75 transition-colors duration-500">
                    {spec.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACQUIRE CTA ─── */}
      <section className="py-24 md:py-36 relative overflow-hidden border-t border-white/[0.04]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 50% 50%, rgba(${product.glowRgb},0.045) 0%, transparent 70%)`,
          }}
        />
        <div className="container mx-auto px-6 md:px-16 max-w-2xl text-center relative z-10">
          <FadeIn>
            <div
              className="w-px h-16 mx-auto mb-10"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(${product.glowRgb},0.45), transparent)`,
              }}
            />
            <p
              className="text-[9px] tracking-[0.38em] font-sans uppercase mb-5"
              style={{ color: `rgba(${product.glowRgb},0.45)` }}
            >
              Crafted Beyond Time
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-5 leading-[1.15]">
              This piece will outlast
              <br />
              <span className="text-white/32">everything you know.</span>
            </h2>
            <p className="text-sm text-white/32 font-light leading-[1.9] mb-11 max-w-md mx-auto">
              Acquisition of an ALSAERON piece begins with an inquiry. Our private
              concierge responds within 48 hours to arrange a consultation at an
              atelier of your choosing.
            </p>
            <button
              data-testid="button-acquire-cta"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-4 px-10 md:px-14 py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black cursor-pointer transition-all duration-600"
              style={{ background: "rgba(255,255,255,0.93)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 60px rgba(${product.glowRgb},0.28)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Acquire Now
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
            <div
              className="w-px h-16 mx-auto mt-10"
              style={{
                background: `linear-gradient(to bottom, rgba(${product.glowRgb},0.45), transparent)`,
              }}
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── ADJACENT NAVIGATION ─── */}
      {(adjacent?.prev || adjacent?.next) && (
        <section className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {adjacent?.prev ? (
              <motion.button
                data-testid={`link-prev-product-${adjacent.prev.slug}`}
                onClick={() => setLocation(`/product/${adjacent.prev!.slug}`)}
                className="group p-10 md:p-16 text-left border-r border-white/[0.04] hover:bg-white/[0.008] transition-colors duration-700 cursor-pointer overflow-hidden relative"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.5, ease }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 20% 50%, rgba(${adjacent.prev.glowRgb},0.04) 0%, transparent 70%)`,
                  }}
                />
                <p className="text-[9px] tracking-[0.3em] text-white/18 font-sans uppercase mb-4 flex items-center gap-2">
                  <ArrowLeft size={12} strokeWidth={1} /> Previous
                </p>
                <p
                  className="text-[9px] tracking-[0.22em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.prev.glowRgb},0.45)` }}
                >
                  {adjacent.prev.category}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-white/60 group-hover:text-white transition-colors duration-600">
                  {adjacent.prev.name}
                </h3>
              </motion.button>
            ) : (
              <div className="border-r border-white/[0.04]" />
            )}
            {adjacent?.next && (
              <motion.button
                data-testid={`link-next-product-${adjacent.next.slug}`}
                onClick={() => setLocation(`/product/${adjacent.next!.slug}`)}
                className="group p-10 md:p-16 text-right hover:bg-white/[0.008] transition-colors duration-700 cursor-pointer overflow-hidden relative w-full"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.5, ease }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 80% 50%, rgba(${adjacent.next.glowRgb},0.04) 0%, transparent 70%)`,
                  }}
                />
                <p className="text-[9px] tracking-[0.3em] text-white/18 font-sans uppercase mb-4 flex items-center justify-end gap-2">
                  Next <ArrowRight size={12} strokeWidth={1} />
                </p>
                <p
                  className="text-[9px] tracking-[0.22em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.next.glowRgb},0.45)` }}
                >
                  {adjacent.next.category}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-white/60 group-hover:text-white transition-colors duration-600">
                  {adjacent.next.name}
                </h3>
              </motion.button>
            )}
          </div>
        </section>
      )}

      <div className="py-10 flex justify-center border-t border-white/[0.04]">
        <button
          data-testid="link-back-collections"
          onClick={() => setLocation("/")}
          className="flex items-center gap-3 text-[9px] tracking-[0.28em] text-white/22 hover:text-white transition-colors duration-500 font-sans uppercase cursor-pointer"
        >
          <ArrowLeft size={11} strokeWidth={1} /> Return to Collections
        </button>
      </div>

      <Footer />
    </div>
  );
}
