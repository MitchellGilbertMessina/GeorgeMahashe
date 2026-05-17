export const revalidate = 60;

import { getProjects } from "@/sanity/sanity-utils";
import ProjectsGrid from "./ProjectsGrid";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsGrid projects={projects} />;
}