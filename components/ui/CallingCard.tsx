"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/components/cn";
import { useTheme } from "@/context/ThemeContext";
import { useSeriesSound } from "@/hooks/useSeriesSound";
import { ShadowNegotiation, type ShadowResponse } from "@/components/ShadowNegotiation";

// ─── All-Out Attack Finish (P5) ───────────────────────────────────────────────

function AllOutAttackFinish({ response }: { response: ShadowResponse }) {
  if (response !== "cool") {
    return (
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-brand-bg border-4 border-brand-accent p-8 -skew-x-12">
          <div className="skew-x-6 space-y-4">
            <p className="font-display text-4xl uppercase text-brand-main font-bold">
              {response === "neutral" ? "UNDERSTOOD" : "FINE."}
            </p>
            <p className="font-hand text-lg text-brand-accent uppercase">
              {response === "neutral"
                ? "Your contact info has been received."
                : "Submission accepted. Dismissed."}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "rgba(217, 35, 35, 0)",
            "rgba(217, 35, 35, 0.9)",
            "rgba(217, 35, 35, 0)",
          ],
        }}
        transition={{ duration: 0.6, times: [0, 0.5, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "rgba(235, 230, 230, 0)",
            "rgba(235, 230, 230, 1)",
            "rgba(235, 230, 230, 0)",
          ],
        }}
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
          className="w-32 h-32 mx-auto mb-6 text-brand-main drop-shadow-2xl"
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
          <div className="font-display text-8xl uppercase text-brand-main font-bold drop-shadow-2xl -skew-x-12 tracking-[0.08em]">
            SHOW
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-hand text-3xl uppercase tracking-[0.16em] text-brand-accent drop-shadow-lg">
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
        <div className="w-96 h-2 bg-brand-main -skew-x-12 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-1/4 z-0"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-80 h-2 bg-brand-accent -skew-x-12 drop-shadow-2xl" />
      </motion.div>
    </>
  );
}

// ─── Theurgy Finish (P3) ──────────────────────────────────────────────────────

