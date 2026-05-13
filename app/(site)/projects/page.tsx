import { getProjects } from "@/sanity/sanity-utils";

import ProjectsCanvas from "./ProjectsCanvas";

export default async function ProjectsPage() {

  const projects = await getProjects();

  return (
    <ProjectsCanvas projects={projects} />
  );
}