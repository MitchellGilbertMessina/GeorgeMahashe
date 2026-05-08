import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10"></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project: any) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="group"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              {project.frontcover && (
                <Image
                  src={project.frontcover}
                  alt={project.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Title */}
            <h2 className="mt-3 text-sm font-medium group-hover:underline">
              {project.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}