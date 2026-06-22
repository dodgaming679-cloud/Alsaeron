import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Fade-up animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const products = [
    {
      id: 1,
      name: "The Sovereign Timepiece",
      price: "$145,000",
      description: "Forged in dark matter composite. A chronometer that measures epochs, not hours.",
      gradient: "from-blue-900/40 to-black"
    },
    {
      id: 2,
      name: "Dynasty Ring",
      price: "$28,500",
      description: "Platinum and zero-point energy crystal. The mark of an emperor.",
      gradient: "from-indigo-900/40 to-black"
    },
    {
      id: 3,
      name: "Celestial Armor Bracelet",
      price: "$62,000",
      description: "Articulated nanocarbon plates. Impervious elegance for the wrist.",
      gradient: "from-slate-900/40 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Deep atmospheric background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[128px] mix-blend-screen opacity-30 animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
        
        {/* Content */}
        <motion.div 
          className="relative z-10 text-center px-4 w-full"
          style={{ y: yHeroText, opacity: opacityHeroText }}
        >
          <motion.p 
            initial={{ opacity: 0, tracking: "0em" }}
            animate={{ opacity: 1, tracking: "0.3em" }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-xs md:text-sm font-sans text-primary mb-6 uppercase"
          >
            A New Era of Luxury
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-[0.1em] mb-6 drop-shadow-2xl"
          >
            ALSAERON
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-xl md:text-2xl font-light text-muted-foreground italic tracking-wide max-w-2xl mx-auto">
              Crafted Beyond Time.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/50"
          >
            <ArrowDown size={16} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      {/* Intro / Philosophy */}
      <section className="py-32 relative z-10 bg-background border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-8">
              Where antiquity meets the edge of tomorrow.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12">
              ALSAERON is not merely worn; it is inherited. We engineer artifacts using materials sourced from the deepest reaches of the cosmos, forged with the discipline of forgotten empires. Every piece is a testament to permanence in a transient universe.
            </p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none px-8 py-6 tracking-[0.15em] text-xs transition-all duration-300">
              DISCOVER THE MANIFESTO
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section id="collections" className="py-32 bg-background relative border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20"
          >
            <div>
              <h3 className="text-sm font-sans tracking-[0.2em] text-primary mb-4 uppercase">The Sovereign Collection</h3>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Relics of the Future.</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors tracking-widest mt-6 md:mt-0 group">
              VIEW ALL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.2 } }
                }}
                className="group cursor-pointer"
              >
                {/* Abstract Product Visual */}
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-card border border-white/5 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />
                  
                  {/* Geometric Abstract Shape representing the product */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-10 w-32 h-32 md:w-48 md:h-48 border-[0.5px] border-white/30 rounded-full flex items-center justify-center"
                  >
                    <div className="w-full h-full border border-primary/20 rotate-45 rounded-sm" />
                    <div className="absolute w-1/2 h-1/2 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="text-sm font-light text-muted-foreground">{product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground/80 font-light leading-relaxed">
                    {product.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-xs tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    DISCOVER <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Button variant="outline" className="w-full border-white/20 text-white rounded-none tracking-[0.15em] text-xs py-6">
              VIEW ALL COLLECTIONS
            </Button>
          </div>
        </div>
      </section>

      {/* Atmospheric Full Width Break */}
      <section className="h-[70vh] relative flex items-center justify-center overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-black z-0" />
        {/* Complex gradient orb for visual depth */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/5 via-blue-900/10 to-black rounded-full blur-[100px] opacity-60 pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto mb-12" />
          <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-8">
            "We do not measure time. We capture it."
          </h2>
          <div className="w-px h-24 bg-gradient-to-b from-primary/50 via-transparent to-transparent mx-auto mt-12" />
        </motion.div>
      </section>

      {/* Newsletter / Contact */}
      <section id="contact" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center border border-white/10 p-12 md:p-20 relative overflow-hidden bg-card/30 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-serif text-white mb-4">Join the Inner Circle</h2>
              <p className="text-sm text-muted-foreground font-light mb-10 tracking-wide">
                Invitations to private viewings and early access to bespoke commissions.
              </p>
              
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  className="bg-transparent border-b border-white/20 pb-4 text-center text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-sans tracking-[0.1em] text-sm"
                />
                <Button className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-6 tracking-[0.2em] text-xs mt-4 transition-all duration-300">
                  REQUEST INVITATION
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
