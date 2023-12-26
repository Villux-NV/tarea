import DetailCard from "./_detailCard/detailCard";

export default function ProjectCard({ id, title, userId, handleDeleteProject, handleDetail, viewCard }: { id: string, title: string | null | undefined, 
    userId: string, handleDeleteProject: (formData : FormData) => void, handleDetail: (formData : FormData) => void, viewCard: (formData : FormData) => void }) {

    if (!userId) return

    return (
        <div key={id} className="border w-60 h-72 m-6 flex flex-col justify-between">
            <div className="m-2">
                <p>{title}</p>
            </div>

            <div className="h-3/4 mx-4 p-2 border -indent-4">
                <DetailCard userId={userId} projectId={id} />
            </div>

            <div className="grid grid-cols-4">
                <form className="ml-2 flex items-end" action={viewCard}>
                    <input className="hidden" name="view" value={id}></input>
                    <button className="" type="submit">
                        view
                    </button>
                </form>

                <form className="ml-2 flex items-end" action={handleDeleteProject}>
                    <input className="hidden" name="id" value={id}></input>
                    <button className="" type="submit">
                        delete
                    </button>
                </form>

                <form className="col-end-5 border w-8 my-1.5" action={handleDetail}>
                    <input className="hidden" name="projectId" value={id}></input>
                    <button className="w-full" type="submit">
                        +
                    </button>
                </form>
            </div>
        </div>  

    )
}