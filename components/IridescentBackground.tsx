"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

import { useEffect } from "react";

export default function IridescentBackground() {
  // -----------------------------
  // MOUSE MOTION (STRONGER)
  // -----------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 45,
    damping: 22,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 45,
    damping: 22,
  });

  // -----------------------------
  // AMBIENT DRIFT (slightly faster)
  // -----------------------------
  const drift = useMotionValue(0);
  const driftSpring = useSpring(drift, {
    stiffness: 18,
    damping: 28,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(
        (e.clientX / window.innerWidth - 0.5) * 220
      );

      mouseY.set(
        (e.clientY / window.innerHeight - 0.5) * 220
      );
    };

    window.addEventListener("mousemove", handleMove);
    return () =>
      window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  useAnimationFrame((t) => {
    drift.set(Math.sin(t / 6000) * 35);
  });

  return (
    <div
      className="
        fixed inset-0
        -z-10
        overflow-hidden
        pointer-events-none
        bg-white
      "
    >
      {/* ========================= */}
      {/* MAIN IRIDESCENT FIELD */}
      {/* ========================= */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: driftSpring,
        }}
        className="
          absolute
          inset-[-25%]
          opacity-75
        "
      >
        <div
          className="
            w-full
            h-full
            blur-[95px]
          "
          style={{
            background: `
              conic-gradient(
                from 180deg at 50% 50%,

                rgba(255, 245, 210, 0.95),
                rgba(255, 220, 240, 0.70),
                rgba(210, 240, 255, 0.70),
                rgba(255, 235, 200, 0.95),
                rgba(255, 245, 210, 0.95)
              )
            `,
          }}
        />
      </motion.div>

      {/* ========================= */}
      {/* SECONDARY COLOR FIELD */}
      {/* ========================= */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: driftSpring,
        }}
        className="
          absolute
          inset-[-35%]
          opacity-45
          mix-blend-multiply
        "
      >
        <div
          className="
            w-full
            h-full
            blur-[120px]
          "
          style={{
            background: `
              radial-gradient(
                circle at 25% 30%,
                rgba(255, 210, 170, 0.65),
                transparent 45%
              ),
              radial-gradient(
                circle at 70% 55%,
                rgba(220, 235, 255, 0.55),
                transparent 50%
              ),
              radial-gradient(
                circle at 50% 80%,
                rgba(255, 200, 230, 0.45),
                transparent 45%
              )
            `,
          }}
        />
      </motion.div>
    </div>
  );
}