"use client";

import { useState, useRef, useState as useReactState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { ArchiveItem } from "@/types/project";

export default function DraggableCanvas({
  items,
}: {
  items: ArchiveItem[];
}) {
  const [selected, setSelected] = useState<ArchiveItem | null>(null);
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [highestZ, setHighestZ] = useState(1);

  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* DESKTOP */}
      <div
        ref={canvasRef}
        className="hidden md:block relative w-full h-[3000px]"
      >
        {items.map((item) => (
          <ArchiveItemCard
            key={item._id}
            item={item}
            selected={selected}
            setSelected={setSelected}
            positions={positions}
            setPositions={setPositions}
            highestZ={highestZ}
            setHighestZ={setHighestZ}
            canvasRef={canvasRef}
          />
        ))}

        {/* INFO PANEL */}
        <div
          className={`fixed bottom-0 left-0 w-full border-t border-black bg-white/90 backdrop-blur-md transition-transform duration-300 z-50 ${
            selected ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4 space-y-3">
            <p className="text-sm">{selected?.description}</p>

            {selected?.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide opacity-50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden px-4 py-8 space-y-[-40px]">
        {items.map((item, index) => (
          <button
            key={item._id}
            onClick={() => setSelected(item)}
            className="relative block w-full bg-white shadow-sm"
            style={{
              transform: `rotate(${index % 2 ? 2 : -2}deg)`,
              zIndex: index,
            }}
          >
            {item.image && (
              <Image
                src={urlFor(item.image).url()}
                alt={item.title ?? "Archive item"}
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
            )}
          </button>
        ))}

        {/* MOBILE PANEL */}
        <div
          className={`fixed bottom-0 left-0 w-full border-t border-black bg-white/90 backdrop-blur-md transition-transform duration-300 z-50 ${
            selected ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4 space-y-3">
            <p className="text-sm">{selected?.description}</p>

            {selected?.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide opacity-50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <button
              onClick={() => setSelected(null)}
              className="text-xs uppercase opacity-60 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
// =====================================================
// CORRECTED ITEM CARD
// =====================================================

function ArchiveItemCard({
  item,
  selected,
  setSelected,
  positions,
  setPositions,
  highestZ,
  setHighestZ,
  canvasRef,
}: {
  item: ArchiveItem;
  selected: ArchiveItem | null;
  setSelected: (item: ArchiveItem | null) => void;
  positions: Record<string, { x: number; y: number }>;
  setPositions: React.Dispatch<
    React.SetStateAction<Record<string, { x: number; y: number }>>
  >;
  highestZ: number;
  setHighestZ: React.Dispatch<React.SetStateAction<number>>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  const currentPos = positions[item._id] || { x: item.x || 0, y: item.y || 0 };
  const [debugPos, setDebugPos] = useReactState({ x: currentPos.x, y: currentPos.y });

  // ----------------------------------------------------
  // MANUAL DEBUG SWITCH
  // Switch the comment tags below before pushing live!
  // ----------------------------------------------------
  //const showDebugOverlay = true;  // <-- Uncomment this to see coordinates locally
  const showDebugOverlay = false; // <-- Keep this active when pushing to production
  // ----------------------------------------------------

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={canvasRef}
      onMouseDown={() => {
        setSelected(item);
        setHighestZ((p) => p + 1);
      }}
      onDrag={(event, info) => {
        setDebugPos({
          x: currentPos.x + info.offset.x,
          y: currentPos.y + info.offset.y,
        });
      }}
      onDragEnd={(event, info) => {
        setPositions((prev) => ({
          ...prev,
          [item._id]: { 
            x: currentPos.x + info.offset.x, 
            y: currentPos.y + info.offset.y 
          },
        }));
      }}
      className="absolute cursor-grab"
      animate={{
        x: currentPos.x,
        y: currentPos.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0 }}
      style={{
        width: item.width || 300,
        rotate: `${item.rotation || 0}deg`,
        zIndex: selected?._id === item._id ? highestZ : 1,
      }}
    >
      {/* IMAGE */}
      {item.image && (
        <Image
          src={urlFor(item.image).url()}
          alt={item.title ?? "Archive item"}
          width={1000}
          height={1000}
          className="w-full h-auto pointer-events-none"
        />
      )}

      {/* =========================
          DEBUG OVERLAY
      ========================= */}
      {showDebugOverlay && selected?._id === item._id && (
        <div className="absolute top-0 left-0 bg-black text-white text-[10px] px-2 py-1 opacity-70 pointer-events-none z-50">
          x: {Math.round(debugPos.x)} <br />
          y: {Math.round(debugPos.y)}
        </div>
      )}
    </motion.div>
  );
}