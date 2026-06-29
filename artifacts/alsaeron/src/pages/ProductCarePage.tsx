import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease }}>
      {children}
    </motion.div>
  );
}

const careGuides = [
  {
    category: "Timepieces",
    accent: "80,120,220",
    steps: [
      { title: "Daily Handling", body: "Hold your Sovereign by the case, never the crystal. Skin oils, though harmless to steel, will dull the sapphire's refractive clarity over time." },
      { title: "Moisture & Pressure", body: "The Sovereign carries a water resistance of 30 metres. Avoid prolonged submersion, steam rooms, or rapid pressure changes such as deep diving." },
      { title: "Storage", body: "When not worn, rest the piece face-up in its obsidian case, away from magnetic fields, direct sunlight, and temperature extremes." },
      { title: "Servicing", body: "A full movement service is recommended every 5–7 years. Contact our concierge to arrange with a certified ALSAERON horologist." },
    ],
  },
  {
    category: "Rings & Jewellery",
    accent: "100,80,200",
    steps: [
      { title: "Stone Integrity", body: "Remove your ring before manual labour, exercise, or contact with abrasive surfaces. The setting is precision-engineered, not indestructible." },
      { title: "Chemical Exposure", body: "Chlorine, bleach, and harsh cleaning agents will degrade both metal and stone over time. Remove before swimming in treated water." },
      { title: "Cleaning", body: "Use only a soft-bristle brush with lukewarm distilled water. Dry immediately with a lint-free cloth. Never use ultrasonic cleaners without concierge guidance." },
      { title: "Resizing", body: "Resizing is available through our atelier. Unauthorised resizing voids the authenticity guarantee." },
    ],
  },
  {
    category: "Bracelets",
    accent: "37,99,235",
    steps: [
      { title: "Clasp Mechanism", body: "The nanocarbon clasp is precision-fitted. Do not force the mechanism. If resistance is felt, contact our concierge — never apply additional pressure." },
      { title: "Surface Care", body: "The nanocarbon plates are scratch-resistant, not scratch-proof. Avoid contact with harder materials such as raw gemstone or industrial surfaces." },
      { title: "Plate Alignment", body: "If plates appear misaligned after impact, do not attempt to re-seat them. Return the piece to our atelier for examination." },
      { title: "Polish", body: "A microfibre cloth applied with gentle circular motion will restore surface depth. Never use metal polish." },
    ],
  },
];

export default function ProductCarePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.005) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.36em" }}
            transition={{ duration: 1.8, ease }}
            className="text-[9px] font-sans uppercase mb-6"
            style={{ color: "rgba(37,99,235,0.7)" }}>
            Preservation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.04em" }}>
            Product Care
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            style={{ originX: "50%" }}>
            <div className="w-20 h-px mx-auto" style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.6), transparent)" }} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
            className="mt-8 text-white/35 font-light font-serif italic text-lg max-w-xl mx-auto leading-relaxed">
            An artifact built to outlast you still requires the reverence it deserves.
          </motion.p>
        </div>
      </section>

      {/* Care Guides */}
      <section className="py-12 md:py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="space-y-20">
          {careGuides.map((guide, gi) => (
            <div key={gi}>
              <FadeIn>
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-px flex-1" style={{ background: `rgba(${guide.accent},0.15)` }} />
                  <p className="text-[9px] tracking-[0.32em] font-sans uppercase shrink-0"
                    style={{ color: `rgba(${guide.accent},0.7)` }}>{guide.category}</p>
                  <div className="h-px flex-1" style={{ background: `rgba(${guide.accent},0.15)` }} />
                </div>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.steps.map((step, si) => (
                  <FadeIn key={si} delay={si * 0.08}>
                    <motion.div
                      className="group p-7 border border-white/[0.05] relative overflow-hidden h-full"
                      style={{ background: "rgba(255,255,255,0.012)" }}
                      whileHover={{ borderColor: `rgba(${guide.accent},0.2)` }}
                      transition={{ duration: 0.4 }}>
                      <div className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                        style={{ background: `linear-gradient(to right, transparent, rgba(${guide.accent},0.45), transparent)` }} />
                      <div className="w-6 h-px mb-5" style={{ background: `rgba(${guide.accent},0.5)` }} />
                      <h4 className="font-serif text-white text-base mb-3">{step.title}</h4>
                      <p className="text-white/40 font-light text-sm leading-[1.9]">{step.body}</p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicing CTA */}
      <section className="py-24 px-6 text-center border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />
        <FadeIn>
          <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-5" style={{ color: "rgba(37,99,235,0.55)" }}>
            Atelier Services
          </p>
          <h2 className="font-serif text-white text-2xl md:text-3xl mb-5">Require expert servicing?</h2>
          <p className="text-white/30 font-light text-sm max-w-md mx-auto mb-10 leading-relaxed">
            Our master craftspeople are available for restoration, resizing, and full service of any ALSAERON artifact.
          </p>
          <a href="/contact"
            className="inline-block px-10 py-4 text-[10px] tracking-[0.3em] font-sans uppercase text-black transition-all duration-500"
            style={{ background: "rgba(255,255,255,0.93)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(37,99,235,0.25)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.93)";
            }}>
            Speak to Our Atelier
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
