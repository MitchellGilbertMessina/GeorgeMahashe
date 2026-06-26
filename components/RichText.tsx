"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

type RichTextProps = {
  value: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-sm leading-relaxed text-neutral-700">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="font-metana text-xl mt-12 mb-4">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="font-metana text-lg mt-8 mb-3">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l pl-4 italic opacity-70 my-8">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-6 space-y-2">
        {children}
      </ul>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "";

      if (href.startsWith("/")) {
        return (
          <Link href={href} className="underline">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: RichTextProps) {
  return <PortableText value={value} components={components} />;
}