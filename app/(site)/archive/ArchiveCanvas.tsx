"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ArchiveItem = {
  _id: string;
  title: string;
  description: string;
  image: any;
  x: number;
  y: number;
  width: number;
};

export default function ArchiveCanvas({
  items,
}: {
  items: ArchiveItem[];
}) {
  const [selected, setSelected] = useState<ArchiveItem | null>(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {items.map((item) => (
        <motion.div
          key={item._id}
          drag
          dragMomentum={false}
          whileTap={{ cursor: "grabbing" }}
          onClick={() => setSelected(item)}
          className="absolute cursor-grab"
          initial={{
            x: item.x || 0,
            y: item.y || 0,
          }}
          style={{
            width: item.width || 300,
          }}
        >
          <Image
            src={urlFor(item.image).url()}
            alt={item.title}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />

          <p className="mt-2 text-sm">
            {item.title}
          </p>
        </motion.div>
      ))}

      {/* Bottom Banner */}
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