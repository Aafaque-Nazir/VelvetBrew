"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white pt-24 pb-12 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left: The Concierge Info */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
              The <span className="text-bronze-500">Concierge</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8 md:mb-12 leading-relaxed font-light">
              Our specialists are available for private consultation regarding proper machine calibration, bean selection, or order inquiries.
            </p>

            <div className="space-y-6 md:space-y-8">
              <ContactDetail
                icon={<Mail className="text-bronze-500" />}
                title="Direct Line"
                value="aafaquebuisness@gmail.com"
                breakWord
              />
              <ContactDetail
                icon={<Phone className="text-bronze-500" />}
                title="Studio"
                value="+1 (555) 000-0000"
              />
              <ContactDetail
                icon={<MapPin className="text-bronze-500" />}
                title="Atelier"
                value="Via Monte Napoleone, Milan, Italy"
              />
            </div>
          </div>

          {/* Right: The Form */}
          <div className="order-1 lg:order-2 bg-white/5 border border-white/10 p-6 md:p-12 rounded-3xl backdrop-blur-sm relative overflow-hidden">
             {/* Decorative noise */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <FloatingInput
                  label="Name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <FloatingInput
                label="Subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
              />
              <div className="relative pt-6">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-bronze-500 py-2 transition-colors peer resize-none"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-white/40 text-sm peer-focus:text-bronze-500 peer-focus:text-xs peer-focus:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-6 transition-all cursor-text pointer-events-none">
                  How can we assist you?
                </label>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  disabled={status === "loading" || status === "success"}
                  className="w-full relative overflow-hidden"
                >
                  {status === "idle" && (
                    <span className="flex items-center gap-2">Send Message <Send size={18} /></span>
                  )}
                  {status === "loading" && "Dispatching..."}
                  {status === "success" && "Message Received"}
                  {status === "error" && "Error. Try again."}
                </Button>
              </div>
              
              {status === "success" && (
                  <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-green-400 text-center text-sm mt-4">
                      Thank you. Our concierge will be in touch shortly.
                  </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ContactDetail({ icon, title, value, breakWord }) {
  return (
    <div className="flex items-start gap-4 group cursor-default">
      <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-bronze-500/50 transition-colors shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className={`text-white/60 ${breakWord ? 'break-all' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

function FloatingInput({ label, type = "text", ...props }) {
  return (
    <div className="relative pt-6">
      <input
        type={type}
        {...props}
        className="w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-bronze-500 py-2 transition-colors peer"
        placeholder=" "
      />
      <label className="absolute left-0 top-6 text-white/40 text-sm peer-focus:text-bronze-500 peer-focus:text-xs peer-focus:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-6 transition-all cursor-text pointer-events-none">
        {label}
      </label>
    </div>
  );
}
