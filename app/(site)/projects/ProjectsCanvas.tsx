"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Project = {
  _id: string;
  title: string;
  slug: string;
  heroImage?: string;
  shortDescription?: string;
  x?: number;
  y?: number;
  width?: number;
  rotation?: number;
};

export default function ProjectsCanvas({
  projects,
}: {
  projects: Project[];
}) {
  // =========================================================
  // EDIT MODE
  // =========================================================
  const EDIT_MODE = true;

  // =========================================================
  // STATE
  // =========================================================
  const [activeId, setActiveId] = useState<string | null>(null);
  const [highestZ, setHighestZ] = useState(1);

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP */}
      {/* ========================================================= */}
      <div
        className="
          hidden md:block
          relative w-full min-h-[2500px]
          overflow-hidden bg-white/20
        

        "
      >
        {projects.map((project) => {
          const currentPosition = positions[project._id] || {
            x: project.x || 0,
            y: project.y || 0,
          };

          return (
            <motion.div
              key={project._id}
              drag={EDIT_MODE}
              dragMomentum={false}
              whileTap={{ cursor: "grabbing" }}
              whileHover={{ scale: EDIT_MODE ? 1.02 : 1 }}
              onMouseDown={() => {
                setActiveId(project._id);
                setHighestZ((prev) => prev + 1);
              }}
              onDragEnd={(_, info) => {
                if (!EDIT_MODE) return;

                setPositions((prev) => ({
                  ...prev,
                  [project._id]: {
                    x: currentPosition.x + info.offset.x,
                    y: currentPosition.y + info.offset.y,
                  },
                }));
              }}
              animate={{
                x: currentPosition.x,
                y: currentPosition.y,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: project.width || 420,
                rotate: `${project.rotation || 0}deg`,
                zIndex:
                  activeId === project._id ? highestZ : 1,
              }}
              className={`
                absolute
                ${EDIT_MODE ? "cursor-grab active:cursor-grabbing" : ""}
              `}
            >
              {/* ===================================================== */}
              {/* CONTENT (NO LINK IN EDIT MODE) */}
              {/* ===================================================== */}
              {EDIT_MODE ? (
                <div className="block select-none">
                  {project.heroImage && (
                    <div className="relative overflow-hidden bg-neutral-100">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        width={1200}
                        height={800}
                        draggable={false}
                        className="w-full h-auto object-cover pointer-events-none select-none"
                      />
                    </div>
                  )}

                  <div className="pt-3 bg-transparent">
                    <h2 className="text-sm uppercase tracking-wide">
                      {project.title}
                    </h2>

                    {project.shortDescription && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {project.shortDescription}
                      </p>
                    )}

                    {/* DEBUG */}
                    <div className="mt-3 text-[10px] text-neutral-400 font-mono">
                      x: {Math.round(currentPosition.x)}
                      <br />
                      y: {Math.round(currentPosition.y)}
                      <br />
                      rotation: {project.rotation || 0}
                      <br />
                      width: {project.width || 420}
                    </div>
                  </div>
                </div>
              ) : (
                // =====================================================
                // VIEW MODE (SAFE LINK WRAPPING HERE)
                // =====================================================
                <Link
                  href={`/projects/${project.slug}`}
                  className="block"
                >
                  {project.heroImage && (
                    <div className="relative overflow-hidden bg-neutral-100">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  <div className="pt-3 bg-white">
                    <h2 className="text-sm uppercase tracking-wide">
                      {project.title}
                    </h2>

                    {project.shortDescription && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {project.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MOBILE (UNCHANGED SAFE LINK VERSION) */}
      {/* ========================================================= */}
      <div
        className="
          block md:hidden
          px-4 py-10
          space-y-16
          bg-white
        "
      >
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="block"
          >
            {project.heroImage && (
              <Image
                src={project.heroImage}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            )}

            <div className="mt-4">
              <h2 className="text-sm uppercase tracking-wide">
                {project.title}
              </h2>

              {project.shortDescription && (
                <p className="mt-2 text-sm text-neutral-500">
                  {project.shortDescription}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}