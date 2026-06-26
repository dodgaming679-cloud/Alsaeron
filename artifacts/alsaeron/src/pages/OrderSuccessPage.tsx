import { useEffect, useRef } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

export default function OrderSuccessPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId ?? "ALR-UNKNOWN";
  const [, setLocation] = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center py-24">
        {/* Animated check */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mb-10 relative"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{
              border: "1px solid rgba(37,99,235,0.2)",
              background: "rgba(37,99,235,0.05)",
              boxShadow: "0 0 60px rgba(37,99,235,0.12)",
            }}
          >
            <CheckCircle2 size={32} strokeWidth={1} className="text-primary/70" />
          </div>
          {/* Pulse rings */}
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(37,99,235,0.15)" }}
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.8 + i * 0.6, opacity: 0 }}
              transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          <p className="text-[9px] tracking-[0.36em] font-sans uppercase text-primary mb-4">
            Acquisition Confirmed
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
            Order Confirmed
          </h1>
          <p className="text-white/28 font-serif text-xl italic mb-10">
            Your legacy has been registered.
          </p>
        </motion.div>

        {/* Order ID card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="mb-10 py-7 px-10 max-w-sm w-full"
          style={{
            border: "1px solid rgba(37,99,235,0.12)",
            background: "rgba(37,99,235,0.03)",
          }}
        >
          <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/20 mb-3">
            Order Reference
          </p>
          <p className="font-serif text-2xl text-white/80 tracking-[0.08em]">{orderId}</p>
          <div className="mt-4 w-full h-px" style={{ background: "rgba(37,99,235,0.1)" }} />
          <p className="mt-4 text-[9px] text-white/20 font-sans leading-relaxed">
            Keep this reference for your records.
          </p>
        </motion.div>

        {/* Shipping info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease }}
          className="mb-14 max-w-lg"
        >
          <p className="text-white/32 font-sans text-sm leading-[1.9]">
            Your ALSAERON acquisition is being prepared by our private atelier.
            Our concierge will verify your payment within 24 hours and dispatch
            your piece via fully insured private courier within <span className="text-white/55">7–21 working days</span>.
            A confirmation with tracking details will be sent to your email.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="flex flex-col sm:flex-row gap-5 items-center"
        >
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-3 px-10 py-4 text-[10px] tracking-[0.28em] font-sans uppercase text-black transition-all duration-500"
            style={{ background: "rgba(255,255,255,0.9)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(37,99,235,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.9)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Return to Collection
            <ArrowRight size={12} strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease }}
          className="mt-20 w-24 h-px mx-auto"
          style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.35), transparent)" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-5 text-[8px] tracking-[0.4em] font-sans uppercase text-white/12"
        >
          Crafted Beyond Time
        </motion.p>
      </div>

      <Footer />
    </div>
  );
}
