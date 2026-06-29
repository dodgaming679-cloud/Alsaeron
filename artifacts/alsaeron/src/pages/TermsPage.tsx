import { useRef, useState } from "react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay, ease }}>
      {children}
    </motion.div>
  );
}

const sections = [
  {
    id: "acquisition",
    title: "Acquisition & Payment",
    body: [
      "All acquisitions through ALSAERON are final upon payment confirmation. Given the singular, bespoke nature of each artifact, no cancellations are accepted after the order is confirmed.",
      "Payment is processed via UPI on the payment screen. All prices are displayed in USD and converted to INR at checkout. ALSAERON does not store card or banking information.",
      "Order confirmation is issued via email within 24 hours of successful payment.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Title",
    body: [
      "Title and risk of loss transfer to the buyer upon dispatch from our atelier. ALSAERON is not liable for delays caused by courier networks, customs authorities, or force majeure events.",
      "All shipments are insured at full declared value. In the event of loss in transit, ALSAERON will initiate a claim on your behalf and replace or refund the artifact at our discretion.",
    ],
  },
  {
    id: "authenticity",
    title: "Authenticity & Provenance",
    body: [
      "Every ALSAERON artifact is accompanied by a certificate of provenance bearing a unique identifier. This certificate is non-transferable and tied to the original acquirer's identity.",
      "Reproduction, duplication, or unauthorised manufacture of any ALSAERON design is strictly prohibited and will be pursued under applicable intellectual property law.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    body: [
      "ALSAERON collects only the personal data necessary to fulfil your acquisition: name, email, phone, and shipping address. This data is not sold, rented, or shared with third parties outside of our fulfilment network.",
      "Order data is retained for a period of 7 years in compliance with applicable tax and commercial law. You may request deletion of your data outside this statutory retention period by contacting our concierge.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: [
      "ALSAERON's total liability for any claim arising from an acquisition shall not exceed the price paid for the artifact in question. We are not liable for indirect, consequential, or punitive damages of any kind.",
      "These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts of Mumbai.",
    ],
  },
  {
    id: "amendments",
    title: "Amendments",
    body: [
      "ALSAERON reserves the right to amend these terms at any time. Material changes will be communicated via email to registered acquirers. Continued use of our services following amendment constitutes acceptance.",
      "These terms were last updated in 2026.",
    ],
  },
];

export default function TermsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.36em" }}
            transition={{ duration: 1.8, ease }}
            className="text-[9px] font-sans uppercase mb-6"
            style={{ color: "rgba(37,99,235,0.7)" }}>
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.04em" }}>
            Terms of Service
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
            className="mt-8 text-white/30 font-sans text-sm max-w-lg mx-auto leading-relaxed">
            By acquiring an ALSAERON artifact, you agree to the following terms. Please read carefully.
          </motion.p>
        </div>
      </section>

      {/* Nav + Content */}
      <section className="py-12 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-20">

          {/* Sticky nav */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-[9px] tracking-[0.28em] text-white/20 font-sans uppercase mb-4">Sections</p>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActive(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="block w-full text-left py-2 text-sm font-light transition-colors duration-300"
                  style={{ color: active === s.id ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)" }}>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-0">
            {sections.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.06}>
                <div id={s.id} className="py-10 border-b border-white/[0.04] group"
                  onMouseEnter={() => setActive(s.id)}>
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="text-[9px] tracking-[0.28em] font-sans uppercase shrink-0"
                      style={{ color: "rgba(37,99,235,0.45)" }}>
                      0{i + 1}
                    </span>
                    <h2 className="font-serif text-white text-xl group-hover:text-white transition-colors duration-300">
                      {s.title}
                    </h2>
                  </div>
                  <div className="space-y-4 pl-8">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-white/40 font-light text-sm leading-[1.95]">{p}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 text-center border-t border-white/[0.04]">
        <FadeIn>
          <p className="text-white/18 text-xs font-sans tracking-wider">
            Questions? <a href="/contact" className="text-white/40 hover:text-white transition-colors underline underline-offset-4">Contact our concierge</a>
          </p>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
