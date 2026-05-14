import { getProject } from "@/sanity/sanity-utils";
import ProjectContent from "@/components/projects/ProjectContent";
import Link from "next/link";

type Props = {
  params: Promise<{ project: string }>;
};

export default async function ProjectPage({
  params,
}: Props) {

  const { project: slug } =
    await params;

  const project =
    await getProject(slug);

  if (!project) {
    return (
      <div>
        Project not found.
      </div>
    );
  }

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        py-20
      "
    >

      <div className="mb-12">
        <Link
          href="/projects"
          className="
      text-sm
      uppercase
      tracking-wide
      hover:opacity-50
      transition-opacity
    "
        >
          ← Back to Projects
        </Link>
      </div>

      <ProjectContent
        project={project}
      />
    </div>
  );
}