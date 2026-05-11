import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: Promise<{ project: string }>;
};

export default async function Project({ params }: Props) {

  const { project: slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-20">

      {/* TITLE */}

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="text-lg text-gray-600">
            {project.shortDescription}
          </p>
        )}
      </header>

      {/* HERO IMAGE */}

      {project.heroImage && (
        <Image
          src={project.heroImage}
          alt={project.alt || project.title}
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg mb-12"
        />
      )}

      {/* PAGE BUILDER */}

      <div className="space-y-12">

        {project.pageBuilder?.map((block: any, index: number) => {

          switch (block._type) {

            // TEXT BLOCK

            case "textBlock":
              return (
                <div key={index} className="prose max-w-none">
                  <PortableText value={block.content} />
                </div>
              );

            // HEADING BLOCK

            case "headingBlock":
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold"
                >
                  {block.heading}
                </h2>
              );

            // IMAGE BLOCK

            case "imageBlock":
              return (
                <div key={index}>
                  {block.image?.asset?.url && (
                    <Image
                      src={block.image.asset.url}
                      alt={block.caption || ""}
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-lg"
                    />
                  )}

                  {block.caption && (
                    <p className="text-sm text-gray-500 mt-2">
                      {block.caption}
                    </p>
                  )}
                </div>
              );

            // GALLERY BLOCK

            case "galleryBlock":
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4"
                >
                  {block.images?.map(
                    (image: any, imageIndex: number) => (
                      <Image
                        key={imageIndex}
                        src={image.asset.url}
                        alt=""
                        width={800}
                        height={800}
                        className="w-full h-auto rounded-lg"
                      />
                    )
                  )}
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