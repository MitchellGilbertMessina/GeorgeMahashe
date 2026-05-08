"use client";

import {
  motion,
  useMotionValue,
} from "framer-motion";

import { useState } from "react";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

type ArchiveItem = {
  _id: string;
  title: string;
  description: string;
  image?: any;

  x: number;
  y: number;

  width: number;

  rotation?: number;
};

export default function ArchiveCanvas({
  items,
}: {
  items: ArchiveItem[];
}) {
  const [selected, setSelected] =
    useState<ArchiveItem | null>(null);

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const [highestZ, setHighestZ] = useState(1);

  return (
    <div className="relative w-full h-[3000px] overflow-hidden bg-white" /*border border-red-500*/> 
      {items.map((item) => {
        const savedPosition =
          positions[item._id] || {
            x: item.x || 0,
            y: item.y || 0,
          };

        const x = useMotionValue(
          savedPosition.x
        );

        const y = useMotionValue(
          savedPosition.y
        );

        return (
          <motion.div
            key={item._id}
            drag
            dragMomentum={false}
            whileTap={{
              cursor: "grabbing",
            }}
            onMouseDown={() => {
              setSelected(item);
              setHighestZ(
                (prev) => prev + 1
              );
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
            className="absolute cursor-grab " //border border-blue-500
            style={{
              x,
              y,
              width: item.width || 300,
              rotate: `${item.rotation || 0}deg`,
              zIndex:
                selected?._id === item._id
                  ? highestZ
                  : 1,
            }}
          >
            {/* IMAGE OBJECT */}
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

            {/* TEXT OBJECT (HIDDEN FOR PRESENTATION)
            <p className="mt-2 text-sm">
              {item.title}
            </p>
            */}

            {/* DEBUG PANEL (HIDDEN FOR PRESENTATION)
            <div className="mt-1 text-[10px] text-neutral-500">
              x: {Math.round(x.get())}
              <br />
              y: {Math.round(y.get())}
            </div>
            */}
          </motion.div>
        );
      })}

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