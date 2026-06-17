export const revalidate = 60;

import { getProjects } from "@/sanity/sanity-utils";
import ProjectsGrid from "./ProjectsGrid";

export default async function ProjectsPage() {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";
  const projects = await getProjects(siteId);
  return <ProjectsGrid projects={projects} />;
  //return <ProjectsCanvas projects={projects} />;
}