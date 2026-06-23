import { useState } from "react";

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
      setStatus("Thank you for contacting Alsaeron. We will be in touch.");
      form.reset();
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl tracking-widest mb-2">CONTACT</h1>
      <p className="text-gray-400 mb-10 tracking-wider">GET IN TOUCH WITH ALSAERON</p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4">
        <input name="name" required placeholder="Your Name" className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
        <input name="email" type="email" required placeholder="Your Email" className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
        <textarea name="message" required placeholder="Your Message" rows={5} className="bg-transparent border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"/>
        <button type="submit" className="border border-white py-3 tracking-widest hover:bg-white hover:text-black transition-all">
          SEND MESSAGE
        </button>
        {status && <p className="text-center text-gray-400 mt-2">{status}</p>}
      </form>
    </div>
  );
}