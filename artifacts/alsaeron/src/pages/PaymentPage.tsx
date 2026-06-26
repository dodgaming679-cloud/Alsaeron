import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

const UPI_ID = "alsaeron@ybl";
const UPI_NAME = "ALSAERON";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PaymentPage() {
  const { items, totalINR, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${totalINR}&cu=INR&tn=${encodeURIComponent("ALSAERON Order")}`;

  const checkoutData = (() => {
    try {
      const raw = sessionStorage.getItem("alsaeron-checkout");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, JPEG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }
    setError(null);
    setScreenshot(file);
    const preview = await fileToBase64(file);
    setScreenshotPreview(preview);
  }

  async function handlePlaceOrder() {
    if (!checkoutData) {
      setLocation("/checkout");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      let paymentScreenshot: string | undefined;
      if (screenshot) {
        paymentScreenshot = await fileToBase64(screenshot);
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutData,
          products: items.map((i) => ({
            id: i.id,
            name: i.name,
            category: i.category,
            price: i.price,
            priceINR: i.priceINR,
            quantity: i.quantity,
            slug: i.slug,
          })),
          totalAmount: formatINR(totalINR),
          paymentScreenshot,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Order submission failed");
      }

      const { orderId } = (await response.json()) as { orderId: string };
      clearCart();
      sessionStorage.removeItem("alsaeron-checkout");
      setLocation(`/order-success/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0 && !checkoutData) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      <div className="pt-28 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          onClick={() => setLocation("/checkout")}
          className="flex items-center gap-2 text-white/24 hover:text-white/60 transition-colors mb-14"
        >
          <ArrowLeft size={14} strokeWidth={1} />
          <span className="text-[9px] tracking-[0.28em] font-sans uppercase">Back to Details</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[9px] tracking-[0.36em] font-sans uppercase text-primary mb-3">
            Secure Payment
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-14 leading-tight">
            Complete your acquisition
            <br />
            <span className="text-white/28 italic">via UPI transfer.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: UPI Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {/* Amount */}
            <div
              className="mb-10 py-7 px-8"
              style={{ border: "1px solid rgba(37,99,235,0.12)", background: "rgba(37,99,235,0.03)" }}
            >
              <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/28 mb-3">
                Amount to Pay
              </p>
              <p className="font-serif text-4xl text-white/90">{formatINR(totalINR)}</p>
              <div className="mt-4 space-y-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-[10px] font-sans text-white/30">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-[10px] font-sans text-white/30">
                      {formatINR(item.priceINR * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPI ID */}
            <div className="mb-8">
              <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/28 mb-3">
                UPI ID
              </p>
              <div
                className="flex items-center justify-between py-4 px-6"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <span className="font-sans text-white/80 tracking-wider">{UPI_ID}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(UPI_ID)}
                  className="text-[8px] tracking-[0.2em] font-sans uppercase text-primary/60 hover:text-primary transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="mb-10">
              <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/28 mb-5">
                Scan QR Code
              </p>
              <div
                className="inline-block p-5 rounded-sm"
                style={{ background: "white" }}
              >
                <QRCodeSVG
                  value={upiString}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#04060A"
                  level="M"
                />
              </div>
              <p className="mt-4 text-[9px] text-white/20 font-sans leading-relaxed max-w-xs">
                Open any UPI app (GPay, PhonePe, Paytm, BHIM) and scan this code to pay {formatINR(totalINR)}.
              </p>
            </div>
          </motion.div>

          {/* Right: Screenshot upload + place order */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div
              className="mb-10 py-7 px-8"
              style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
            >
              <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/28 mb-2">
                Payment Instructions
              </p>
              <ol className="space-y-3 mt-4">
                {[
                  "Open your UPI app and pay the exact amount shown.",
                  "Take a screenshot of the successful payment confirmation.",
                  "Upload the screenshot below and click Place Order.",
                  "Your order will be confirmed within 24 hours by our concierge.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="flex-none w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-sans mt-0.5"
                      style={{ background: "rgba(37,99,235,0.15)", color: "rgba(37,99,235,0.8)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[11px] text-white/35 font-sans leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Upload */}
            <div className="mb-8">
              <p className="text-[9px] tracking-[0.28em] font-sans uppercase text-white/28 mb-4">
                Upload Payment Screenshot
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {screenshotPreview ? (
                <div className="relative">
                  <img
                    src={screenshotPreview}
                    alt="Payment screenshot"
                    className="w-full max-h-60 object-contain rounded-sm"
                    style={{ border: "1px solid rgba(37,99,235,0.2)" }}
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <CheckCircle2 size={14} strokeWidth={1.5} className="text-emerald-400/70" />
                    <span className="text-[10px] font-sans text-emerald-400/70">Screenshot uploaded</span>
                    <button
                      onClick={() => { setScreenshot(null); setScreenshotPreview(null); }}
                      className="ml-2 text-[9px] tracking-[0.1em] font-sans uppercase text-white/22 hover:text-white/50 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-12 flex flex-col items-center justify-center gap-4 transition-colors duration-400 group"
                  style={{
                    border: "1px dashed rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.01)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(37,99,235,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(37,99,235,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.01)";
                  }}
                >
                  <Upload size={22} strokeWidth={0.8} className="text-white/20 group-hover:text-white/40 transition-colors" />
                  <div className="text-center">
                    <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-white/25 group-hover:text-white/40 transition-colors">
                      Upload Screenshot
                    </p>
                    <p className="text-[9px] font-sans text-white/12 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </button>
              )}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-5 text-[10px] font-sans text-red-400/70 tracking-wide"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black transition-all duration-500 disabled:opacity-50"
              style={{ background: submitting ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.93)" }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(37,99,235,0.22)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = submitting ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.93)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={13} strokeWidth={1.5} className="animate-spin" />
                  Confirming Order…
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="mt-4 text-[9px] text-white/14 font-sans text-center leading-relaxed">
              By placing this order, you agree to ALSAERON's acquisition terms. All sales are final.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
