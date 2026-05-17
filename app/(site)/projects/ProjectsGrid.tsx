"use client";

import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";

// =====================================================
// TYPES
// =====================================================

type Project = {
  _id: string;
  title: string;
  slug: string;
  heroImage?: string;

  // supports BOTH old string + new Portable Text
  shortDescription?: string | PortableTextBlock[];
};

// =====================================================
// COMPONENT
// =====================================================

export default function ProjectsGrid({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div
      className="
        w-full
        max-w-[100rem]
        mx-auto
        px-4
        py-20
      "
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="
              group
              block
              hover:border-neutral-400
              transition
              duration-300
              bg-white/50
              overflow-hidden
            "
          >
            {/* IMAGE */}
            {project.heroImage && (
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            )}

            {/* TEXT */}
            <div className="p-4">
              <h2 className="text-sm tracking-wide font-metana">
                {project.title}
              </h2>

              {project.shortDescription && (
                <div className="mt-3">
                  {/* SAFE GUARD FOR OLD + NEW DATA */}
                  {Array.isArray(project.shortDescription) ? (
                    <RichText value={project.shortDescription} />
                  ) : (
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}