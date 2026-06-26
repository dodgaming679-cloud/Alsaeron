import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "COLLECTIONS", href: "#collections" },
    { name: "HERITAGE", href: "#heritage" },
    { name: "BESPOKE", href: "#bespoke" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-white transition-opacity group-hover:opacity-80">
            ALSAERON
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-sans tracking-[0.15em] text-muted-foreground hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.name}
            </a>
          ))}

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative text-white/40 hover:text-white transition-colors duration-300 ml-2"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} strokeWidth={1} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[8px] font-sans font-medium flex items-center justify-center text-black"
                style={{ background: "rgba(37,99,235,1)" }}
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </nav>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative text-white/50 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[7px] font-sans flex items-center justify-center text-black"
                style={{ background: "rgba(37,99,235,1)" }}
              >
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full h-screen bg-background border-t border-white/10 flex flex-col items-center justify-center gap-8 pb-32"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif tracking-[0.2em] text-muted-foreground hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
