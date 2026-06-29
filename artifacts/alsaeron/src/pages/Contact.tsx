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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease }}>
      {children}
    </motion.div>
  );
}

const infoCards = [
  {
    title: "Private Concierge",
    body: "For acquisition inquiries, bespoke commissions, and pre-sale consultations.",
    detail: "Response within 48 hours.",
  },
  {
    title: "Atelier Services",
    body: "For servicing, restoration, resizing, and authentication of existing artifacts.",
    detail: "By appointment only.",
  },
  {
    title: "Press & Editorial",
    body: "For editorial features, photography requests, and brand partnerships.",
    detail: "Reviewed personally.",
  },
];

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/mqevawvj", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <CartSidebar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
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
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "0.04em" }}>
            Speak With Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            style={{ originX: "50%" }}>
            <div className="w-20 h-px mx-auto"
              style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.6), transparent)" }} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
            className="mt-8 text-white/35 font-serif italic text-lg max-w-md mx-auto leading-relaxed">
            Every inquiry is read personally. We do not use automated responses.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-6 md:px-16 max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {infoCards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                className="group p-7 border border-white/[0.05] relative overflow-hidden h-full"
                style={{ background: "rgba(255,255,255,0.012)" }}
                whileHover={{ borderColor: "rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.022)" }}
                transition={{ duration: 0.4 }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.45), transparent)" }} />
                <div className="w-5 h-px mb-5" style={{ background: "rgba(37,99,235,0.5)" }} />
                <h3 className="font-serif text-white text-base mb-3">{card.title}</h3>
                <p className="text-white/35 font-light text-sm leading-[1.9] mb-4">{card.body}</p>
                <p className="text-[10px] tracking-[0.15em] font-sans"
                  style={{ color: "rgba(37,99,235,0.6)" }}>{card.detail}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto pb-24">
          <FadeIn className="mb-10">
            <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-3"
              style={{ color: "rgba(37,99,235,0.6)" }}>Direct Inquiry</p>
            <h2 className="font-serif text-white text-3xl">Send a Message</h2>
          </FadeIn>

          {status === "success" ? (
            <FadeIn>
              <div className="py-16 text-center border border-white/[0.05]"
                style={{ background: "rgba(37,99,235,0.03)" }}>
                <div className="w-px h-12 mx-auto mb-8"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.5))" }} />
                <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-4"
                  style={{ color: "rgba(37,99,235,0.7)" }}>Received</p>
                <h3 className="font-serif text-white text-2xl mb-4">Your message has been received.</h3>
                <p className="text-white/35 font-light text-sm max-w-sm mx-auto leading-relaxed">
                  Our concierge will respond personally within 48 hours. All communications are strictly confidential.
                </p>
                <div className="w-px h-12 mx-auto mt-8"
                  style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.5), transparent)" }} />
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-[9px] tracking-[0.28em] font-sans uppercase mb-2 text-white/25">Full Name</label>
                  <input name="name" required placeholder="Your name"
                    className="w-full bg-transparent font-sans text-sm text-white/75 placeholder-white/14 outline-none transition-all duration-400 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => e.currentTarget.style.borderBottomColor = "rgba(37,99,235,0.6)"}
                    onBlur={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.08)"} />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.28em] font-sans uppercase mb-2 text-white/25">Email Address</label>
                  <input name="email" type="email" required placeholder="your@email.com"
                    className="w-full bg-transparent font-sans text-sm text-white/75 placeholder-white/14 outline-none transition-all duration-400 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => e.currentTarget.style.borderBottomColor = "rgba(37,99,235,0.6)"}
                    onBlur={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.08)"} />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.28em] font-sans uppercase mb-2 text-white/25">Message</label>
                  <textarea name="message" required rows={5} placeholder="Tell us what you have in mind..."
                    className="w-full bg-transparent font-sans text-sm text-white/75 placeholder-white/14 outline-none transition-all duration-400 py-3 resize-none"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => e.currentTarget.style.borderBottomColor = "rgba(37,99,235,0.6)"}
                    onBlur={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.08)"} />
                </div>
                {status === "error" && (
                  <p className="text-red-400/70 text-[11px] font-sans">Something went wrong. Please try again.</p>
                )}
                <div className="pt-2">
                  <button type="submit"
                    className="px-12 py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black transition-all duration-500"
                    style={{ background: "rgba(255,255,255,0.93)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(37,99,235,0.25)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}>
                    Send Message
                  </button>
                  <p className="mt-5 text-[9px] text-white/18 font-sans leading-relaxed">
                    All inquiries are reviewed personally. Response within 48 hours. Strictly confidential.
                  </p>
                </div>
              </form>
            </FadeIn>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}