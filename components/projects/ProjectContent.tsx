import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// =====================================================
// TYPES
// =====================================================

type ImageAsset = {
  asset?: {
    url?: string;
  };
  url?: string;
};

type TextBlock = {
  _type: "textBlock";
  content: PortableTextBlock[];
};

type HeadingBlock = {
  _type: "headingBlock";
  heading: string;
};

type ImageBlock = {
  _type: "imageBlock";
  image?: ImageAsset;
  caption?: string;
};

type GalleryBlock = {
  _type: "galleryBlock";
  images?: ImageAsset[];
};

type ProjectReferenceBlock = {
  _type: "projectReferenceBlock";
  project?: Project;
};

type PageBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | GalleryBlock
  | ProjectReferenceBlock;

type Project = {
  title: string;
  alt?: string;
  heroImage?: string;
  pageBuilder?: PageBlock[];
};

// =====================================================
// PROPS
// =====================================================

type Props = {
  project: Project;
  depth?: number;
};

// =====================================================
// COMPONENT
// =====================================================

export default function ProjectContent({
  project,
  depth = 0,
}: Props) {
  if (depth > 3) return null;

  return (
    <div className="space-y-12">

      {/* TITLE */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>
      </header>

      {/* HERO IMAGE */}
      {project.heroImage && (
        <Image
          src={project.heroImage}
          alt={project.alt || project.title}
          width={1600}
          height={1200}
          className="w-full h-auto"
        />
      )}

      {/* PAGE BUILDER */}
      <div className="space-y-16">

        {project.pageBuilder?.map((block, index) => {
          switch (block._type) {

            case "textBlock":
              return (
                <div key={index} className="prose prose-sm max-w-none">
                  <PortableText value={block.content} />
                </div>
              );

            case "headingBlock":
              return (
                <h2 key={index} className="text-3xl font-bold">
                  {block.heading}
                </h2>
              );

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
                    <p className="mt-2 text-sm text-neutral-500">
                      {block.caption}
                    </p>
                  )}
                </div>
              );

            case "galleryBlock":
              return (
                <div key={index} className="grid grid-cols-2 gap-4">
                  {block.images?.map((image, imageIndex) => (
                    image?.asset?.url && (
                      <Image
                        key={imageIndex}
                        src={image.asset.url}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-auto"
                      />
                    )
                  ))}
                </div>
              );

            case "projectReferenceBlock":
              if (!block.project) return null;

              return (
                <div key={index} className="my-24">
                  <ProjectContent
                    project={block.project}
                    depth={depth + 1}
                  />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}