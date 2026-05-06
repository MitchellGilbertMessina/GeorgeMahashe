import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-20">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{project.title}</h1>
      </header>

      {project.frontcover && (
        <Image
          src={project.frontcover}
          alt={project.alt || project.title}
          width={800}
          height={500}
          className="object-cover rounded-lg mb-8"
        />
      )}

      {project.content && (
        <div className="prose">
          <PortableText value={project.content} />
        </div>
      )}
    </div>
  );
}