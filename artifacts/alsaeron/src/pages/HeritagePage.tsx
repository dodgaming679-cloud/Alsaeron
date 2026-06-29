import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({ children, delay = 0, className = "", y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease }}>
      {children}
    </motion.div>
  );
}

const timeline = [
  {
    year: "Ancient",
    title: "The First Forgers",
    body: "Long before industry, artisans of unnamed civilisations discovered that certain materials — when shaped under specific celestial conditions — retained an energy no modern instrument could fully explain. ALSAERON traces its philosophy to these first forgers.",
  },
  {
    year: "1887",
    title: "The Founding Obsession",
    body: "A single metallurgist, working in isolation in the mountains of northern Europe, began cataloguing the relationship between geological pressure, lunar cycles, and the structural memory of rare alloys. His notebooks — recovered a century later — form the intellectual foundation of every ALSAERON artifact.",
  },
  {
    year: "1962",
    title: "The Atelier Opens",
    body: "Three generations later, his descendants established a private atelier — by invitation only — serving a small circle of collectors who understood that true luxury was not scarcity of material, but singularity of intent.",
  },
  {
    year: "2019",
    title: "The Digital Threshold",
    body: "ALSAERON crossed into the modern era not by abandoning its principles, but by proving them at the intersection of ancient craft and futuristic precision. The first publicly available collection sold out in silence — no campaign, no announcement.",
  },
  {
    year: "Now",
    title: "Crafted Beyond Time",
    body: "Today, ALSAERON produces fewer than thirty artifacts per year. Each is calibrated to its owner's longitude of birth and bears no serial number — only the silent knowledge of its own making.",
  },
];

const pillars = [
  { title: "Singularity", body: "No two ALSAERON artifacts are identical. The calibration process ensures each piece is as unique as the person who receives it." },
  { title: "Permanence", body: "We build for centuries, not seasons. Every material decision is made with the next hundred years in mind." },
  { title: "Restraint", body: "We do not advertise. We do not discount. We do not explain ourselves to those who require explanation." },
  { title: "Precision", body: "Every measurement, every tolerance, every surface treatment is executed to a standard that has no commercial justification — only an artistic one." },
];

export default function HeritagePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), { stiffness: 40, damping: 24 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <CartSidebar />

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "100svh", minHeight: "600px" }}>
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(37,99,235,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.007) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.007) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }} />
        {/* Animated orb */}
        <motion.div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.38em" }}
            transition={{ duration: 2, ease }}
            className="text-[9px] font-sans uppercase mb-8"
            style={{ color: "rgba(37,99,235,0.7)" }}>
            Our Heritage
          </motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease }}
              className="font-serif text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "0.04em" }}>
              Crafted Beyond Time
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease }}
            className="font-serif italic text-white/35 text-xl max-w-2xl mx-auto leading-relaxed">
            We did not begin with a business plan. We began with an obsession.
          </motion.p>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-36 px-6 md:px-16 max-w-4xl mx-auto border-t border-white/[0.04]">
        <FadeIn>
          <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-6" style={{ color: "rgba(37,99,235,0.6)" }}>
            Philosophy
          </p>
          <h2 className="font-serif text-white text-3xl md:text-4xl leading-snug mb-8 max-w-2xl">
            We do not make luxury objects.<br />
            <span className="text-white/30">We make objects that outlast the concept of luxury.</span>
          </h2>
          <p className="text-white/40 font-light leading-[2] text-base max-w-2xl">
            Every civilisation that has ever reached a zenith has produced objects that survived it. Not weapons. Not currency. Objects made with such singular attention that the universe simply refused to let them disappear. That is our only ambition.
          </p>
        </FadeIn>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-5xl mx-auto border-t border-white/[0.04]">
        <FadeIn className="mb-16">
          <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-4" style={{ color: "rgba(37,99,235,0.6)" }}>
            Origins
          </p>
          <h2 className="font-serif text-white text-3xl">A Timeline of Intention</h2>
        </FadeIn>
        <div className="relative">
          <div className="absolute left-0 md:left-[120px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.2), transparent)" }} />
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-b border-white/[0.04] group relative pl-6 md:pl-0">
                  <div className="absolute left-0 md:left-[120px] top-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-150"
                    style={{ background: "rgba(37,99,235,0.5)", boxShadow: "0 0 12px rgba(37,99,235,0.4)" }} />
                  <div className="md:w-[100px] shrink-0">
                    <span className="text-[10px] tracking-[0.2em] font-sans"
                      style={{ color: "rgba(37,99,235,0.55)" }}>{item.year}</span>
                  </div>
                  <div className="md:pl-16">
                    <h3 className="font-serif text-white text-lg mb-3 group-hover:text-white transition-colors duration-400">{item.title}</h3>
                    <p className="text-white/40 font-light text-sm leading-[1.95]">{item.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 md:py-36 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/[0.04]">
        <FadeIn className="mb-16 text-center">
          <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-4" style={{ color: "rgba(37,99,235,0.6)" }}>
            What We Stand For
          </p>
          <h2 className="font-serif text-white text-3xl">The Four Pillars</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <motion.div
                className="group p-8 border border-white/[0.05] relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.012)" }}
                whileHover={{ borderColor: "rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.022)" }}
                transition={{ duration: 0.4 }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.45), transparent)" }} />
                <div className="w-6 h-px mb-6" style={{ background: "rgba(37,99,235,0.5)" }} />
                <h3 className="font-serif text-white text-xl mb-3">{p.title}</h3>
                <p className="text-white/40 font-light text-sm leading-[1.9]">{p.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 text-center border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <FadeIn>
          <div className="w-px h-16 mx-auto mb-10"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.45), transparent)" }} />
          <p className="font-serif italic text-white/25 text-xl max-w-lg mx-auto leading-relaxed px-6">
            "There are no replicas. There is no waiting list. There is only an invitation — extended once, to one person, in a lifetime."
          </p>
          <div className="w-px h-16 mx-auto mt-10"
            style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.45), transparent)" }} />
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
