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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [, setLocation] = useLocation();

  return (
    <motion.article
      ref={ref}
      data-testid={`card-product-${product.id}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease }}
      className="group cursor-pointer"
      onClick={() => setLocation(`/product/${product.slug}`)}
    >
      {/* Card visual */}
      <div
        className="relative aspect-[3/4] mb-7 overflow-hidden flex items-center justify-center"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Real photo background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${product.cardImage})` }}
        />
        {/* Heavy dark overlay — keeps the design; image provides texture */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.88) 100%)`,
          }}
        />
        {/* Accent color glow behind visual */}
        <div
          className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-80"
          style={{
            background: `radial-gradient(ellipse at center, ${product.accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* Geometric product visual */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.9, ease }}
        >
          <ProductShapeSmall product={product} />
        </motion.div>

        {/* Hover reveal overlay */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-8 z-20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)`,
            }}
          />
          <div className="relative flex items-center gap-2 text-[10px] tracking-[0.3em] text-white font-sans">
            DISCOVER <ArrowRight size={12} strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Glow border on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: `inset 0 0 50px ${product.glowColor}` }}
        />
        <div
          className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            boxShadow: `0 0 35px -8px ${product.glowColor}`,
            border: `1px solid ${product.glowColor}`,
          }}
        />

        {/* Top line accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(to right, transparent, rgba(${product.glowRgb}, 0.8), transparent)`,
          }}
        />
      </div>

      {/* Card text */}
      <div className="space-y-2.5 px-0.5">
        <p
          className="text-[9px] tracking-[0.32em] font-sans uppercase"
          style={{ color: `rgba(${product.glowRgb}, 0.65)` }}
        >
          {product.category}
        </p>
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-lg md:text-[1.2rem] font-serif text-white/85 group-hover:text-white transition-colors duration-500 leading-snug">
            {product.name}
          </h3>
          <span className="text-xs font-light text-white/30 shrink-0 tabular-nums">
            {product.price}
          </span>
        </div>
        <p className="text-xs text-white/38 font-light leading-relaxed">
          {product.description}
        </p>
        <div className="pt-1 flex items-center gap-2 text-[9px] tracking-[0.22em] font-sans uppercase overflow-hidden">
          <span
            className="block max-w-0 group-hover:max-w-[5rem] transition-all duration-500 overflow-hidden whitespace-nowrap"
            style={{ color: `rgba(${product.glowRgb}, 0.7)` }}
          >
            Discover
          </span>
          <motion.span
            className="block"
            style={{ color: `rgba(${product.glowRgb}, 0.4)` }}
          >
            <ArrowRight
              size={11}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform duration-500"
            />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

