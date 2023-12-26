import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { any, string, z } from "zod";
import { redirect } from "next/navigation";
import CreateProject from "./_createProject/page";
import ProjectCard from "./projectCard/projectCard";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const project = z.object({
  project: z.string().min(4)
});

const projectId = z.object({
  id: z.string()
})

export default async function Dashboard({ searchParams }: SearchParamProps) {
  const {userId} = auth();
  const xataClient = getXataClient();
  const show = searchParams?.show;

  if (!userId) {
    redirect('/');
  }

  const projects = await xataClient.db.masterProjects.
    filter({
      userId
    })
    .getMany();

  async function createProject(formData: FormData) {
    'use server';
    
    const parsedProject = project.parse({
        project: formData.get('project')
    })

    if (!userId) {
      return;
    }
    
    const newRecord = {...parsedProject, userId};
    const xataClient = getXataClient();
    // handle error when less than 4 characters
    await xataClient.db.masterProjects.create(newRecord);
    
    redirect('/dashboard');
  }

  async function deleteProject(formData: FormData) {
    'use server';

    const parsedProject = projectId.parse({
      id: formData.get('id')
    })

    if (!userId) {
      return;
    }

    const xataClient = getXataClient();
    await xataClient.db.masterProjects.delete(parsedProject);
    
    redirect('/dashboard');
  }
  
  return (
    <div className="flex flex-col w-full bg-black items-center">
        {
          show &&
          <CreateProject handleCreateProject={createProject} />
        }

        <div className="w-full h-full flex flex-wrap">
          {
            projects.map(proj => 
              <ProjectCard key={proj.id} id={proj.id} title={proj.project} userId={proj.userId} handleDeleteProject={deleteProject} />
            )
            
          }
        </div>
    </div>
  )
}
