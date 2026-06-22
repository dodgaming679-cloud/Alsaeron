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

/* ─── Animated Geometric Visual ─── */
function ProductVisual({ product }: { product: Product }) {
  const { glowRgb, shape } = product;

  if (shape === "circle") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {[500, 380, 270].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `${i === 2 ? 0.8 : 0.5}px solid rgba(${glowRgb}, ${0.06 + i * 0.05})`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 55 - i * 12, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div
          className="absolute w-52 h-52 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${glowRgb}, 0.22) 0%, transparent 70%)`,
            filter: "blur(22px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center"
          style={{ border: `1px solid rgba(${glowRgb}, 0.28)` }}
        >
          <div
            className="absolute inset-3 rounded-full"
            style={{ background: `rgba(${glowRgb}, 0.06)`, backdropFilter: "blur(10px)" }}
          />
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background: `rgba(${glowRgb}, 0.92)`,
              boxShadow: `0 0 28px rgba(${glowRgb}, 1), 0 0 70px rgba(${glowRgb}, 0.45)`,
            }}
          />
        </div>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `rgba(${glowRgb}, 0.65)`,
              boxShadow: `0 0 5px rgba(${glowRgb}, 0.9)`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 138}px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 138}px)`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: deg / 120, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  if (shape === "diamond") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {[360, 270, 180].map((size, i) => (
          <motion.div
            key={size}
            className="absolute"
            style={{
              width: size,
              height: size,
              border: `${0.5 + i * 0.3}px solid rgba(${glowRgb}, ${0.06 + i * 0.05})`,
            }}
            animate={{ rotate: [45 + i * 12, 45 + i * 12 + (i % 2 === 0 ? 360 : -360)] }}
            transition={{ duration: 38 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div
          className="absolute w-48 h-48"
          style={{
            background: `radial-gradient(circle, rgba(${glowRgb}, 0.2) 0%, transparent 70%)`,
            filter: "blur(28px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative z-10 w-24 h-24 flex items-center justify-center"
          style={{ border: `1px solid rgba(${glowRgb}, 0.35)`, transform: "rotate(45deg)" }}
        >
          <div
            className="w-10 h-10"
            style={{ background: `rgba(${glowRgb}, 0.1)`, backdropFilter: "blur(10px)" }}
          />
        </div>
        <div
          className="absolute w-4 h-4 z-20"
          style={{
            background: `rgba(${glowRgb}, 0.95)`,
            transform: "rotate(45deg)",
            boxShadow: `0 0 28px rgba(${glowRgb}, 1), 0 0 90px rgba(${glowRgb}, 0.45)`,
          }}
        />
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-[2px] h-[2px]"
            style={{
              background: `rgba(${glowRgb}, 0.75)`,
              boxShadow: `0 0 7px rgba(${glowRgb}, 0.9)`,
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 155}px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 155}px)`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2.2, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: deg / 180, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[1, 0.68, 0.38].map((scale, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          className="absolute"
          style={{ width: 300 * scale, height: 300 * scale, opacity: 0.1 + i * 0.06 }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 44 - i * 10, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="50,3 97,27.5 97,72.5 50,97 3,72.5 3,27.5"
            fill="none"
            stroke={`rgba(${glowRgb}, 1)`}
            strokeWidth="0.7"
          />
        </motion.svg>
      ))}
      <motion.div
        className="absolute w-44 h-44"
        style={{
          background: `radial-gradient(circle, rgba(${glowRgb}, 0.22) 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="relative z-10 w-20 h-20 flex items-center justify-center rounded-sm rotate-12"
        style={{
          background: `rgba(${glowRgb}, 0.1)`,
          border: `1px solid rgba(${glowRgb}, 0.32)`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="w-8 h-8 rounded-sm"
          style={{
            background: `rgba(${glowRgb}, 0.92)`,
            boxShadow: `0 0 22px rgba(${glowRgb}, 1), 0 0 75px rgba(${glowRgb}, 0.45)`,
          }}
        />
      </div>
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <motion.div
          key={deg}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `rgba(${glowRgb}, 0.7)`,
            boxShadow: `0 0 5px rgba(${glowRgb}, 0.9)`,
            top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 125}px)`,
            left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 125}px)`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.6, 1.6, 0.6] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: deg / 180, ease: "easeInOut" }}
        />
      ))}
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
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.55, ease }}
        style={{
          background: "rgba(2,2,5,0.97)",
          border: `1px solid rgba(${product.glowRgb}, 0.14)`,
          boxShadow: `0 0 80px rgba(${product.glowRgb}, 0.08)`,
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
            className="absolute top-6 right-6 text-white/25 hover:text-white/70 transition-colors duration-300"
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
              className="mt-1 w-full py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer text-black transition-all duration-700"
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

  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 90]), {
    stiffness: 55,
    damping: 28,
  });
  const heroBgY = useSpring(useTransform(heroScroll, [0, 1], [0, 60]), {
    stiffness: 40,
    damping: 22,
  });
  const visualY = useSpring(useTransform(storyScroll, [0, 1], [-28, 28]), {
    stiffness: 38,
    damping: 18,
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
          <AcquireModal
            key="modal"
            product={product}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        {/* Real hero background photo with parallax */}
        <motion.div
          className="absolute inset-[-8%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${product.heroImage})`,
            y: heroBgY,
          }}
        />
        {/* Multi-layer dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.78) 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(${product.glowRgb}, 0.1) 0%, transparent 65%)`,
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto"
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
              transition={{ duration: 1.45, delay: 0.35, ease }}
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
            transition={{ duration: 1.2, delay: 0.85, ease }}
            className="text-base md:text-xl font-serif font-light italic text-white/42 tracking-wide max-w-xl mx-auto"
            data-testid="text-product-tagline"
          >
            {product.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2, ease }}
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
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[8px] tracking-[0.4em] text-white/20 font-sans uppercase">
            Scroll
          </span>
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
            className="relative flex items-center justify-center min-h-[62vh] lg:min-h-screen lg:sticky lg:top-0"
            style={{ y: visualY }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${product.glowRgb}, 0.055) 0%, transparent 70%)`,
              }}
            />
            <div className="relative w-full h-full min-h-[62vh] lg:min-h-screen">
              <ProductVisual product={product} />
            </div>
          </motion.div>

          {/* Story scroll */}
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
                  className="flex-1 py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer text-black transition-all duration-700"
                  style={{ background: "rgba(255,255,255,0.93)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 50px rgba(${product.glowRgb}, 0.24)`;
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
                  className="flex-1 py-4 text-[10px] tracking-[0.32em] font-sans uppercase cursor-pointer transition-all duration-700"
                  style={{
                    border: `1px solid rgba(${product.glowRgb}, 0.22)`,
                    color: `rgba(${product.glowRgb}, 0.65)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${product.glowRgb}, 0.55)`;
                    (e.currentTarget as HTMLButtonElement).style.color = `rgba(${product.glowRgb}, 1)`;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px rgba(${product.glowRgb}, 0.1), inset 0 0 20px rgba(${product.glowRgb}, 0.04)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(${product.glowRgb}, 0.22)`;
                    (e.currentTarget as HTMLButtonElement).style.color = `rgba(${product.glowRgb}, 0.65)`;
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
              style={{ color: `rgba(${product.glowRgb}, 0.6)` }}
            >
              Technical Composition
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Specifications
            </h2>
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
            background: `radial-gradient(ellipse 55% 45% at 50% 50%, rgba(${product.glowRgb}, 0.045) 0%, transparent 70%)`,
          }}
        />
        <div className="container mx-auto px-6 md:px-16 max-w-2xl text-center relative z-10">
          <FadeIn>
            <div
              className="w-px h-16 mx-auto mb-10"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(${product.glowRgb}, 0.45), transparent)`,
              }}
            />
            <p
              className="text-[9px] tracking-[0.38em] font-sans uppercase mb-5"
              style={{ color: `rgba(${product.glowRgb}, 0.45)` }}
            >
              Crafted Beyond Time
            </p>
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-5 leading-[1.15]">
              This piece will outlast
              <br />
              <span className="text-white/32">everything you know.</span>
            </h2>
            <p className="text-sm text-white/32 font-light leading-[1.9] mb-11 max-w-md mx-auto">
              Acquisition of an ALSAERON piece begins with an inquiry. Our
              private concierge responds within 48 hours to arrange a
              consultation at an atelier of your choosing.
            </p>
            <button
              data-testid="button-acquire-cta"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-4 px-10 md:px-14 py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black cursor-pointer transition-all duration-700"
              style={{ background: "rgba(255,255,255,0.93)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 60px rgba(${product.glowRgb}, 0.28)`;
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
                background: `linear-gradient(to bottom, rgba(${product.glowRgb}, 0.45), transparent)`,
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
                whileHover={{ x: -3 }}
                transition={{ duration: 0.4, ease }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 20% 50%, rgba(${adjacent.prev.glowRgb}, 0.04) 0%, transparent 70%)`,
                  }}
                />
                <p className="text-[9px] tracking-[0.3em] text-white/18 font-sans uppercase mb-4 flex items-center gap-2">
                  <ArrowLeft size={12} strokeWidth={1} />
                  Previous
                </p>
                <p
                  className="text-[9px] tracking-[0.22em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.prev.glowRgb}, 0.45)` }}
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
                whileHover={{ x: 3 }}
                transition={{ duration: 0.4, ease }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 80% 50%, rgba(${adjacent.next.glowRgb}, 0.04) 0%, transparent 70%)`,
                  }}
                />
                <p className="text-[9px] tracking-[0.3em] text-white/18 font-sans uppercase mb-4 flex items-center justify-end gap-2">
                  Next
                  <ArrowRight size={12} strokeWidth={1} />
                </p>
                <p
                  className="text-[9px] tracking-[0.22em] font-sans uppercase mb-2"
                  style={{ color: `rgba(${adjacent.next.glowRgb}, 0.45)` }}
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
          className="flex items-center gap-3 text-[9px] tracking-[0.28em] text-white/22 hover:text-white transition-colors duration-500 font-sans uppercase"
        >
          <ArrowLeft size={11} strokeWidth={1} />
          Return to Collections
        </button>
      </div>

      <Footer />
    </div>
  );
}
