import ProjectCard from "./projectCards"

export default function ProjectCardContainer({ projects, handleAddDetail, handleDeleteCard }: { projects: any, handleAddDetail: (formData : FormData) => void,
        handleDeleteCard: any }) {


    return (
        <div className="h-fill flex flex-wrap">
            { projects &&
                projects.map(project => (
                    <ProjectCard key={project.id} project={project} handleAddDetail={handleAddDetail} handleDeleteCard={handleDeleteCard} />
                ))
            }
        </div>    
    )
};