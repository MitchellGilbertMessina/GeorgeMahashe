"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// =====================================================
// TYPES
// =====================================================

type ArchiveItem = {
  _id: string;
  title: string;
  description: string;
  image?: SanityImageSource;

  x: number;
  y: number;

  width: number;
  rotation?: number;
};

// =====================================================
// PARENT COMPONENT
// =====================================================

export default function ArchiveCanvas({
  items,
}: {
  items: ArchiveItem[];
}) {
  const [selected, setSelected] = useState<ArchiveItem | null>(null);

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const [highestZ, setHighestZ] = useState(1);

  return (
    <div className="relative w-full h-[3000px] overflow-hidden bg-trans">
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
        />
      ))}

      {/* BOTTOM INFO BANNER */}
      <div
        className={`
          fixed bottom-0 left-0 w-full
          border-t border-black
          bg-white
          transition-transform duration-300
          ${
            selected
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
      >
        <div className="p-4">
          <p className="text-sm">
            {selected?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// CHILD COMPONENT (HOOKS SAFE)
// =====================================================

function ArchiveItemCard({
  item,
  selected,
  setSelected,
  positions,
  setPositions,
  highestZ,
  setHighestZ,
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
}) {
  const savedPosition = positions[item._id] || {
    x: item.x || 0,
    y: item.y || 0,
  };

  const x = useMotionValue(savedPosition.x);
  const y = useMotionValue(savedPosition.y);

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
      onMouseDown={() => {
        setSelected(item);
        setHighestZ((prev) => prev + 1);
      }}
      onDragEnd={() => {
        setPositions((prev) => ({
          ...prev,
          [item._id]: {
            x: x.get(),
            y: y.get(),
          },
        }));
      }}
      className="absolute cursor-grab"
      style={{
        x,
        y,
        width: item.width || 300,
        rotate: `${item.rotation || 0}deg`,
        zIndex: selected?._id === item._id ? highestZ : 1,
      }}
    >
      {item.image && (
        <Image
          src={urlFor(item.image).url()}
          alt={item.title}
          width={1000}
          height={1000}
          draggable={false}
          className="w-full h-auto object-cover pointer-events-none"
        />
      )}
    </motion.div>
  );
}