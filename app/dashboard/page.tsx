
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { DashNav } from "../_components/dashNav";
import ProjectCardContainer from "./projectCard/projectCardContainer";

const project = z.object({
  project: z.string().min(4)
});

const projectId = z.object({
  id: z.string()
})

const detail = z.object({
  description: z.string(),
  projectId: z.string(),
  detailOrder: z.number()
})

const projectCard = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string()
})


export default async function Dashboard() {
  const {userId} = auth();
  const xataClient = getXataClient();

  let projectUUID = crypto.randomUUID();

  if (!userId) {
    redirect('/');
  };

  let projects = await xataClient.db.masterProjects.
    filter({
      userId
    }).select([])
    .getMany();

  let projectList = projects.map(p => {
      let { xata, ...projectList } = p;
  
      return projectList;
    }
  );

  projectList.sort((a, b) => a.cardOrder - b.cardOrder);
  let maxProjectOrder = projectList[projectList.length - 1].cardOrder;
  
  let details = await xataClient.db.projectDetails.getAll();
  let detailList = details.map(d => {
    const { xata, ...rest } = d;
    return {
      ...rest, projectId: d.projectId?.id
    };
  });
  detailList.sort((a, b) => a.detailOrder - b.detailOrder)
  let maxDetailOrder = detailList[detailList.length - 1].detailOrder;

  async function createProject(formData: FormData) {
    'use server';
    const cardOrder = maxProjectOrder + 1;
    
    const parsedProject = project.parse({
      project: formData.get('project')
    })
    
    if (!userId) {
      return;
    }
    
    const newRecord = {...parsedProject, userId, cardOrder};
    const xataClient = getXataClient();
    // handle error when less than 4 characters
    await xataClient.db.masterProjects.create(newRecord);
    
    redirect('/dashboard');
  }

  async function deleteProject(formData: FormData) {
    'use server';
    const xataClient = getXataClient();

    const parsedProject = projectId.parse({
      id: formData.get('id')
    })

    const details = await xataClient.db.projectDetails.filter({ projectId: parsedProject.id }).getMany()

    if (!userId) return;

    await xataClient.db.masterProjects.delete(parsedProject);
    await xataClient.db.projectDetails.delete(details.map(e => e.id));

    redirect('/dashboard');
  }

  async function addDetail(formData: FormData) {
    'use server';
    const xataClient = getXataClient();

    if (!userId) return;

    maxDetailOrder++;

    const parsedDetail = detail.parse({
      description: formData.get('detail'),
      projectId: formData.get('id'),
      detailOrder: maxDetailOrder,
    })
    
    await xataClient.db.projectDetails.create(parsedDetail);
    
    console.log(parsedDetail);
    redirect('/dashboard');
  }

  async function deleteDetail(formData: FormData) {
    'use server';
    const xataClient = getXataClient();

    if (!userId) return;

    const parsedDetail = projectId.parse({
      id: formData.get('detailId')
    })

    await xataClient.db.projectDetails.delete(parsedDetail);

    redirect('/dashboard');
  }

  async function viewCard(formData: FormData) {
    'use server';

    if (!userId) return;

    console.log(formData.get('id'));

    redirect('/dashboard');
  }


  return (
    <div className="flex flex-col h-full bg-black items-center">
        <div className="w-full h-28 "></div>

        <div className="w-full fixed left-0 top-20 bg-black border-b z-40">
            <div className="col-start-2 col-end-3">
                <h1 className="flex justify-center items-center h-20">
                    Dashboard
                </h1>
            </div>

            <div className="col-start-1 col-end-4">
                <DashNav handleCreateProject={createProject} />
            </div>
        </div>

        <div key={projectUUID}>
          <ProjectCardContainer userId={userId} projects={projectList} details={detailList} handleAddDetail={addDetail} handleDeleteCard={deleteProject} 
            handleDeleteDetail={deleteDetail} />
        </div>

    </div>
  )
}
