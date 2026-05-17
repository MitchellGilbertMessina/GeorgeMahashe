"use client";

import { PortableText } from "@portabletext/react";

const components = {

  block: {

    normal: ({ children }: any) => (
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

export default function RichText({
  value,
}: {
  value: any;
}) {

  return (
    <div className="space-y-6">

      <PortableText
        value={value}
        components={components}
      />

    </div>
  );
}