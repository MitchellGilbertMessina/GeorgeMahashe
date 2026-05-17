"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useTransform,
} from "framer-motion";

import { useEffect } from "react";

export default function IridescentBackground({
  opacity = 0.95,
}: {
  opacity?: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  const angle = useMotionValue(0);
  const smoothAngle = useSpring(angle, { stiffness: 35, damping: 25 });
  const angleDeg = useTransform(smoothAngle, (a) => (a * 180) / Math.PI);

  const drift = useMotionValue(0);
  const driftSpring = useSpring(drift, { stiffness: 18, damping: 28 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x * 220);
      mouseY.set(y * 220);
      angle.set(Math.atan2(y, x));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, angle]);

  useAnimationFrame((t) => {
    drift.set(Math.sin(t / 7000) * 35);
  });

  return (
    <div
      className="
        block
        fixed inset-0
        -z-50
        pointer-events-none
        bg-[#f8f6f1]
      "
    >
      {/* ========================= */}
      {/* MOBILE STATIC LAYER       */}
      {/* ========================= */}
      <div
        className="md:hidden w-full h-full"
        style={{
          background: `
            conic-gradient(
              from 180deg at 60% 40%,
              rgba(255, 245, 210, 1),
              rgba(255, 220, 240, 0.95),
              rgba(210, 240, 255, 0.95),
              rgba(255, 235, 200, 1),
              rgba(255, 245, 210, 1)
            )
          `,
          filter: "blur(80px)",
          opacity: opacity,
        }}
      />

      {/* ========================= */}
      {/* MAIN IRIDESCENT FIELD     */}
      {/* ========================= */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: driftSpring,
          opacity: opacity,
        }}
        className="hidden md:block absolute inset-[-25%]"
      >
        <motion.div
          style={{ rotate: angleDeg }}
          className="w-full h-full blur-[80px]"
        >
          <div
            className="w-full h-full"
            style={{
              background: `
                conic-gradient(
                  from 180deg at 50% 50%,
                  rgba(255, 245, 210, 1),
                  rgba(255, 220, 240, 0.95),
                  rgba(210, 240, 255, 0.95),
                  rgba(255, 235, 200, 1),
                  rgba(255, 245, 210, 1)
                )
              `,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ========================= */}
      {/* SECONDARY LAYER           */}
      {/* ========================= */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: driftSpring,
          opacity: opacity * 1.45,
        }}
        className="hidden md:block absolute inset-[-35%] mix-blend-multiply"
      >
        <div
          className="w-full h-full blur-[140px]"
          style={{
            background: `
              radial-gradient(
                circle at 30% 30%,
                rgba(255, 230, 180, 0.7),
                transparent 45%
              ),
              radial-gradient(
                circle at 70% 60%,
                rgba(255, 245, 220, 0.6),
                transparent 50%
              ),
              radial-gradient(
                circle at 50% 80%,
                rgba(220, 235, 255, 0.35),
                transparent 45%
              )
            `,
          }}
        />
      </motion.div>
    </div>
  );
}