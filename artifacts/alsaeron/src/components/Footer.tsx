import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-24 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif tracking-[0.15em] text-white mb-6">ALSAERON</h2>
            <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
              Crafted Beyond Time. Bridging ancient majesty and futuristic precision to create artifacts of eternal power.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] text-white mb-6">EXPLORE</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Collections</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Bespoke Orders</Link></li>
              <li><Link href="/heritage" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Our Heritage</Link></li>
              <li><Link href="/journal" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">The Journal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] text-white mb-6">ASSISTANCE</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Contact Concierge</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Shipping & Returns</Link></li>
              <li><Link href="/product-care" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Product Care</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-white transition-colors text-sm font-light">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider">
            &copy; {new Date().getFullYear()} ALSAERON. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-white tracking-widest transition-colors">INSTAGRAM</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white tracking-widest transition-colors">TWITTER</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
