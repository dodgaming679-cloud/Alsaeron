import { useRef } from "react";
import { useLocation } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { products, type Product } from "@/lib/products";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

const stats = [
  { value: "MMXXV", label: "Founded" },
  { value: "7", label: "Materials beyond Earth" },
  { value: "∞", label: "Year warranty" },
  { value: "XII", label: "Pieces per year" },
];

/* ─── Small material accent for cards ─── */
function CardAccent({ product }: { product: Product }) {
  const { glowRgb, shape } = product;

  if (shape === "circle") {
    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid rgba(${glowRgb},0.3)` }}
        />
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, rgba(${glowRgb},0.6) 85%, transparent 100%)`,
          }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: `rgba(${glowRgb},1)`,
            boxShadow: `0 0 8px rgba(${glowRgb},1), 0 0 20px rgba(${glowRgb},0.5)`,
          }}
        />
      </div>
    );
  }
  if (shape === "diamond") {
    return (
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div
          className="w-7 h-7"
          style={{
            border: `1px solid rgba(${glowRgb},0.35)`,
            transform: "rotate(45deg)",
            background: `rgba(${glowRgb},0.06)`,
          }}
        />
        <div
          className="absolute w-1.5 h-1.5"
          style={{
            background: `rgba(${glowRgb},0.95)`,
            transform: "rotate(45deg)",
            boxShadow: `0 0 8px rgba(${glowRgb},1)`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="relative w-12 h-10 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${28 - i * 6}px`,
            height: `${14 - i * 2}px`,
            border: `0.5px solid rgba(${glowRgb},${0.15 + i * 0.12})`,
            borderRadius: "1px",
            transform: `translateY(${-i * 4}px)`,
          }}
        />
      ))}
      <div
        className="absolute w-1 h-1 rounded-full"
        style={{
          background: `rgba(${glowRgb},0.9)`,
          boxShadow: `0 0 6px rgba(${glowRgb},1)`,
        }}
      />
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [, setLocation] = useLocation();

  return (
    <motion.article
      ref={ref}
      data-testid={`card-product-${product.id}`}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.14, ease }}
      className="group cursor-pointer"
      onClick={() => setLocation(`/product/${product.slug}`)}
    >
      {/* Image container */}
      <div
        className="relative aspect-[3/4] mb-7 overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.055)" }}
      >
        {/* Real photo — more visible */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${product.cardImage})` }}
        />

        {/* Graduated overlay — lighter at centre so the photo shows through */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.28) 35%,
              rgba(0,0,0,0.28) 65%,
              rgba(0,0,0,0.72) 100%
            )`,
          }}
        />

        {/* Product accent glow — subtle, sits on top of photo */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-55"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, rgba(${product.glowRgb},0.25) 0%, transparent 65%)`,
          }}
        />

        {/* Top-left material accent badge */}
        <div className="absolute top-5 left-5 z-10">
          <CardAccent product={product} />
        </div>

        {/* Category label top-right */}
        <div className="absolute top-6 right-5 z-10">
          <p
            className="text-[8px] tracking-[0.3em] font-sans uppercase"
            style={{ color: `rgba(${product.glowRgb},0.75)` }}
          >
            {product.category}
          </p>
        </div>

        {/* Hover reveal: bottom gradient + CTA */}
        <div
          className="absolute inset-0 flex items-end justify-between px-5 pb-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 50%)`,
          }}
        >
          <span className="text-white/55 font-serif italic text-sm leading-snug max-w-[70%]">
            {product.tagline}
          </span>
          <div
            className="flex items-center justify-center w-8 h-8 shrink-0"
            style={{ border: `1px solid rgba(${product.glowRgb},0.55)` }}
          >
            <ArrowRight size={12} strokeWidth={1.5} style={{ color: `rgba(${product.glowRgb},0.9)` }} />
          </div>
        </div>

        {/* Glow border on hover */}
        <div
          className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: `0 0 32px -6px ${product.glowColor}`, border: `1px solid rgba(${product.glowRgb},0.22)` }}
        />

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${product.glowRgb},0.7), transparent)`,
          }}
        />
      </div>

      {/* Card text */}
      <div className="space-y-2 px-0.5">
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-lg md:text-[1.2rem] font-serif text-white/82 group-hover:text-white transition-colors duration-500 leading-snug">
            {product.name}
          </h3>
          <span className="text-xs font-light text-white/28 shrink-0 tabular-nums">
            {product.price}
          </span>
        </div>
        <p className="text-xs text-white/38 font-light leading-relaxed">
          {product.description}
        </p>
        <div className="pt-1.5 flex items-center gap-2 text-[9px] tracking-[0.2em] font-sans uppercase overflow-hidden">
          <span
            className="block max-w-0 group-hover:max-w-[5rem] transition-all duration-500 overflow-hidden whitespace-nowrap"
            style={{ color: `rgba(${product.glowRgb},0.7)` }}
          >
            Discover
          </span>
          <ArrowRight
            size={11}
            strokeWidth={1.5}
            className="group-hover:translate-x-1 transition-transform duration-500"
            style={{ color: `rgba(${product.glowRgb},0.4)` }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: showcaseScroll } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 120]), {
    stiffness: 42,
    damping: 26,
    restDelta: 0.001,
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const showcaseY = useSpring(useTransform(showcaseScroll, [0, 1], [36, -36]), {
    stiffness: 42,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "100svh", minHeight: "600px" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 56%, rgba(37,99,235,0.08) 0%, transparent 70%)",
            }}
          />
          <motion.div
            className="absolute top-[18%] left-[12%] w-[520px] h-[520px] rounded-full will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.32, 0.52, 0.32] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[12%] right-[8%] w-[420px] h-[420px] rounded-full will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
            animate={{ scale: [1, 1.16, 1], opacity: [0.22, 0.42, 0.22] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center w-full max-w-6xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.08em" }}
            animate={{ opacity: 1, letterSpacing: "0.34em" }}
            transition={{ duration: 2.0, delay: 0.2, ease }}
            className="text-[9px] sm:text-[10px] md:text-[11px] font-sans text-primary mb-6 md:mb-8 uppercase block"
            data-testid="text-hero-eyebrow"
          >
            A New Era of Luxury
          </motion.p>

          <div className="overflow-hidden mb-4 md:mb-5">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease }}
              className="font-serif text-white leading-none select-none"
              style={{
                /* Safe clamp: 13vw hits ~41px at 320px (fits); max 10.5rem on wide screens */
                fontSize: "clamp(2rem, 13vw, 10.5rem)",
                letterSpacing: "0.08em",
                textShadow: "0 0 100px rgba(37,99,235,0.13), 0 0 240px rgba(37,99,235,0.06)",
              }}
              data-testid="text-hero-brand"
            >
              ALSAERON
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.0, ease }}
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            <p
              className="text-base md:text-xl font-serif font-light text-white/42 italic tracking-wide"
              data-testid="text-hero-tagline"
            >
              Crafted Beyond Time.
            </p>
            <div
              className="w-px h-10 md:h-14"
              style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.55), transparent)" }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.4 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[8px] tracking-[0.4em] text-white/22 font-sans uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <ArrowDown size={13} strokeWidth={1} className="text-white/22" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-24 md:py-44 relative" id="heritage">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(37,99,235,0.03) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="border-t border-white/[0.04] pt-16 md:pt-28">
            <FadeIn className="max-w-3xl mb-8">
              <p className="text-[10px] tracking-[0.32em] text-primary/55 font-sans uppercase mb-7">
                Our Philosophy
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif text-white leading-[1.08] mb-0">
                Where antiquity meets
                <br />
                <span className="text-white/35">the edge of tomorrow.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.14} className="max-w-2xl">
              <p className="text-sm md:text-[0.95rem] text-white/42 font-light leading-[1.95] mb-11">
                ALSAERON is not merely worn; it is inherited. We engineer
                artifacts using materials sourced from the deepest reaches of
                the cosmos, forged with the discipline of forgotten empires.
                Every piece is a testament to permanence in a transient universe.
              </p>
              <button
                data-testid="button-manifesto"
                className="group flex items-center gap-4 text-[10px] tracking-[0.26em] text-white/48 hover:text-white transition-colors duration-500 font-sans uppercase cursor-pointer"
              >
                Discover the Manifesto
                <span className="w-10 h-[1px] bg-white/15 group-hover:w-20 group-hover:bg-primary/55 transition-all duration-700 block" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 md:py-18 border-y border-white/[0.04]">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-white/[0.04]">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.07} className="text-center md:px-10">
                <p className="text-3xl md:text-4xl font-serif text-white mb-2.5 tracking-wider">
                  {stat.value}
                </p>
                <p className="text-[9px] tracking-[0.28em] text-white/28 uppercase font-sans">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section id="collections" className="py-24 md:py-44">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <FadeIn>
              <p className="text-[10px] tracking-[0.32em] text-primary/55 font-sans uppercase mb-5">
                The Sovereign Collection
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-[1.1]">
                Relics of
                <br />
                the Future.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <a
                href="#"
                className="hidden md:flex items-center gap-3 text-[9px] tracking-[0.28em] text-white/32 hover:text-white transition-colors duration-500 group font-sans uppercase"
                data-testid="link-view-all"
              >
                View All
                <ArrowRight
                  size={13}
                  strokeWidth={1}
                  className="group-hover:translate-x-1 transition-transform duration-500"
                />
              </a>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 flex justify-center md:hidden">
            <Button
              variant="outline"
              data-testid="button-view-all-mobile"
              className="w-full border-white/[0.08] text-white/45 rounded-none tracking-[0.22em] text-[10px] py-5 font-sans hover:bg-transparent hover:border-white/25 hover:text-white transition-all duration-500"
            >
              VIEW ALL COLLECTIONS
            </Button>
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE / BESPOKE ─── */}
      <section
        ref={showcaseRef}
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden border-y border-white/[0.04]"
        id="bespoke"
      >
        <div className="absolute inset-0 bg-black z-0" />
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 will-change-transform"
          style={{ y: showcaseY }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.065) 0%, rgba(99,102,241,0.03) 45%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <FadeIn>
            <div
              className="w-px h-16 md:h-20 mx-auto mb-12 md:mb-16"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.45), transparent)",
              }}
            />
            <p className="text-[9px] tracking-[0.38em] text-primary/42 font-sans uppercase mb-7">
              Bespoke Commission
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-[3.2rem] font-serif text-white italic leading-[1.15] mb-7">
              "We do not measure time.
              <br />
              <span className="text-white/35">We capture it."</span>
            </h2>
            <p className="text-sm text-white/35 font-light max-w-md mx-auto leading-[1.85] mb-12 md:mb-14">
              Each ALSAERON commission begins with a conversation. We craft
              singular artifacts for singular individuals — no two pieces share
              the same lineage.
            </p>
            <button
              data-testid="button-bespoke"
              className="group inline-flex items-center gap-4 border border-white/[0.09] hover:border-primary/35 px-10 md:px-14 py-4 text-[10px] tracking-[0.28em] text-white/48 hover:text-white transition-all duration-600 font-sans uppercase cursor-pointer"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 45px rgba(37,99,235,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Begin Your Commission
              <ArrowRight
                size={13}
                strokeWidth={1}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </button>
            <div
              className="w-px h-16 md:h-20 mx-auto mt-12 md:mt-16"
              style={{
                background: "linear-gradient(to bottom, rgba(37,99,235,0.45), transparent)",
              }}
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section id="contact" className="py-24 md:py-44">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-md mx-auto">
            <FadeIn className="text-center mb-12 md:mb-14">
              <p className="text-[9px] tracking-[0.32em] text-primary/55 font-sans uppercase mb-5">
                Inner Circle
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 tracking-wide">
                Join the Inner Circle
              </h2>
              <p className="text-sm text-white/35 font-light leading-relaxed">
                Invitations to private viewings and early access to bespoke commissions.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="relative overflow-hidden p-8 md:p-10"
                style={{
                  border: "1px solid rgba(255,255,255,0.055)",
                  background: "linear-gradient(140deg, rgba(37,99,235,0.032) 0%, transparent 100%)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(37,99,235,0.45), transparent)",
                  }}
                />
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    data-testid="input-email"
                    className="w-full bg-transparent border-b border-white/[0.09] focus:border-primary/40 pb-4 text-center text-white/65 placeholder:text-white/18 focus:outline-none transition-colors duration-500 font-sans tracking-[0.14em] text-[11px]"
                  />
                  <button
                    type="submit"
                    data-testid="button-request-invitation"
                    className="w-full py-4 text-[10px] tracking-[0.28em] font-sans uppercase cursor-pointer text-black transition-all duration-600"
                    style={{ background: "rgba(255,255,255,0.93)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,99,235,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    Request Invitation
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

