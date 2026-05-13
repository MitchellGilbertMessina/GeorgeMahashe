import { getProject } from "@/sanity/sanity-utils";

import ProjectContent from "@/components/projects/ProjectContent";

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
      <ProjectContent
        project={project}
      />
    </div>
  );
}