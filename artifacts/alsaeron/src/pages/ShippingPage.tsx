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

const shippingData = [
  {
    label: "01",
    title: "Private Courier Dispatch",
    body: "Every ALSAERON artifact is dispatched exclusively via insured private courier — no standard postal networks. Your piece travels with a dedicated handler from our atelier to your door.",
    detail: "Dispatch within 3 working days of order confirmation.",
  },
  {
    label: "02",
    title: "Delivery Timeline",
    body: "Domestic delivery is completed within 7–10 working days. International orders are fulfilled within 14–21 working days, depending on customs clearance and destination.",
    detail: "A live tracking link is issued within 48 hours of dispatch.",
  },
  {
    label: "03",
    title: "Obsidian Packaging",
    body: "Each piece arrives sealed inside a handcrafted obsidian lacquer case, lined with archival silk. The outer vessel bears the ALSAERON insignia in blind emboss — itself a collectible object.",
    detail: "Packaging dimensions vary by artifact category.",
  },
  {
    label: "04",
    title: "International Shipping",
    body: "We deliver to over 60 countries across six continents. Import duties, customs taxes, and clearance fees are the recipient's responsibility and vary by jurisdiction.",
    detail: "Contact our concierge for country-specific guidance.",
  },
  {
    label: "05",
    title: "Returns & Resolution",
    body: "Due to the singular, bespoke nature of each ALSAERON artifact, all acquisitions are final. If your piece arrives with damage, contact our private concierge within 48 hours — we will arrange immediate resolution.",
    detail: "Resolution timeline: 5–10 working days.",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.09) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.006) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.006) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.36em" }}
            transition={{ duration: 1.8, ease }}
            className="text-[9px] font-sans uppercase mb-6"
            style={{ color: "rgba(37,99,235,0.7)" }}>
            Assistance
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.04em" }}>
            Shipping & Returns
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
            Every artifact deserves a passage worthy of its permanence.
          </motion.p>
        </div>
      </section>

      {/* Shipping Cards */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-5xl mx-auto">
        <div className="space-y-6">
          {shippingData.map((item, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                className="group relative p-8 md:p-10 border border-white/[0.05] overflow-hidden"
                style={{ background: "rgba(255,255,255,0.014)" }}
                whileHover={{ borderColor: "rgba(37,99,235,0.18)", background: "rgba(37,99,235,0.025)" }}
                transition={{ duration: 0.5 }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.4), transparent)" }} />
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  <span className="text-[10px] tracking-[0.3em] font-sans shrink-0 mt-1"
                    style={{ color: "rgba(37,99,235,0.45)" }}>{item.label}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-white text-xl mb-3">{item.title}</h3>
                    <p className="text-white/45 font-light text-sm leading-[1.9] mb-4">{item.body}</p>
                    <p className="text-[10px] tracking-[0.18em] font-sans uppercase"
                      style={{ color: "rgba(37,99,235,0.55)" }}>{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t border-white/[0.04]">
        <FadeIn>
          <p className="text-white/25 text-sm font-light mb-6">Questions about your order?</p>
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
            Contact Concierge
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
