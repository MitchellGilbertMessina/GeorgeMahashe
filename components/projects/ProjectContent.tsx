import Image from "next/image";
import { PortableText } from "@portabletext/react";

type Props = {
  project: any;
  depth?: number;
};

export default function ProjectContent({
  project,
  depth = 0,
}: Props) {

  // ============================================
  // SAFETY AGAINST INFINITE RECURSION
  // ============================================

  if (depth > 3) {
    return null;
  }

  return (
    <div className="space-y-12">

      {/* ======================================== */}
      {/* TITLE */}
      {/* ======================================== */}

      <header className="space-y-4">

        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>

      </header>

      {/* ======================================== */}
      {/* HERO IMAGE */}
      {/* ======================================== */}

      {project.heroImage && (
        <Image
          src={project.heroImage}
          alt={project.alt || project.title}
          width={1600}
          height={1200}
          className="w-full h-auto"
        />
      )}

      {/* ======================================== */}
      {/* PAGE BUILDER */}
      {/* ======================================== */}

      <div className="space-y-16">

        {project.pageBuilder?.map(
          (block: any, index: number) => {

            switch (block._type) {

              // ====================================
              // TEXT BLOCK
              // ====================================

             case "textBlock":
  return (
    <div key={index} className="prose prose-sm max-w-none">
      <PortableText value={block.content} />
    </div>
  );

              // ====================================
              // HEADING BLOCK
              // ====================================

              case "headingBlock":
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold"
                  >
                    {block.heading}
                  </h2>
                );

              // ====================================
              // IMAGE BLOCK
              // ====================================

              case "imageBlock":
                return (
                  <div key={index}>

                    {block.image?.asset?.url && (
                      <Image
                        src={block.image.asset.url}
                        alt={block.caption || ""}
                        width={1600}
                        height={1200}
                        className="w-full h-auto"
                      />
                    )}

                    {block.caption && (
                      <p
                        className="
                          mt-2
                          text-sm
                          text-neutral-500
                        "
                      >
                        {block.caption}
                      </p>
                    )}
                  </div>
                );

              // ====================================
              // GALLERY BLOCK
              // ====================================

              case "galleryBlock":
                return (
                  <div
                    key={index}
                    className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >

                    {block.images?.map(
                      (
                        image: any,
                        imageIndex: number
                      ) => (

                        <Image
                          key={imageIndex}
                          src={image.asset.url}
                          alt=""
                          width={1000}
                          height={1000}
                          className="
                            w-full
                            h-auto
                          "
                        />
                      )
                    )}
                  </div>
                );

              // ====================================
              // PROJECT REFERENCE BLOCK
              // ====================================

              case "projectReferenceBlock":

                if (!block.project) {
                  return null;
                }

                return (

                  <div
                    key={index}
                    className="
                      my-24
                    "
                  >

                    {/* RECURSIVE RENDER */}

                    <ProjectContent
                      project={block.project}
                      depth={depth + 1}
                    />
                  </div>
                );

              default:
                return null;
            }
          }
        )}
      </div>
    </div>
  );
}

