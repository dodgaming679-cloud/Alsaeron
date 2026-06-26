import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartSidebar } from "@/components/CartSidebar";

const ease = [0.16, 1, 0.3, 1] as const;

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface FieldErrors {
  [key: string]: string;
}

function LuxuryInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label className="block text-[9px] tracking-[0.28em] font-sans uppercase mb-2"
        style={{ color: focused ? "rgba(37,99,235,0.8)" : "rgba(255,255,255,0.28)" }}>
        {label}{required && " *"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent font-sans text-sm text-white/80 placeholder-white/14 outline-none transition-all duration-400 py-3 px-0"
        style={{
          borderBottom: `1px solid ${error ? "rgba(239,68,68,0.5)" : focused ? "rgba(37,99,235,0.7)" : "rgba(255,255,255,0.1)"}`,
        }}
        autoComplete="off"
      />
      {error && (
        <p className="mt-1.5 text-[9px] tracking-[0.1em] font-sans text-red-400/70">{error}</p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalINR } = useCart();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    }
  }

  function validate(): boolean {
    const errs: FieldErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,15}$/.test(form.phone)) errs.phone = "Valid phone number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.pincode.trim() || !/^\d{5,6}$/.test(form.pincode)) errs.pincode = "Valid pincode is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    sessionStorage.setItem("alsaeron-checkout", JSON.stringify(form));
    setLocation("/payment");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <CartSidebar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6 text-center">
          <ShoppingBag size={40} strokeWidth={0.8} className="text-white/12" />
          <p className="font-serif text-2xl text-white/30 italic">Your selection is empty.</p>
          <button
            onClick={() => setLocation("/")}
            className="text-[10px] tracking-[0.28em] font-sans uppercase text-primary hover:text-white transition-colors"
          >
            Return to Collections
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartSidebar />

      <div className="pt-28 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/24 hover:text-white/60 transition-colors mb-14"
        >
          <ArrowLeft size={14} strokeWidth={1} />
          <span className="text-[9px] tracking-[0.28em] font-sans uppercase">Continue Shopping</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[9px] tracking-[0.36em] font-sans uppercase text-primary mb-3">
              Shipping Details
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-12 leading-tight">
              Where shall we deliver
              <br />
              <span className="text-white/28 italic">your acquisition?</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-9">
              <LuxuryInput
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="As on government ID"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <LuxuryInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="order@domain.com"
                  required
                />
                <LuxuryInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 9800000000"
                  required
                />
              </div>
              <LuxuryInput
                label="Shipping Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={errors.address}
                placeholder="Street address, apartment, suite"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
                <LuxuryInput
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />
                <LuxuryInput
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  error={errors.state}
                  required
                />
                <LuxuryInput
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                  placeholder="400001"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-4 px-12 py-4 text-[10px] tracking-[0.32em] font-sans uppercase text-black transition-all duration-500"
                  style={{ background: "rgba(255,255,255,0.93)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(37,99,235,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.93)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Continue to Payment
                  <ArrowRight size={13} strokeWidth={1.5} />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <p className="text-[9px] tracking-[0.36em] font-sans uppercase text-white/28 mb-8">
              Your Selection
            </p>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div
                    className="w-14 h-14 flex-none rounded-sm overflow-hidden relative"
                    style={{ border: `1px solid rgba(${item.glowRgb},0.15)` }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                    {item.quantity > 1 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-black text-[8px] flex items-center justify-center font-sans">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 font-serif text-sm leading-tight">{item.name}</p>
                    <p className="text-white/24 font-sans text-[9px] mt-0.5 uppercase tracking-[0.15em]">
                      {item.category}
                    </p>
                  </div>
                  <p className="text-white/40 font-serif text-sm flex-none">
                    {formatINR(item.priceINR * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="border-t border-white/[0.05] pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] tracking-[0.22em] font-sans uppercase text-white/28">Total</span>
                <span className="font-serif text-white/80 text-xl">{formatINR(totalINR)}</span>
              </div>
              <p className="text-[9px] text-white/14 font-sans leading-relaxed">
                Payment via UPI on next step. Insured private delivery within 7–21 working days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
