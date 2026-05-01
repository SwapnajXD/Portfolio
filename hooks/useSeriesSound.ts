'use client';

import { useEffect, useRef } from "react";
import type { Series } from "@/context/ThemeContext";

type SoundType = "hover" | "submit" | "toggle";

const p5SoundDefinitions: Record<Exclude<SoundType, "toggle">, { frequency: number; duration: number; type: OscillatorType }> = {
  hover: { frequency: 800, duration: 0.08, type: "square" },
  submit: { frequency: 600, duration: 0.3, type: "triangle" },
};

const p3SoundDefinitions: Record<Exclude<SoundType, "toggle">, { frequency: number; duration: number; type: OscillatorType }> = {
  hover: { frequency: 440, duration: 0.2, type: "sine" },
  submit: { frequency: 523.25, duration: 0.4, type: "sine" },
};

export function useSeriesSound(series: Series) {
  const contextRef = useRef<AudioContext | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initAudio = () => {
      if (typeof window === "undefined" || initializedRef.current) {
        return;
      }

      try {
        const AudioContextCtor = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextCtor) {
          return;
        }

        contextRef.current = new AudioContextCtor();
        initializedRef.current = true;
      } catch {
        contextRef.current = null;
      }
    };

    const handleUserGesture = () => {
      initAudio();
      document.removeEventListener("pointerdown", handleUserGesture);
      document.removeEventListener("keydown", handleUserGesture);
    };

    document.addEventListener("pointerdown", handleUserGesture);
    document.addEventListener("keydown", handleUserGesture);

    return () => {
      document.removeEventListener("pointerdown", handleUserGesture);
      document.removeEventListener("keydown", handleUserGesture);
    };
  }, []);

  const playSound = (soundType: Exclude<SoundType, "toggle">) => {
    const ctx = contextRef.current;
    if (!ctx || ctx.state === "suspended") {
      return;
    }

    const definition = series === "P3" ? p3SoundDefinitions[soundType] : p5SoundDefinitions[soundType];

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = definition.type;
    oscillator.frequency.value = definition.frequency;

    filter.type = series === "P3" ? "lowpass" : "highpass";
    filter.frequency.value = series === "P3" ? 1800 : 600;

    gain.gain.setValueAtTime(series === "P3" ? 0.12 : 0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + definition.duration);

    if (series === "P3") {
      delay.delayTime.value = 0.035;
      feedback.gain.value = 0.22;
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);
      gain.connect(ctx.destination);
    } else {
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
    }

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + definition.duration);
  };

  return {
    playHover: () => playSound("hover"),
    playSubmit: () => playSound("submit"),
  };
}