function TheurgyFinish({ response }: { response: ShadowResponse }) {
  if (response !== "cool") {
    return (
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="rounded-3xl p-8 border border-[rgba(0,209,255,0.35)]"
          style={{
            background: "linear-gradient(180deg, rgba(234,246,255,0.12) 0%, rgba(7,20,35,0.95) 100%)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 32px rgba(0,209,255,0.15)",
          }}
        >
          <p className="font-display text-3xl uppercase text-brand-main font-bold">
            {response === "neutral" ? "ACKNOWLEDGED" : "SO IT GOES..."}
          </p>
          <p className="font-hand text-lg text-brand-accent/80 mt-3">
            {response === "neutral"
              ? "Your signal has been received across the void."
              : "Time marches on. Message filed."}
          </p>
        </div>
      </motion.div>
    );
  }

  // Full Theurgy: concentric rings + moonlight burst
  return (
    <>
      {/* Deep ocean pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at center, rgba(0,209,255,0) 0%, rgba(5,11,22,0) 100%)",
            "radial-gradient(circle at center, rgba(0,209,255,0.45) 0%, rgba(5,11,22,0.95) 60%)",
            "radial-gradient(circle at center, rgba(0,209,255,0) 0%, rgba(5,11,22,0) 100%)",
          ],
        }}
        transition={{ duration: 1.2, times: [0, 0.4, 1] }}
      />

      {/* Expanding rings */}
      {[0, 0.15, 0.3, 0.45].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full border border-[rgba(0,209,255,0.6)]"
          style={{
            width: 60,
            height: 60,
            marginTop: -30,
            marginLeft: -30,
            boxShadow: "0 0 12px rgba(0,209,255,0.25)",
          }}
          initial={{ scale: 0.2, opacity: 0.7 }}
          animate={{ scale: 4 + i * 1.4, opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 + delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Central moon orb */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 14 }}
      >
        <motion.div
          className="w-28 h-28 rounded-full mb-6 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(0,209,255,0.5) 0%, rgba(7,20,35,0.9) 70%)",
            boxShadow: "0 0 48px 12px rgba(0,209,255,0.35), 0 0 96px 24px rgba(0,209,255,0.12)",
            border: "2px solid rgba(0,209,255,0.5)",
          }}
          animate={{
            boxShadow: [
              "0 0 48px 12px rgba(0,209,255,0.35), 0 0 96px 24px rgba(0,209,255,0.12)",
              "0 0 72px 20px rgba(0,209,255,0.6), 0 0 120px 32px rgba(0,209,255,0.2)",
              "0 0 48px 12px rgba(0,209,255,0.35), 0 0 96px 24px rgba(0,209,255,0.12)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 32 32" className="w-14 h-14" fill="none">
            <path
              d="M14 4C8.5 5.5 4.5 10.5 4.5 16.5c0 7.2 5.8 13 13 13 6 0 11-3.9 12.5-9.5-1.5.8-3.2 1.2-5 1.2-6.1 0-11-4.9-11-11 0-1.8.4-3.5 1.2-5Z"
              fill="rgba(0,209,255,0.9)"
            />
          </svg>
        </motion.div>

        <motion.p
          className="font-display text-5xl uppercase text-brand-main font-bold tracking-[0.06em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ textShadow: "0 0 24px rgba(0,209,255,0.5)" }}
        >
          THEURGY
        </motion.p>

        <motion.p
          className="font-hand text-xl uppercase tracking-[0.2em] text-brand-accent/80 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{ textShadow: "0 0 12px rgba(0,209,255,0.3)" }}
        >
          THE BOND IS SEALED
        </motion.p>
      </motion.div>

      {/* Moonlight shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 1.4, delay: 0.6, times: [0, 0.4, 1] }}
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(234,246,255,0.5) 0%, transparent 50%)",
        }}
      />
    </>
  );
}

// ─── CallingCard (Main Export) ─────────────────────────────────────────────────

export function CallingCard() {
  const { currentSeries } = useTheme();
  const { playSubmit } = useSeriesSound(currentSeries);
  const [submitted, setSubmitted] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<ShadowResponse | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const isP3 = currentSeries === "P3";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setShowNegotiation(true);
    }
  };

  const handleNegotiationResponse = (response: ShadowResponse) => {
    setSelectedResponse(response);
    playSubmit();
    setShowNegotiation(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedResponse(null);
      setFormData({ name: "", email: "", message: "" });
    }, response === "cool" ? 4000 : 2500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-brand-bg">
      {/* Shadow Negotiation Dialog */}
      <ShadowNegotiation
        isOpen={showNegotiation}
        onClose={() => setShowNegotiation(false)}
        onRespond={handleNegotiationResponse}
      />

      {/* ── Finish Animations ─────────────────────────── */}
      <AnimatePresence>
        {submitted && selectedResponse && (
          <motion.div
            key="finish"
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isP3 ? (
              <TheurgyFinish response={selectedResponse} />
            ) : (
              <AllOutAttackFinish response={selectedResponse} />
            )}
            <motion.div
              className="absolute inset-0 bg-black/40 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Contact Form ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 120, y: 80, rotate: isP3 ? 0 : 8 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: isP3 ? 160 : 300,
          damping: isP3 ? 22 : 25,
          mass: 0.8,
        }}
        className="w-full max-w-2xl relative"
      >
        <div className="relative">
          {/* Shadow / glow behind card */}
          {isP3 ? (
            <div
              className="absolute -inset-3 rounded-3xl"
              style={{
                background: "radial-gradient(circle at 50% 40%, rgba(0,209,255,0.12) 0%, transparent 70%)",
                boxShadow: "0 0 48px rgba(0,209,255,0.1)",
              }}
            />
          ) : (
            <div
              className="absolute -inset-3 -skew-x-12 bg-brand-bg shadow-2xl"
              style={{ boxShadow: "-16px 16px 0 rgba(13, 13, 13, 0.9)" }}
            />
          )}

          <div
            className={cn(
              "relative p-10 sm:p-12 overflow-hidden border-4",
              isP3
                ? "rounded-3xl border-[rgba(0,209,255,0.35)]"
                : "-skew-x-12 border-brand-accent bg-brand-main",
            )}
            style={
              isP3
                ? {
                    background: "linear-gradient(180deg, rgba(0,209,255,0.18) 0%, rgba(7,20,35,0.96) 40%)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 0 32px rgba(0,209,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }
                : undefined
            }
          >
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: isP3
                  ? "radial-gradient(circle at 50% 50%, rgba(0,209,255,0.08) 1px, transparent 1px)"
                  : "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                backgroundSize: isP3 ? "8px 8px" : undefined,
              }}
            />

            <div className="relative z-10 space-y-8">
              <div className={isP3 ? "" : "skew-x-12"}>
                <h2
                  className={cn(
                    "font-display uppercase leading-tight tracking-[0.04em] font-black",
                    isP3
                      ? "text-5xl sm:text-6xl text-brand-main text-center"
                      : "text-6xl sm:text-7xl text-brand-bg",
                  )}
                  style={isP3 ? { textShadow: "0 0 24px rgba(0,209,255,0.4)" } : undefined}
                >
                  {isP3 ? (
                    <>
                      REACH ACROSS
                      <br />
                      THE VOID
                    </>
                  ) : (
                    <>
                      I WILL
                      <br />
                      STEAL YOUR
                      <br />
                      HEART
                    </>
                  )}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "message"].map((field) => {
                  const isTextarea = field === "message";
                  const Component = isTextarea ? "textarea" : "input";
                  return (
                    <div key={field} className={isP3 ? "" : "skew-x-12"}>
                      <Component
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={field.toUpperCase()}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        {...(isTextarea ? { rows: 4 } : {})}
                        className={cn(
                          "w-full px-0 py-3 font-hand text-lg uppercase tracking-[0.12em] focus:outline-none transition-colors",
                          isP3
                            ? "bg-transparent text-brand-accent placeholder-brand-accent/40 border-b-2 border-[rgba(0,209,255,0.3)] focus:border-brand-main"
                            : "bg-brand-bg text-brand-accent placeholder-brand-accent/50 border-b-4 border-brand-accent focus:border-brand-main",
                          isTextarea && "resize-none",
                        )}
                        required
                      />
                    </div>
                  );
                })}

                <div className="flex items-center justify-center pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.12, rotate: isP3 ? 0 : 4 }}
                    whileTap={{ scale: 0.96 }}
                    data-p5interactive="true"
                    className={cn(
                      "relative w-20 h-20 flex items-center justify-center font-display text-4xl font-bold uppercase transition-all shadow-lg",
                      isP3
                        ? "rounded-full bg-[rgba(0,209,255,0.15)] text-brand-main border-2 border-[rgba(0,209,255,0.5)] hover:bg-[rgba(0,209,255,0.3)] hover:border-brand-main"
                        : "bg-brand-bg text-brand-accent hover:bg-brand-main hover:text-brand-bg border-4 border-brand-accent hover:border-brand-bg skew-x-12 [clip-path:polygon(10%_0%,90%_0%,100%_50%,90%_100%,10%_100%,0%_50%)]",
                    )}
                    style={
                      isP3
                        ? { boxShadow: "0 0 20px rgba(0,209,255,0.2)" }
                        : undefined
                    }
                  >
                    {isP3 ? "☽" : "★"}
                  </motion.button>
                </div>
              </form>

              <div
                className={cn(
                  "text-center text-sm font-hand uppercase tracking-[0.16em]",
                  isP3 ? "text-brand-accent/50" : "skew-x-12 text-brand-bg/70",
                )}
              >
                <p>{isP3 ? "Memento Mori — the clock is ticking" : "Phantom Thieves await your call"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <motion.div
          animate={isP3 ? { opacity: [0.3, 0.6, 0.3] } : { x: [0, -4, 4, 0], y: [0, -4, 4, 0] }}
          transition={{ duration: isP3 ? 3 : 3, repeat: Infinity }}
          className={cn(
            "font-display text-xs uppercase tracking-[0.2em] font-bold",
            isP3 ? "text-brand-main/30" : "text-brand-main/20",
          )}
        >
          {isP3 ? "DARK HOUR" : "CODE: 0101"}
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-brand-accent/30 font-hand text-xs uppercase tracking-[0.15em]"
        >
          {isP3 ? "memento mori..." : "await response..."}
        </motion.div>
      </div>
    </div>
  );
}
