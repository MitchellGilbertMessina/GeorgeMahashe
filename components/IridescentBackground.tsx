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
  const angleDeg = useTransform(smoothAngle, (a) => -(a * 180) / Math.PI);

  const drift = useMotionValue(0);
  const driftSpring = useSpring(drift, { stiffness: 18, damping: 28 });

  // ── Hoist all derived values here, not inline in style props ──
  const backX = useTransform(smoothX, (v) => -v * 0.4);
  const backY = useTransform(smoothY, (v) => -v * 0.4);
  const backRotate = useTransform(driftSpring, (v) => -v * 0.5);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x * 300);
      mouseY.set(y * 300);
      angle.set(Math.atan2(y, x));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, angle]);

  useAnimationFrame((t) => {
    drift.set(Math.sin(t / 4000) * 55);
  });

  const iridescentStops = `
    rgba(255, 140, 190, 1) 0%,
    rgba(200, 150, 255, 0.95) 22%,
    rgba(100, 230, 255, 0.95) 45%,
    rgba(255, 235, 140, 1) 68%,
    rgba(255, 160, 140, 0.95) 85%,
    rgba(255, 140, 190, 1) 100%
  `;

  return (
    <div
      className="
        block
        fixed inset-0
        -z-50
        pointer-events-none
        bg-[#fbfaf7]
        overflow-hidden
      "
    >
      <style>{`
        @keyframes iridescent-spin {
          from { --conic-angle: 0deg; }
          to   { --conic-angle: -360deg; }
        }
        @property --conic-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .mobile-iridescent {
          animation: iridescent-spin 16s linear infinite;
          background: conic-gradient(
            from var(--conic-angle) at 50% 50%,
            ${iridescentStops}
          );
          filter: blur(60px);
        }
      `}</style>

      {/* MOBILE */}
      <div
        className="mobile-iridescent md:hidden w-full h-full"
        style={{ opacity }}
      />

      {/* MAIN IRIDESCENT FIELD */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          rotate: driftSpring,
          opacity,
        }}
        className="hidden md:block absolute inset-[-40%]"
      >
        <motion.div
          style={{ rotate: angleDeg }}
          className="w-full h-full blur-[70px]"
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, ${iridescentStops})`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* SECONDARY BACKLIGHT LAYER */}
      <motion.div
        style={{
          x: backX,
          y: backY,
          rotate: backRotate,
          opacity: opacity * 0.8,
        }}
        className="hidden md:block absolute inset-[-40%] mix-blend-multiply"
      >
        <div
          className="w-full h-full blur-[100px]"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(255, 120, 180, 0.5), transparent 55%),
              radial-gradient(circle at 75% 35%, rgba(70, 210, 255, 0.5), transparent 55%),
              radial-gradient(circle at 50% 75%, rgba(255, 220, 100, 0.4), transparent 55%)
            `,
          }}
        />
      </motion.div>

      {/* NOISE OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}