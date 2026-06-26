import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";

const ease = [0.16, 1, 0.3, 1] as const;

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalINR, totalItems } = useCart();
  const [, setLocation] = useLocation();

  function handleCheckout() {
    closeCart();
    setLocation("/checkout");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-[440px] flex flex-col"
            style={{ background: "rgba(4,6,10,0.98)", borderLeft: "1px solid rgba(255,255,255,0.05)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} strokeWidth={1} className="text-white/50" />
                <span className="text-[9px] tracking-[0.3em] font-sans uppercase text-white/50">
                  Your Selection
                </span>
                {totalItems > 0 && (
                  <span className="text-[9px] tracking-[0.2em] font-sans text-primary">
                    ({totalItems})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-7">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingBag size={32} strokeWidth={0.8} className="text-white/10 mb-6" />
                  <p className="text-white/20 font-serif text-lg italic">Your selection is empty.</p>
                  <p className="text-white/12 font-sans text-[10px] tracking-[0.2em] uppercase mt-2">
                    Explore the collection
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex gap-5"
                  >
                    {/* Product image */}
                    <div
                      className="w-20 h-20 flex-none rounded-sm overflow-hidden relative"
                      style={{ border: `1px solid rgba(${item.glowRgb},0.15)` }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `rgba(0,0,0,0.35)` }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] tracking-[0.22em] font-sans uppercase mb-1"
                        style={{ color: `rgba(${item.glowRgb},0.6)` }}>
                        {item.category}
                      </p>
                      <p className="text-white/80 font-serif text-sm leading-tight mb-1 truncate">
                        {item.name}
                      </p>
                      <p className="text-white/28 font-sans text-[10px] mb-3">
                        {formatINR(item.priceINR)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2"
                          style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px" }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <Minus size={11} strokeWidth={1.5} />
                          </button>
                          <span className="text-white/70 font-sans text-[11px] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <Plus size={11} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[9px] tracking-[0.15em] font-sans uppercase text-white/20 hover:text-white/50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item total */}
                    <div className="flex-none text-right">
                      <p className="text-white/50 font-serif text-sm">
                        {formatINR(item.priceINR * item.quantity)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.05] px-7 py-7">
                {/* Divider line */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/30">
                    Total
                  </span>
                  <span className="font-serif text-white/80 text-lg">
                    {formatINR(totalINR)}
                  </span>
                </div>
                <p className="text-[9px] text-white/18 font-sans leading-relaxed mb-6">
                  Prices in INR. UPI payment on next step.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black flex items-center justify-center gap-3 transition-all duration-500"
                  style={{ background: "rgba(255,255,255,0.93)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={13} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
