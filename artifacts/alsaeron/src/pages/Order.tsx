import { useState } from "react";

export default function Order() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    product: "",
    utr: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/mqevawvj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        message: `
          NEW ORDER - ALSAERON
          Name: ${form.name}
          Phone: ${form.phone}
          Address: ${form.address}, ${form.city} - ${form.pincode}
          Product: ${form.product}
          UTR Number: ${form.utr}
        `
      }),
    });
    if (response.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl tracking-widest mb-2">PLACE ORDER</h1>
      <p className="text-gray-400 mb-10 tracking-wider text-center">COMPLETE YOUR PURCHASE</p>

      {step === 1 && (
        <div className="w-full max-w-lg border border-gray-800 p-8">
          <h2 className="text-xl tracking-widest mb-6 text-center">STEP 1 — PAY VIA UPI</h2>
          <div className="bg-gray-900 p-6 text-center mb-6">
            <p className="text-gray-400 text-sm mb-2 tracking-wider">UPI ID</p>
            <p className="text-white text-xl font-mono">6006949349@pthdfc</p>
          </div>
          <div className="bg-gray-900 p-4 text-center mb-6">
            <p className="text-gray-400 text-sm mb-2 tracking-wider">WHATSAPP SUPPORT</p>
            <a href="https://wa.me/916006949349" className="text-blue-400">+91 6006949349</a>
          </div>
          <p className="text-gray-400 text-sm text-center mb-6">
            Pay the product amount to the UPI ID above. After payment, note your <span className="text-white">UTR/Reference Number</span> from your UPI app.
          </p>
          <button
            onClick={() => setStep(2)}
            className="w-full border border-white py-3 tracking-widest hover:bg-white hover:text-black transition-all">
            I HAVE PAID → CONTINUE
          </button>
        </div>
      )}

      {step === 2 && status === "" && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4">
          <h2 className="text-xl tracking-widest mb-2 text-center">STEP 2 — YOUR DETAILS</h2>
          <input name="name" required placeholder="Full Name" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <input name="phone" required placeholder="Phone Number" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <textarea name="address" required placeholder="Full Shipping Address" onChange={(e) => setForm({...form, address: e.target.value})}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white" rows={3}/>
          <input name="city" required placeholder="City" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <input name="pincode" required placeholder="Pincode" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <input name="product" required placeholder="Product Name you ordered" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <input name="utr" required placeholder="UTR/Reference Number from UPI app" onChange={handleChange}
            className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
          <button type="submit"
            className="border border-white py-3 tracking-widest hover:bg-white hover:text-black transition-all">
            CONFIRM ORDER
          </button>
        </form>
      )}

      {status === "success" && (
        <div className="text-center border border-gray-800 p-10 max-w-lg w-full">
          <p className="text-2xl tracking-widest mb-4">ORDER RECEIVED</p>
          <p className="text-gray-400">Thank you for your order. We will verify your payment and contact you within 24 hours via WhatsApp.</p>
        </div>
      )}

      {status === "error" && (
        <p className="text-red-400 text-center">Something went wrong. Please WhatsApp us at +91 6006949349</p>
      )}
    </div>
  );
}