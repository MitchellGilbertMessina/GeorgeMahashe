"use client";

import { useMemo, useState } from "react";
import type { ProgrammingItem } from "@/types/programming";
import ProgrammingCard from "./ProgrammingCard";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// =====================================================
// TYPES
// =====================================================

type Settings = {
  programmingResidenciesIntro?: PortableTextBlock[];
  programmingEventsIntro?: PortableTextBlock[];
  programmingExhibitionsIntro?: PortableTextBlock[];
};

type Tab = "Residencies" | "Events" | "Exhibitions";

const tabs: Tab[] = ["Residencies", "Events", "Exhibitions"];

// =====================================================
// HELPERS
// =====================================================

function mapCategory(tab: Tab) {
  switch (tab) {
    case "Residencies":
      return "residency";
    case "Events":
      return "event";
    case "Exhibitions":
      return "exhibition";
  }
}

// =====================================================
// COMPONENT
// =====================================================

export default function ProgrammingTabs({
  items,
  settings,
}: {
  items: ProgrammingItem[];
  settings?: Settings;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Residencies");

  const filtered = useMemo(() => {
    const category = mapCategory(activeTab);
    return items.filter((item) => item.category === category);
  }, [items, activeTab]);

  // pick correct intro block
  const intro =
    activeTab === "Residencies"
      ? settings?.programmingResidenciesIntro
      : activeTab === "Events"
      ? settings?.programmingEventsIntro
      : settings?.programmingExhibitionsIntro;

  return (
    <div>
      {/* ===================================================== */}
      {/* TABS */}
      {/* ===================================================== */}

      <div className="flex gap-6 text-xs uppercase tracking-widest mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`transition ${
              activeTab === tab
                ? "opacity-100"
                : "opacity-40 hover:opacity-80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===================================================== */}
      {/* INTRO TEXT */}
      {/* ===================================================== */}

      {intro && (
        <div className="max-w-2xl text-sm opacity-70 leading-relaxed mb-12">
          <PortableText value={intro} />
        </div>
      )}

      {/* ===================================================== */}
      {/* LIST */}
      {/* ===================================================== */}

      <div className="space-y-20">
        {filtered.map((item) => (
          <ProgrammingCard key={item._id} item={item} />
        ))}

        {filtered.length === 0 && (
          <p className="text-sm opacity-40">
            No items in this category.
          </p>
        )}
      </div>
    </div>
  );
}