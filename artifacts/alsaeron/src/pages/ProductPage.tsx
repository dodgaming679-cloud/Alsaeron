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
import { getProductBySlug, getAdjacentProducts, type Product } from "@/lib/products";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 24,
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
      transition={{ duration: 1.1, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

function ProductVisual({ product }: { product: Product }) {
  const { glowRgb, shape } = product;

  if (shape === "circle") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full"
          style={{ border: `1px solid rgba(${glowRgb}, 0.08)` }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full"
          style={{ border: `1px solid rgba(${glowRgb}, 0.12)` }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[220px] h-[220px] md:w-[290px] md:h-[290px] rounded-full"
          style={{ border: `0.5px solid rgba(${glowRgb}, 0.2)` }}
        />

        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${glowRgb}, 0.25) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
          style={{ border: `1px solid rgba(${glowRgb}, 0.3)` }}>
          <div className="absolute inset-3 rounded-full"
            style={{ background: `rgba(${glowRgb}, 0.06)`, backdropFilter: "blur(10px)" }} />
          <div className="w-5 h-5 rounded-full"
            style={{
              background: `rgba(${glowRgb}, 0.9)`,
              boxShadow: `0 0 30px rgba(${glowRgb}, 1), 0 0 80px rgba(${glowRgb}, 0.5)`,
            }} />
        </div>

        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `rgba(${glowRgb}, 0.6)`,
              boxShadow: `0 0 6px rgba(${glowRgb}, 0.8)`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 145}px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 145}px)`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: deg / 120, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (shape === "diamond") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {[200, 280, 360].map((size, i) => (
          <motion.div
            key={size}
            className="absolute"
            style={{
              width: size,
              height: size,
              border: `${0.5 + i * 0.3}px solid rgba(${glowRgb}, ${0.08 + i * 0.04})`,
              transform: `rotate(${45 + i * 15}deg)`,
            }}
            animate={{ rotate: [45 + i * 15, 45 + i * 15 + (i % 2 === 0 ? 360 : -360)] }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-48 h-48"
          style={{
            background: `radial-gradient(circle, rgba(${glowRgb}, 0.2) 0%, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />

        <motion.div
          className="relative z-10 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
          animate={{ rotate: [45, 45 + 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ border: `1px solid rgba(${glowRgb}, 0.4)`, transform: "rotate(45deg)" }}
        >
          <div className="w-8 h-8 md:w-10 md:h-10"
            style={{
              background: `rgba(${glowRgb}, 0.15)`,
              backdropFilter: "blur(10px)",
            }} />
        </motion.div>

        <div className="absolute w-4 h-4 z-20"
          style={{
            background: `rgba(${glowRgb}, 0.95)`,
            transform: "rotate(45deg)",
            boxShadow: `0 0 30px rgba(${glowRgb}, 1), 0 0 100px rgba(${glowRgb}, 0.5)`,
          }} />

        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute"
            style={{
              width: 2,
              height: 2,
              background: `rgba(${glowRgb}, 0.7)`,
              boxShadow: `0 0 8px rgba(${glowRgb}, 0.9)`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 160}px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 160}px)`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: deg / 180, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[1, 0.7, 0.4].map((scale, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          className="absolute"
          style={{ width: 320 * scale, height: 320 * scale, opacity: 0.08 + i * 0.06 }}
          animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
          transition={{ duration: 40 - i * 10, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="50,3 97,27.5 97,72.5 50,97 3,72.5 3,27.5"
            fill="none"
            stroke={`rgba(${glowRgb}, 1)`}
            strokeWidth="0.8"
          />
        </motion.svg>
      ))}

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48"
        style={{
          background: `radial-gradient(circle, rgba(${glowRgb}, 0.22) 0%, transparent 70%)`,
          filter: "blur(25px)",
        }}
      />

      <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-sm rotate-12"
        style={{
          background: `rgba(${glowRgb}, 0.12)`,
          border: `1px solid rgba(${glowRgb}, 0.35)`,
          backdropFilter: "blur(10px)",
        }}>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-sm"
          style={{
            background: `rgba(${glowRgb}, 0.9)`,
            boxShadow: `0 0 24px rgba(${glowRgb}, 1), 0 0 80px rgba(${glowRgb}, 0.5)`,
          }} />
      </div>

      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <motion.div
          key={deg}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(${glowRgb}, 0.7)`,
            boxShadow: `0 0 6px rgba(${glowRgb}, 0.9)`,
            top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 130}px)`,
            left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 130}px)`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: deg / 180, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AcquireModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        style={{
          background: "rgba(0,0,0,0.95)",
          border: `1px solid rgba(${product.glowRgb}, 0.15)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${product.glowRgb}, 0.6), transparent)`,
          }}
        />

        <div className="p-8 md:p-12">
          <button
            onClick={onClose}
            data-testid="button-close-modal"
            className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>

          <p
            className="text-[9px] tracking-[0.35em] font-sans uppercase mb-6"
            style={{ color: `rgba(${product.glowRgb}, 0.7)` }}
          >
            Request Acquisition
          </p>
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-white/30 font-light mb-8 font-sans">
            {product.price} — {product.priceNote}
          </p>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.25em] text-white/30 font-sans uppercase">
                Full Name
              </label>
              <input
                type="text"
                data-testid="input-acquire-name"
                placeholder="Your name"
                className="bg-transparent border-b border-white/10 focus:border-white/30 pb-3 text-white/80 placeholder:text-white/15 focus:outline-none transition-colors duration-500 font-light text-sm"
                style={{ caretColor: `rgba(${product.glowRgb}, 0.8)` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.25em] text-white/30 font-sans uppercase">
                Email Address
              </label>
              <input
                type="email"
                data-testid="input-acquire-email"
                placeholder="your@email.com"
                className="bg-transparent border-b border-white/10 focus:border-white/30 pb-3 text-white/80 placeholder:text-white/15 focus:outline-none transition-colors duration-500 font-light text-sm"
                style={{ caretColor: `rgba(${product.glowRgb}, 0.8)` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.25em] text-white/30 font-sans uppercase">
                Message (optional)
              </label>
              <textarea
                data-testid="input-acquire-message"
                rows={3}
                placeholder="Tell us about yourself..."
                className="bg-transparent border-b border-white/10 focus:border-white/30 pb-3 text-white/80 placeholder:text-white/15 focus:outline-none transition-colors duration-500 font-light text-sm resize-none"
                style={{ caretColor: `rgba(${product.glowRgb}, 0.8)` }}
              />
            </div>
            <button
              type="submit"
              data-testid="button-submit-acquisition"
              className="mt-3 w-full py-4 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-700 cursor-pointer text-black"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: `0 0 0 rgba(${product.glowRgb},0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 0 40px rgba(${product.glowRgb}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 transparent";
              }}
            >
              Submit Request
            </button>
          </form>

          <p className="mt-6 text-[9px] text-white/20 text-center font-sans leading-relaxed">
            Your inquiry is reviewed within 48 hours by our private concierge.
            <br />
            All communications are strictly confidential.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

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

  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 100]), {
    stiffness: 60,
    damping: 30,
  });
  const visualY = useSpring(useTransform(storyScroll, [0, 1], [-30, 30]), {
    stiffness: 40,
    damping: 20,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 font-serif text-2xl mb-4">Artifact not found.</p>
          <button
            onClick={() => setLocation("/")}
            className="text-xs tracking-[0.2em] text-primary/60 hover:text-primary font-sans uppercase transition-colors"
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
          <AcquireModal product={product} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${product.glowRgb}, 0.08) 0%, transparent 70%)`,
                `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${product.glowRgb}, 0.12) 0%, transparent 70%)`,
                `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${product.glowRgb}, 0.08) 0%, transparent 70%)`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.8, delay: 0.2, ease: easeOutExpo }}
            className="text-[9px] md:text-[10px] font-sans uppercase mb-6"
            style={{ color: `rgba(${product.glowRgb}, 0.7)` }}
            data-testid="text-product-category"
          >
            {product.category}
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: easeOutExpo }}
              className="text-[clamp(2rem,7vw,6rem)] font-serif text-white tracking-[0.06em] leading-none"
              style={{
                textShadow: `0 0 80px rgba(${product.glowRgb}, 0.2), 0 0 200px rgba(${product.glowRgb}, 0.08)`,
              }}
              data-testid="text-product-name"
            >
              {product.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: easeOutExpo }}
            className="text-base md:text-xl font-serif font-light italic text-white/40 tracking-wide max-w-xl mx-auto"
            data-testid="text-product-tagline"
          >
            {product.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] tracking-[0.35em] text-white/20 font-sans uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ArrowDown size={13} strokeWidth={1} className="text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── VISUAL + DESCRIPTION ─── */}
      <section ref={storyRef} className="relative py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <motion.div
            className="relative flex items-center justify-center min-h-[60vh] lg:min-h-screen sticky top-0"
            style={{ y: visualY }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${product.glowRgb}, 0.06) 0%, transparent 70%)`,
              }}
            />
            <div className="relative w-full h-full min-h-[60vh] lg:min-h-screen">
              <ProductVisual product={product} />
            </div>
          </motion.div>

          <div className="flex flex-col justify-center py-20 md:py-32 px-8 md:px-16 lg:pl-8 lg:pr-20 border-l border-white/5">
            <FadeIn className="mb-12 md:mb-16">
              <div
                className="w-12 h-[1px] mb-8"
                style={{ background: `rgba(${product.glowRgb}, 0.5)` }}
              />
              <p
                className="text-[9px] tracking-[0.3em] font-sans uppercase mb-5"
                style={{ color: `rgba(${product.glowRgb}, 0.6)` }}
              >
                The Object
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-white leading-snug mb-6">
                {product.description}
              </h2>
              <p className="text-sm text-white/40 font-sans font-light leading-relaxed">
                {product.priceNote}
              </p>
            </FadeIn>

            <div className="space-y-8 md:space-y-10 mb-12 md:mb-16">
              {product.story.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p className="text-sm md:text-base text-white/55 font-light leading-[1.9]">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <div className="flex items-baseline gap-4 mb-10">
                <span
                  className="text-4xl md:text-5xl font-serif text-white"
                  data-testid="text-product-price"
                >
                  {product.price}
                </span>
                <span className="text-xs text-white/25 font-sans tracking-wider">USD</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  data-testid="button-acquire"
                  onClick={() => setModalOpen(true)}
                  className="flex-1 py-4 md:py-5 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-700 cursor-pointer text-black"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      `0 0 50px rgba(${product.glowRgb}, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Request Acquisition
                </button>
                <button
                  data-testid="button-private-consult"
                  className="flex-1 py-4 md:py-5 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-700 cursor-pointer"
                  style={{
                    border: `1px solid rgba(${product.glowRgb}, 0.25)`,
                    color: `rgba(${product.glowRgb}, 0.7)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      `rgba(${product.glowRgb}, 0.6)`;
                    (e.currentTarget as HTMLButtonElement).style.color = `rgba(${product.glowRgb}, 1)`;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      `0 0 30px rgba(${product.glowRgb}, 0.12), inset 0 0 20px rgba(${product.glowRgb}, 0.05)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      `rgba(${product.glowRgb}, 0.25)`;
                    (e.currentTarget as HTMLButtonElement).style.color =
                      `rgba(${product.glowRgb}, 0.7)`;
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
      <section className="py-24 md:py-36 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <FadeIn className="mb-14 md:mb-20">
            <p
              className="text-[9px] tracking-[0.3em] font-sans uppercase mb-5"
              style={{ color: `rgba(${product.glowRgb}, 0.6)` }}
            >
              Technical Composition
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Specifications</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {product.specs.map((spec, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="py-6 md:py-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 group"
                >
                  <p className="text-[9px] tracking-[0.25em] text-white/25 font-sans uppercase sm:min-w-[180px] shrink-0 group-hover:text-white/40 transition-colors duration-500">
                    {spec.label}
                  </p>
                  <p className="text-sm text-white/65 font-serif font-light group-hover:text-white/80 transition-colors duration-500">
                    {spec.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACQUIRE CTA ─── */}
      <section className="py-24 md:py-36 relative overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(${product.glowRgb}, 0.05) 0%, transparent 70%)`,
          }}
        />
        <div className="container mx-auto px-6 md:px-16 max-w-3xl text-center relative z-10">
          <FadeIn>
            <div
              className="w-px h-16 mx-auto mb-10"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(${product.glowRgb}, 0.5), transparent)`,
              }}
            />
            <p className="text-[9px] tracking-[0.35em] font-sans uppercase mb-5"
              style={{ color: `rgba(${product.glowRgb}, 0.5)` }}>
              Crafted Beyond Time
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
              This piece will outlast
              <br />
              <span className="text-white/35">everything you know.</span>
            </h2>
            <p className="text-sm text-white/35 font-light leading-relaxed mb-12 max-w-lg mx-auto">
              Acquisition of an ALSAERON piece begins with an inquiry. Our private concierge
              responds within 48 hours to arrange a consultation at an atelier of your choosing.
            </p>
            <button
              data-testid="button-acquire-cta"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-4 px-12 py-5 text-[10px] tracking-[0.3em] font-sans uppercase text-black cursor-pointer transition-all duration-700"
              style={{ background: "rgba(255,255,255,0.95)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 0 60px rgba(${product.glowRgb}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Acquire Now
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <div
              className="w-px h-16 mx-auto mt-10"
              style={{
                background: `linear-gradient(to bottom, rgba(${product.glowRgb}, 0.5), transparent)`,
              }}
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── ADJACENT PRODUCTS ─── */}
      {(adjacent?.prev || adjacent?.next) && (
        <section className="border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {adjacent?.prev && (
              <motion.button
                data-testid={`link-prev-product-${adjacent.prev.slug}`}
                onClick={() => setLocation(`/product/${adjacent.prev!.slug}`)}
                className="group p-10 md:p-16 text-left border-r border-white/5 hover:bg-white/[0.01] transition-colors duration-700 cursor-pointer"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
              >
                <p className="text-[9px] tracking-[0.3em] text-white/20 font-sans uppercase mb-4 flex items-center gap-2">
                  <ArrowLeft size={12} strokeWidth={1} />
                  Previous
                </p>
                <p className="text-[9px] tracking-[0.2em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.prev.glowRgb}, 0.5)` }}>
                  {adjacent.prev.category}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-white/70 group-hover:text-white transition-colors duration-500">
                  {adjacent.prev.name}
                </h3>
              </motion.button>
            )}
            {!adjacent?.prev && <div className="border-r border-white/5" />}
            {adjacent?.next && (
              <motion.button
                data-testid={`link-next-product-${adjacent.next.slug}`}
                onClick={() => setLocation(`/product/${adjacent.next!.slug}`)}
                className="group p-10 md:p-16 text-right hover:bg-white/[0.01] transition-colors duration-700 cursor-pointer ml-auto w-full"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
              >
                <p className="text-[9px] tracking-[0.3em] text-white/20 font-sans uppercase mb-4 flex items-center justify-end gap-2">
                  Next
                  <ArrowRight size={12} strokeWidth={1} />
                </p>
                <p className="text-[9px] tracking-[0.2em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.next.glowRgb}, 0.5)` }}>
                  {adjacent.next.category}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-white/70 group-hover:text-white transition-colors duration-500">
                  {adjacent.next.name}
                </h3>
              </motion.button>
            )}
          </div>
        </section>
      )}

      {/* ─── BACK TO COLLECTIONS ─── */}
      <div className="py-10 flex justify-center border-t border-white/5">
        <button
          data-testid="link-back-collections"
          onClick={() => setLocation("/")}
          className="flex items-center gap-3 text-[9px] tracking-[0.25em] text-white/25 hover:text-white transition-colors duration-500 font-sans uppercase"
        >
          <ArrowLeft size={12} strokeWidth={1} />
          Return to Collections
        </button>
      </div>

      <Footer />
    </div>
  );
}
