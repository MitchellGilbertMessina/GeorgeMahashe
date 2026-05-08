"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";

type Props = {
  data: any;
};

const tabs = [
  "Bio",
  "Contact",
  "Exhibitions",
  "Published Texts",
  "Other Websites",
] as const;

export default function AboutTabs({ data }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Bio");

  return (
    <div className="w-full">
      {/* TAB HEADER */}
      <div className="w-full border-b border-gray-200 bg-white py-6">
        <div className="max-w-5xl mx-auto flex gap-8 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative text-sm whitespace-nowrap"
            >
              {/* Invisible bold version to lock width */}
              <span className="font-bold opacity-0 absolute">
                {tab}
              </span>

              {/* Visible text */}
              <span
                className={`transition ${activeTab === tab
                    ? "font-bold"
                    : "font-normal opacity-60 hover:opacity-100"
                  }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        {activeTab === "Bio" && (
          <p className="text-base leading-relaxed">{data.bio}</p>
        )}

        {activeTab === "Contact" && (
          <div className="space-y-2">
            <p>{data.contactDetails?.email}</p>
            <p>{data.contactDetails?.phone}</p>
            <p>{data.contactDetails?.location}</p>

            {data.contactDetails?.socials?.length > 0 && (
              <div className="pt-4 space-y-1">
                {data.contactDetails.socials.map((s: any, i: number) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    className="block underline"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Exhibitions" && (
          <PortableText value={data.exhibitions} />
        )}

        {activeTab === "Published Texts" && (
          <PortableText value={data.publishedTexts} />
        )}

        {activeTab === "Other Websites" && (
          <div className="grid gap-5 md:grid-cols-2">
            {data.otherWebsites?.map((item: any, i: number) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
              >
                {item.image?.asset?.url && (
                  <img
                    src={item.image.asset.url}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm opacity-70 mt-1">
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