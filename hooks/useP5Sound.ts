import { useEffect, useRef } from "react";

type SoundType = "hover" | "submit";

const soundDefinitions: Record<SoundType, { frequency: number; duration: number; type: "square" | "sine" | "triangle" }> = {
  hover: { frequency: 800, duration: 0.08, type: "square" },
  submit: { frequency: 600, duration: 0.3, type: "triangle" },
};

export function useP5Sound() {
  const contextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  const initAudioContext = () => {
    if (typeof window === "undefined" || isInitializedRef.current) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      contextRef.current = audioContext;
      isInitializedRef.current = true;
    } catch (err) {
      console.warn("Web Audio API not supported");
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      initAudioContext();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const playSound = (soundType: SoundType) => {
    if (!contextRef.current || contextRef.current.state === "suspended") {
      return;
    }

    try {
      const ctx = contextRef.current;
      const { frequency, duration, type } = soundDefinitions[soundType];

      const osci = ctx.createOscillator();
      osci.frequency.value = frequency;
      osci.type = type;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osci.connect(gain);
      gain.connect(ctx.destination);

      osci.start(ctx.currentTime);
      osci.stop(ctx.currentTime + duration);
    } catch (err) {
      console.warn("Failed to play sound:", err);
    }
  };

  const playHover = () => playSound("hover");
  const playSubmit = () => playSound("submit");

  return { playHover, playSubmit };
}
