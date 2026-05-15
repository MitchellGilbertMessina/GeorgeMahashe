"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";

// =====================================================
// TYPES
// =====================================================

type WebsiteItem = {
  url: string;
  title: string;
  description?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
};

type TabData = {
  bio?: PortableTextBlock[];
  exhibitions?: PortableTextBlock[];
  publishedTexts?: PortableTextBlock[];
  otherWebsites?: WebsiteItem[];
};

type Props = {
  data: TabData;
};

// =====================================================
// TABS
// =====================================================

const tabs = [
  "Bio",
  "Exhibitions",
  "Published Texts",
  "Other Websites",
] as const;

type Tab = (typeof tabs)[number];

// =====================================================
// COMPONENT
// =====================================================

export default function AboutTabs({ data }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Bio");

  return (
    <div className="w-full">

      {/* TAB HEADER */}
      <div className="w-full bg-transparent py-6">
        <div className="max-w-5xl mx-auto flex justify-between sm:justify-start sm:gap-8 px-4 sm:px-6 overflow-x-auto text-xs sm:text-sm">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative whitespace-nowrap flex-shrink-0"
            >
              <span className="font-bold opacity-0 absolute">
                {tab}
              </span>

              <span
                className={`transition ${
                  activeTab === tab
                    ? "font-bold"
                    : "font-normal opacity-80 hover:opacity-100"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">

        {activeTab === "Bio" && data.bio && (
          <div className="space-y-6 leading-relaxed">
            <PortableText value={data.bio} />
          </div>
        )}

        {activeTab === "Exhibitions" && data.exhibitions && (
          <div className="space-y-6 leading-relaxed">
            <PortableText value={data.exhibitions} />
          </div>
        )}

        {activeTab === "Published Texts" && data.publishedTexts && (
          <div className="space-y-6 leading-relaxed">
            <PortableText value={data.publishedTexts} />
          </div>
        )}

        {activeTab === "Other Websites" && (
          <div className="flex flex-col gap-10">

            {data.otherWebsites?.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {/* IMAGE */}
                {item.image?.asset?.url && (
                  <div className="w-full mb-3">
                    <Image
                      src={item.image.asset.url}
                      alt={item.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {/* TEXT */}
                <div className="space-y-1">
                  <h3 className="font-medium hover-accent transition">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-sm opacity-70 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </a>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}