function ProductShapeSmall({ product }: { product: Product }) {
  const { glowRgb, shape } = product;
  if (shape === "circle") {
    return (
      <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
        <div
          className="absolute inset-4 rounded-full"
          style={{ border: `1px solid rgba(${glowRgb}, 0.25)` }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, rgba(${glowRgb},0.35) 85%, transparent 100%)`,
          }}
        />
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: `rgba(${glowRgb},0.8)`,
            boxShadow: `0 0 18px rgba(${glowRgb},1), 0 0 40px rgba(${glowRgb},0.4)`,
          }}
        />
      </div>
    );
  }
  if (shape === "diamond") {
    return (
      <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <div
          className="w-20 h-20 absolute"
          style={{ border: "1px solid rgba(255,255,255,0.1)", transform: "rotate(45deg)" }}
        />
        <div
          className="w-28 h-28 absolute"
          style={{ border: `1px solid rgba(${glowRgb}, 0.18)`, transform: "rotate(45deg)" }}
        />
        <div
          className="w-3 h-3 absolute"
          style={{
            background: `rgba(${glowRgb},0.9)`,
            transform: "rotate(45deg)",
            boxShadow: `0 0 18px rgba(${glowRgb},1)`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-18">
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />
        <polygon
          points="50,16 84,32.5 84,67.5 50,84 16,67.5 16,32.5"
          fill="none"
          stroke={`rgba(${glowRgb},0.5)`}
          strokeWidth="0.5"
        />
      </svg>
      <div
        className="w-3.5 h-3.5 rounded-sm rotate-12"
        style={{
          background: `rgba(${glowRgb},0.9)`,
          boxShadow: `0 0 20px rgba(${glowRgb},1)`,
        }}
      />
    </div>
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

  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 130]), {
    stiffness: 55,
    damping: 28,
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const showcaseY = useSpring(useTransform(showcaseScroll, [0, 1], [40, -40]), {
    stiffness: 55,
    damping: 28,
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 56%, rgba(37,99,235,0.09) 0%, transparent 70%)",
            }}
          />
          <motion.div
            className="absolute top-[18%] left-[12%] w-[520px] h-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[12%] right-[8%] w-[420px] h-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.38em" }}
            transition={{ duration: 2.2, delay: 0.2, ease }}
            className="text-[10px] md:text-[11px] font-sans text-primary mb-7 uppercase block"
            data-testid="text-hero-eyebrow"
          >
            A New Era of Luxury
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease }}
              className="font-serif text-white tracking-[0.09em] leading-none select-none"
              style={{
                fontSize: "clamp(3.2rem, 13.5vw, 10.5rem)",
                textShadow:
                  "0 0 100px rgba(37,99,235,0.14), 0 0 240px rgba(37,99,235,0.07)",
              }}
              data-testid="text-hero-brand"
            >
              ALSAERON
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.05, ease }}
            className="flex flex-col items-center gap-5"
          >
            <p
              className="text-lg md:text-xl font-serif font-light text-white/42 italic tracking-wide"
              data-testid="text-hero-tagline"
            >
              Crafted Beyond Time.
            </p>
            <div
              className="w-px h-14 md:h-18"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(37,99,235,0.55), transparent)",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.4 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[8px] tracking-[0.4em] text-white/22 font-sans uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
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
            background:
              "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(37,99,235,0.035) 0%, transparent 70%)",
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
                <span className="text-white/36">the edge of tomorrow.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.14} className="max-w-2xl">
              <p className="text-sm md:text-[0.95rem] text-white/42 font-light leading-[1.95] mb-11">
                ALSAERON is not merely worn; it is inherited. We engineer
                artifacts using materials sourced from the deepest reaches of
                the cosmos, forged with the discipline of forgotten empires.
                Every piece is a testament to permanence in a transient
                universe.
              </p>
              <button
                data-testid="button-manifesto"
                className="group flex items-center gap-4 text-[10px] tracking-[0.26em] text-white/48 hover:text-white transition-colors duration-600 font-sans uppercase"
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
                className="hidden md:flex items-center gap-3 text-[9px] tracking-[0.28em] text-white/32 hover:text-white transition-colors duration-600 group font-sans uppercase"
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
              className="w-full border-white/[0.08] text-white/45 rounded-none tracking-[0.22em] text-[10px] py-5 font-sans hover:bg-transparent hover:border-white/25 hover:text-white transition-all duration-600"
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
          className="absolute inset-0 pointer-events-none z-0"
          style={{ y: showcaseY }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(99,102,241,0.035) 45%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <FadeIn>
            <div
              className="w-px h-16 md:h-20 mx-auto mb-12 md:mb-16"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(37,99,235,0.45), transparent)",
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
              className="group inline-flex items-center gap-4 border border-white/[0.09] hover:border-primary/35 px-10 md:px-14 py-4 text-[10px] tracking-[0.28em] text-white/48 hover:text-white transition-all duration-700 font-sans uppercase"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 45px rgba(37,99,235,0.13)";
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
                background:
                  "linear-gradient(to bottom, rgba(37,99,235,0.45), transparent)",
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
                Invitations to private viewings and early access to bespoke
                commissions.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="relative overflow-hidden p-8 md:p-10"
                style={{
                  border: "1px solid rgba(255,255,255,0.055)",
                  background:
                    "linear-gradient(140deg, rgba(37,99,235,0.035) 0%, transparent 100%)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(37,99,235,0.45), transparent)",
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
                    className="w-full py-4 text-[10px] tracking-[0.28em] font-sans uppercase cursor-pointer text-black transition-all duration-700"
                    style={{ background: "rgba(255,255,255,0.93)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,1)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 40px rgba(37,99,235,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.93)";
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
