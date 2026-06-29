import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";
import { ArrowRight } from "lucide-react";

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

const featured = {
  issue: "Vol. I",
  category: "Philosophy",
  title: "Why Scarcity Is the Wrong Word for What We Do",
  excerpt: "Scarcity implies withholding. What ALSAERON practices is something closer to the opposite — a commitment to giving every artifact the full weight of attention it deserves, which simply cannot be scaled.",
  readTime: "6 min read",
};

const articles = [
  {
    issue: "Vol. II",
    category: "Materials",
    title: "The Metallurgy of Memory: How Alloys Remember",
    excerpt: "Every material carries a structural history. The question we ask is not what a metal can do, but what it has already decided to be.",
    readTime: "8 min read",
  },
  {
    issue: "Vol. III",
    category: "Craft",
    title: "Calibration at First Light: The Ritual of Commission",
    excerpt: "Every Sovereign is set at the longitude of its owner's birth, at the first light of the day of commission. This is not ceremony. This is physics.",
    readTime: "5 min read",
  },
  {
    issue: "Vol. IV",
    category: "Philosophy",
    title: "On Collecting Things That Collect You Back",
    excerpt: "There is a category of object that changes the person who owns it. Not through function, but through presence. We try to make only those.",
    readTime: "7 min read",
  },
  {
    issue: "Vol. V",
    category: "Heritage",
    title: "The Notebooks of the First Forger",
    excerpt: "In 1887, a metallurgist alone in the mountains began recording something he could not yet name. We have been trying to name it ever since.",
    readTime: "10 min read",
  },
  {
    issue: "Vol. VI",
    category: "Design",
    title: "Why the Crown of the Sovereign Points Right",
    excerpt: "Every detail in an ALSAERON artifact has a reason. Some reasons are mechanical. Some are older than mechanism.",
    readTime: "4 min read",
  },
];

function ArticleCard({ article, delay = 0 }: { article: typeof articles[0]; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="group border border-white/[0.05] p-7 relative overflow-hidden cursor-pointer h-full flex flex-col"
        style={{ background: "rgba(255,255,255,0.012)" }}
        whileHover={{ borderColor: "rgba(37,99,235,0.2)", background: "rgba(37,99,235,0.02)" }}
        transition={{ duration: 0.45 }}>
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-600"
          style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.45), transparent)" }} />
        <div className="flex items-center justify-between mb-6">
          <span className="text-[9px] tracking-[0.28em] font-sans uppercase"
            style={{ color: "rgba(37,99,235,0.55)" }}>{article.category}</span>
          <span className="text-[9px] tracking-[0.18em] font-sans text-white/18">{article.issue}</span>
        </div>
        <h3 className="font-serif text-white text-lg leading-snug mb-4 flex-1 group-hover:text-white transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-white/35 font-light text-sm leading-[1.85] mb-6">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/18 font-sans tracking-wider">{article.readTime}</span>
          <motion.div
            className="flex items-center gap-2 text-[9px] tracking-[0.2em] font-sans uppercase"
            style={{ color: "rgba(37,99,235,0.5)" }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}>
            Read <ArrowRight size={10} strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function JournalPage() {
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
            The Journal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "0.04em" }}>
            Writings on<br /><span className="text-white/30 italic">Permanence</span>
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
            className="mt-8 text-white/30 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Thoughts on craft, material, philosophy, and the rare objects that refuse to be forgotten.
          </motion.p>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 md:px-16 max-w-6xl mx-auto py-8">
        <FadeIn>
          <motion.div
            className="group relative border border-white/[0.07] p-10 md:p-14 overflow-hidden cursor-pointer"
            style={{ background: "rgba(37,99,235,0.03)" }}
            whileHover={{ borderColor: "rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.05)" }}
            transition={{ duration: 0.5 }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(37,99,235,0.5), transparent)" }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.05) 0%, transparent 60%)" }} />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] tracking-[0.28em] font-sans uppercase px-3 py-1 border"
                  style={{ color: "rgba(37,99,235,0.7)", borderColor: "rgba(37,99,235,0.2)" }}>
                  Featured
                </span>
                <span className="text-[9px] tracking-[0.22em] font-sans uppercase text-white/25">{featured.category}</span>
                <span className="text-[9px] text-white/18 font-sans ml-auto">{featured.issue}</span>
              </div>
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-5">
                {featured.title}
              </h2>
              <p className="text-white/40 font-light leading-[1.95] text-sm mb-8 max-w-xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-2 text-[10px] tracking-[0.22em] font-sans uppercase"
                  style={{ color: "rgba(37,99,235,0.7)" }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}>
                  Read Essay <ArrowRight size={11} strokeWidth={1.5} />
                </motion.div>
                <span className="text-[9px] text-white/18 font-sans">{featured.readTime}</span>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </section>

      {/* Articles Grid */}
      <section className="px-6 md:px-16 max-w-6xl mx-auto py-12 md:py-16">
        <FadeIn className="mb-10">
          <div className="flex items-center gap-6">
            <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/25 shrink-0">All Issues</p>
            <div className="h-px flex-1 bg-white/[0.04]" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <ArticleCard key={i} article={a} delay={i * 0.07} />
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-24 px-6 text-center border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)" }} />
        <FadeIn>
          <p className="text-[9px] tracking-[0.32em] font-sans uppercase mb-5" style={{ color: "rgba(37,99,235,0.55)" }}>
            New Issues
          </p>
          <h2 className="font-serif text-white text-2xl md:text-3xl mb-4">Receive the next essay.</h2>
          <p className="text-white/28 font-light text-sm max-w-sm mx-auto mb-10 leading-relaxed">
            We publish infrequently and intentionally. No newsletters. No announcements. Only essays.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-white/[0.1] focus:border-white/30 pb-3 text-white/70 placeholder:text-white/14 focus:outline-none transition-colors duration-400 text-sm font-light"
            />
            <button
              className="px-7 py-3 text-[10px] tracking-[0.28em] font-sans uppercase text-black transition-all duration-500 shrink-0"
              style={{ background: "rgba(255,255,255,0.93)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,99,235,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}>
              Subscribe
            </button>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
