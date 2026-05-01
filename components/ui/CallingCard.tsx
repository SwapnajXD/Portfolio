"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/components/cn";

export function CallingCard() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-p5-black">
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="finish"
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ background: ["rgba(217, 35, 35, 0)", "rgba(217, 35, 35, 0.9)", "rgba(217, 35, 35, 0)"] }}
              transition={{ duration: 0.6, times: [0, 0.5, 1] }}
            />

            <motion.div
              className="absolute inset-0"
              animate={{ background: ["rgba(235, 230, 230, 0)", "rgba(235, 230, 230, 1)", "rgba(235, 230, 230, 0)"] }}
              transition={{ duration: 0.6, delay: 0.15, times: [0, 0.5, 1] }}
            />

            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 10 }}
            >
              <svg
                viewBox="0 0 200 200"
                className="w-32 h-32 mx-auto mb-6 text-p5-red drop-shadow-2xl"
                fill="currentColor"
              >
                <path d="M100 20C150 20 180 50 180 100C180 150 150 180 100 180C50 180 20 150 20 100C20 50 50 20 100 20Z" />
                <path d="M70 80L85 95L100 80M100 80L115 95L130 80" stroke="#0d0d0d" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M80 130Q100 145 120 130" stroke="#0d0d0d" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, rotate: -8 }}
                animate={{ opacity: 1, rotate: 8 }}
                transition={{ delay: 0.6 }}
              >
                <div className="font-display text-8xl uppercase text-p5-red font-bold drop-shadow-2xl -skew-x-12 tracking-[0.08em]">
                  SHOW
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="font-hand text-3xl uppercase tracking-[0.16em] text-p5-white drop-shadow-lg">
                  IS OVER
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute top-20 left-1/2 -translate-x-1/2 z-0"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="w-96 h-2 bg-p5-red -skew-x-12 drop-shadow-2xl" />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-1/4 z-0"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="w-80 h-2 bg-p5-white -skew-x-12 drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 120, y: 80, rotate: 8 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
        className="w-full max-w-2xl relative"
      >
        <div className="relative">
          <div className="absolute -inset-3 -skew-x-12 bg-p5-black shadow-2xl" style={{ boxShadow: "-16px 16px 0 rgba(13, 13, 13, 0.9)" }} />

          <div className="relative bg-p5-red border-4 border-p5-white -skew-x-12 p-10 sm:p-12 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              }}
            />

            <div className="relative z-10 space-y-8">
              <div className="skew-x-12">
                <h2 className="font-display text-6xl sm:text-7xl uppercase leading-tight tracking-[0.04em] text-p5-black font-black">
                  I WILL
                  <br />
                  STEAL YOUR
                  <br />
                  HEART
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="skew-x-12">
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-p5-black text-p5-white placeholder-p5-white/50 border-b-4 border-p5-white px-0 py-3 font-hand text-lg uppercase tracking-[0.12em] focus:outline-none focus:border-p5-red transition-colors"
                    required
                  />
                </div>

                <div className="skew-x-12">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-p5-black text-p5-white placeholder-p5-white/50 border-b-4 border-p5-white px-0 py-3 font-hand text-lg uppercase tracking-[0.12em] focus:outline-none focus:border-p5-red transition-colors"
                    required
                  />
                </div>

                <div className="skew-x-12">
                  <textarea
                    name="message"
                    placeholder="MESSAGE"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-p5-black text-p5-white placeholder-p5-white/50 border-b-4 border-p5-white px-0 py-3 font-hand text-lg uppercase tracking-[0.12em] focus:outline-none focus:border-p5-red transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-center pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.12, rotate: 4 }}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      "relative w-20 h-20 flex items-center justify-center font-display text-4xl font-bold uppercase transition-all",
                      "bg-p5-black text-p5-white hover:bg-p5-red hover:text-p5-black",
                      "border-4 border-p5-white hover:border-p5-black",
                      "skew-x-12 shadow-lg",
                      "[clip-path:polygon(10%_0%,90%_0%,100%_50%,90%_100%,10%_100%,0%_50%)]",
                    )}
                  >
                    ★
                  </motion.button>
                </div>
              </form>

              <div className="skew-x-12 text-center text-sm font-hand uppercase tracking-[0.16em] text-p5-black/70">
                <p>Phantom Thieves await your call</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute top-10 left-10 pointer-events-none">
        <motion.div
          animate={{ x: [0, -4, 4, 0], y: [0, -4, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-p5-red/20 font-display text-xs uppercase tracking-[0.2em] font-bold"
        >
          CODE: 0101
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-p5-white/30 font-hand text-xs uppercase tracking-[0.15em]"
        >
          await response...
        </motion.div>
      </div>
    </div>
  );
}
