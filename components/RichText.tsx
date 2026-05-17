"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// =====================================================
// TYPES
// =====================================================

type RichTextProps = {
  value: PortableTextBlock[];
};

// =====================================================
// COMPONENTS
// =====================================================

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p
        className="
          text-sm
          leading-relaxed
          text-neutral-700
          mb-6
        "
      >
        {children}
      </p>
    ),
  },
};

// =====================================================
// COMPONENT
// =====================================================

export default function RichText({ value }: RichTextProps) {
  return (
    <div className="space-y-6">
      <PortableText value={value} components={components} />
    </div>
  );
}