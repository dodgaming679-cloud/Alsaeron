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

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 30,
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
      transition={{ duration: 1.1, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "MMXXV", label: "Founded" },
  { value: "7", label: "Materials from beyond Earth" },
  { value: "∞", label: "Year warranty" },
  { value: "XII", label: "Pieces per year" },
];

function ProductShape({ shape, glowRgb }: { shape: Product["shape"]; glowRgb: string }) {
  if (shape === "circle") {
    return (
      <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-4 rounded-full" style={{ border: `1px solid rgba(${glowRgb}, 0.3)` }} />
        <div className="absolute inset-8 rounded-full" style={{ background: `rgba(${glowRgb}, 0.05)`, backdropFilter: "blur(4px)" }} />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, transparent 70%, rgba(${glowRgb},0.4) 85%, transparent 100%)` }}
        />
        <div className="w-3 h-3 rounded-full" style={{ background: `rgba(${glowRgb},0.7)`, boxShadow: `0 0 20px rgba(${glowRgb},0.9)` }} />
      </div>
    );
  }
  if (shape === "diamond") {
    return (
      <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
        <div className="w-20 h-20 border border-white/15 rotate-45 absolute" />
        <div className="w-28 h-28 rotate-45 absolute" style={{ border: `1px solid rgba(${glowRgb}, 0.2)` }} />
        <div className="w-12 h-12 rotate-45 absolute" style={{ background: `rgba(${glowRgb}, 0.06)`, backdropFilter: "blur(4px)" }} />
        <div
          className="w-3 h-3 rotate-45 absolute"
          style={{ background: `rgba(${glowRgb},0.85)`, boxShadow: `0 0 20px rgba(${glowRgb},0.9)` }}
        />
      </div>
    );
  }
  return (
    <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-20">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="white" strokeWidth="0.5" />
        <polygon points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" fill="none" stroke={`rgba(${glowRgb},0.6)`} strokeWidth="0.5" />
      </svg>
      <div className="w-4 h-4 rounded-sm rotate-12"
        style={{ background: `rgba(${glowRgb},0.9)`, boxShadow: `0 0 24px rgba(${glowRgb},1)` }} />
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
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.18, ease: easeOutExpo }}
      className="group cursor-pointer"
      onClick={() => setLocation(`/product/${product.slug}`)}
    >
      <div
        className="relative aspect-[3/4] mb-6 md:mb-8 overflow-hidden flex items-center justify-center transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${product.accentColor} 0%, rgba(0,0,0,0) 70%)`,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="relative z-10"
        >
          <ProductShape shape={product.shape} glowRgb={product.glowRgb} />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-8 z-20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 60%)" }}
          />
          <div className="relative flex items-center gap-2 text-[10px] tracking-[0.3em] text-white font-sans">
            DISCOVER <ArrowRight size={12} strokeWidth={1.5} />
          </div>
        </motion.div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: `inset 0 0 60px ${product.glowColor}` }}
        />
        <div
          className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: `0 0 40px -10px ${product.glowColor}`, border: `1px solid ${product.glowColor}` }}
        />
      </div>

      <div className="space-y-3 px-1">
        <p className="text-[9px] tracking-[0.3em] font-sans uppercase" style={{ color: `rgba(${product.glowRgb}, 0.7)` }}>
          {product.category}
        </p>
        <div className="flex justify-between items-baseline gap-4">
          <h3 className="text-lg md:text-xl font-serif text-white/90 group-hover:text-white transition-colors duration-500 leading-tight">
            {product.name}
          </h3>
          <span className="text-sm font-light text-muted-foreground shrink-0">{product.price}</span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground/70 font-light leading-relaxed">
          {product.description}
        </p>
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

  const heroY = useSpring(useTransform(heroScroll, [0, 1], [0, 140]), { stiffness: 60, damping: 30 });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const showcaseY = useSpring(useTransform(showcaseScroll, [0, 1], [40, -40]), { stiffness: 60, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(37,99,235,0.09) 0%, transparent 70%)" }}
          />
          <motion.div
            className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
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
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 2, delay: 0.3, ease: easeOutExpo }}
            className="text-[10px] md:text-xs font-sans text-primary mb-6 md:mb-8 uppercase block"
            data-testid="text-hero-eyebrow"
          >
            A New Era of Luxury
          </motion.p>

          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: easeOutExpo }}
              className="text-[clamp(3.5rem,14vw,11rem)] font-serif text-white tracking-[0.08em] leading-none"
              style={{ textShadow: "0 0 80px rgba(37,99,235,0.15), 0 0 200px rgba(37,99,235,0.08)" }}
              data-testid="text-hero-brand"
            >
              ALSAERON
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: easeOutExpo }}
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            <p className="text-lg md:text-2xl font-serif font-light text-white/50 italic tracking-wide" data-testid="text-hero-tagline">
              Crafted Beyond Time.
            </p>
            <div className="w-px h-12 md:h-16" style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.6), transparent)" }} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] tracking-[0.35em] text-white/25 font-sans uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
            <ArrowDown size={14} strokeWidth={1} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-24 md:py-40 relative" id="heritage">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-6 md:px-16 max-w-5xl">
          <div className="border-t border-white/5 pt-16 md:pt-24">
            <FadeIn className="max-w-3xl">
              <p className="text-[10px] tracking-[0.3em] text-primary/60 font-sans uppercase mb-6 md:mb-8">Our Philosophy</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8 md:mb-10">
                Where antiquity meets
                <br />
                <span className="text-white/40">the edge of tomorrow.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15} className="max-w-2xl">
              <p className="text-sm md:text-base text-muted-foreground font-light leading-[1.9] mb-10 md:mb-14">
                ALSAERON is not merely worn; it is inherited. We engineer artifacts using materials sourced from the deepest reaches of the cosmos, forged with the discipline of forgotten empires. Every piece is a testament to permanence in a transient universe.
              </p>
              <button
                data-testid="button-manifesto"
                className="group flex items-center gap-4 text-[10px] tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-500 font-sans uppercase"
              >
                Discover the Manifesto
                <span className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-primary/60 transition-all duration-700 block" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 md:py-20 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/5">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} className="text-center md:px-12">
                <p className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wider">{stat.value}</p>
                <p className="text-[9px] tracking-[0.25em] text-muted-foreground uppercase font-sans">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section id="collections" className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <FadeIn>
              <p className="text-[10px] tracking-[0.3em] text-primary/60 font-sans uppercase mb-4 md:mb-5">The Sovereign Collection</p>
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                Relics of
                <br />
                the Future.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <a
                href="#"
                className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-500 group font-sans uppercase"
                data-testid="link-view-all"
              >
                View All
                <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-500" />
              </a>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 flex justify-center md:hidden">
            <Button
              variant="outline"
              data-testid="button-view-all-mobile"
              className="w-full border-white/10 text-white/60 rounded-none tracking-[0.2em] text-[10px] py-5 font-sans hover:bg-transparent hover:border-white/30 hover:text-white transition-all duration-500"
            >
              VIEW ALL COLLECTIONS
            </Button>
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE ─── */}
      <section
        ref={showcaseRef}
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden border-y border-white/5"
        id="bespoke"
      >
        <div className="absolute inset-0 bg-black z-0" />
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ y: showcaseY }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeIn>
            <div
              className="w-px h-16 md:h-24 mx-auto mb-10 md:mb-16"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.5), transparent)" }}
            />
            <p className="text-[10px] tracking-[0.35em] text-primary/50 font-sans uppercase mb-6 md:mb-8">Bespoke Commission</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white italic leading-tight mb-6 md:mb-8">
              "We do not measure time.
              <br />
              <span className="text-white/40">We capture it."</span>
            </h2>
            <p className="text-sm text-muted-foreground font-light max-w-lg mx-auto leading-relaxed mb-10 md:mb-14">
              Each ALSAERON commission begins with a conversation. We craft singular artifacts for singular individuals — no two pieces share the same lineage.
            </p>
            <button
              data-testid="button-bespoke"
              className="group inline-flex items-center gap-4 border border-white/10 hover:border-primary/40 px-8 md:px-12 py-4 md:py-5 text-[10px] tracking-[0.25em] text-white/60 hover:text-white transition-all duration-700 font-sans uppercase"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,99,235,0.15)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 rgba(37,99,235,0)"; }}
            >
              Begin Your Commission
              <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-500" />
            </button>
            <div
              className="w-px h-16 md:h-24 mx-auto mt-10 md:mt-16"
              style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.5), transparent)" }}
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section id="contact" className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-xl mx-auto">
            <FadeIn className="text-center mb-12 md:mb-16">
              <p className="text-[10px] tracking-[0.3em] text-primary/60 font-sans uppercase mb-4 md:mb-6">Inner Circle</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Join the Inner Circle</h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Invitations to private viewings and early access to bespoke commissions.
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div
                className="relative overflow-hidden p-8 md:p-12"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(0,0,0,0) 100%)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.5), transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.2), transparent)" }} />
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    data-testid="input-email"
                    className="w-full bg-transparent border-b border-white/10 focus:border-primary/50 pb-4 text-center text-white/80 placeholder:text-white/20 focus:outline-none transition-colors duration-500 font-sans tracking-[0.12em] text-xs"
                  />
                  <button
                    type="submit"
                    data-testid="button-request-invitation"
                    className="w-full mt-2 py-4 md:py-5 text-[10px] tracking-[0.25em] font-sans uppercase transition-all duration-700 cursor-pointer text-black"
                    style={{ background: "rgba(255,255,255,0.95)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,99,235,0.2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
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
